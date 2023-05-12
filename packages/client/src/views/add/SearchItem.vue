<template>
  <div class="search-item">
    <span class="title">{{ widget.getTitle() }}</span>
    <span class="desc">{{ widget.getDescription() }} </span>
    <widget-container class="widget" :widget="widget"
                      :widget-package="widgetPackage"/>
    <div class="buttons" @mouseover="addBlockHover = true" @mouseleave=" addBlockHover = false">
      <template v-if="widget.isSupportBackground()">
        <el-button type="primary" round @click="openBackgroundWidgetSettings">设置</el-button>
        <el-button type="primary" round @click="addBackgroundWidget" v-if="!isWidgetHosted">启用</el-button>
        <el-button type="danger" round @click="removeWidget" v-if="isWidgetHosted">禁用</el-button>
        <el-button type="warning" round @click="openDevTools" v-if="isWidgetHosted && isDev">DevTools</el-button>
      </template>
      <template v-else-if="isDynamicIsland">
        <el-button type="primary" round @click="islandSetting">设置</el-button>
      </template>
      <template v-else>
        <el-button v-if="!addBlockHover" type="primary" round>添加</el-button>
        <el-button v-if="showAddNormal" type="primary" round
                   @click="onClickAddNormal">桌面
        </el-button>
        <el-button v-if="showAddOverlap" type="primary" round
                   @click="addOverlapWidget">悬浮窗
        </el-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import WidgetContainer from "@/views/add/WidgetContainer.vue";
import {WidgetFitBox} from "@widget-js/vue3";
import {
  BrowserWindowApi,
  Channel,
  ElectronUtils,
  HostedMode,
  Widget,
  WidgetApi,
  WidgetPackage,
  WidgetParams
} from "@widget-js/core";
import {useBroadcastChannel} from "@vueuse/core";
import {AppEvent} from "@/common/AppEvent";
import dayjs from "dayjs";
import {ref} from "vue";
import {useDebugConfig} from "@/composition/use-config";
import {HostedWidgetApi} from "../../../../@widget-js/core/src";

export default {
  name: "SearchItem",
  components: {WidgetContainer, WidgetFitBox},
  props: {
    widget: {
      type: Widget,
      required: true
    },
    widgetPackage: {
      type: WidgetPackage,
      required: true
    }
  },
  setup(props) {
    const addBlockHover = ref(false);
    const isWidgetHosted = ref(false);
    const {
      post,
    } = useBroadcastChannel({name: "CHANNEL_MAIN"});
    const updateWidgetAdd = async () => {
      if (props.widget.isSupportBackground()) {
        const widgets = await HostedWidgetApi.getHostedWidgets(props.widget.name)
        if (widgets) {
          isWidgetHosted.value = widgets.length > 0;
        } else {
          isWidgetHosted.value = false;
        }
      }
    }
    const isDev = useDebugConfig();
    updateWidgetAdd();
    return {addBlockHover, isDev, post, isWidgetHosted, updateWidgetAdd};
  },
  computed: {
    isDynamicIsland() {
      return this.widget.name == 'cn.widgetjs.widgets.dynamic_island'
    },
    showAddOverlap() {
      return this.addBlockHover && this.widget.isSupportOverlap();
    },
    showAddNormal() {
      console.info(this.addBlockHover && this.widget.isSupportNormal());
      return this.addBlockHover && this.widget.isSupportNormal();
    }
  },
  methods: {
    async removeWidget() {
      await HostedWidgetApi.removeHostedWidgetByName(this.widget.name);
      await this.updateWidgetAdd();
    },
    openDevTools() {
      HostedWidgetApi.openDevTools(this.widget.name);
    },
    async addOverlapWidget() {
      await HostedWidgetApi.addWidget(this.widget.name, HostedMode.OVERLAP);
    },
    async addBackgroundWidget() {
      await HostedWidgetApi.addWidget(this.widget.name, HostedMode.BACKGROUND);
      await this.updateWidgetAdd();
    },
    async openBackgroundWidgetSettings() {
      const widgetParams = new WidgetParams();
      widgetParams.id = this.widget.name;
      widgetParams.name = this.widget.name;
      const url = await WidgetApi.getWidgetConfigUrl(this.widget.name, widgetParams);
      console.log(url);
      if (url) {
        await BrowserWindowApi.openUrl(url);
      }
    },
    async islandSetting() {
      const widgetParams = new WidgetParams();
      widgetParams.id = "1";
      widgetParams.name = 'cn.widgetjs.widgets.dynamic_island'
      const url = await WidgetApi.getWidgetConfigUrl(widgetParams.name, widgetParams);
      if (url) {
        await BrowserWindowApi.openUrl(url);
      }
    },
    async onClickAddNormal() {
      //加second()的目的是用于保证消息的唯一性。字符串相同的话，post只会触发一次,这样只会保证每秒最多触发一次
      // this.post(JSON.stringify(new AppEvent(AppEvent.TYPE_WIDGET_ADD, {
      //   widget: this.widget,
      //   widgetPackage: this.widgetPackage,
      //   time: dayjs().second()
      // })))
      await HostedWidgetApi.addWidget(this.widget.name, HostedMode.NORMAL);
    }
  }
}


</script>

<style scoped lang="scss">
@use "sass:map";
@import "element-plus/theme-chalk/src/common/var.scss";

.search-item {
  margin-bottom: 20px;
  display: flex;
  background-color: white;
  border-radius: 16px;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: map.get($text-color, "primary");
    margin-bottom: 8px;
  }

  .desc {
    color: map.get($text-color, "secondary");
  }

  .widget {
    margin: 16px;
  }

  .buttons {
    justify-content: center;
    align-items: center;
    align-content: center;
    display: flex;

    .el-button {
      width: 70px;
    }
  }
}
</style>
