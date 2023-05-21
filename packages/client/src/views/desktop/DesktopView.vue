<template>
  <div :class="{
    'background':true,
    'hide': !editing,
  }"></div>
  <div class="widget-container" ref="widgetContainer"
       @mouseleave="bgMouseLeave"
       @mouseenter="containerMouseEnter"
       @mousemove="containerMouseMove"
       :style="containerStyle"
  >
    <widget-frame :url="widgetUrl"
                  v-show="containerToggle"
                  :width="widgetWidth"
                  :id="id"
                  ref="widgetFrame"
                  :key="refreshKey"
                  v-if="widget && widgetPackage"
                  :widget="widget"
                  @mouseleave="widgetMouseLeave"
                  @mouseenter="widgetMouseEnter"
                  :background-throttling="widget.backgroundThrottling?'yes':'no'"
                  :skeleton-count="widget.height"
                  :name="widgetName"
                  :show-cover="false"
                  :height="widgetHeight"/>
  </div>
  <!--  编辑模式下，拦截点击事件 -->
  <div v-if="editing" class="w-[100%] h-[100%] absolute z-50" @click.stop=""></div>
  <div class="handler" v-show="editing && widget.isResizable()"></div>
</template>

<script lang="ts">
import {useRoute} from "vue-router";
import {
  BroadcastEvent,
  BrowserWindowApi,
  Channel,
  HostedMode, HostedWidgetApi,
  UrlUtils,
  Widget,
  WidgetApi, WidgetApiEvent,
  WidgetPackage,
  WidgetParams
} from "@widget-js/core";
import {useLocalStorage, useTimeoutFn, useTransition, useWindowSize} from "@vueuse/core";
import WidgetFrame from "@/components/WidgetFrame.vue";
import {computed, getCurrentInstance, nextTick, ref} from "vue";
import {useAppBroadcast, useIpcListener} from "@widget-js/vue3";
import Constants from "@/common/Constants";
import {delay} from "@/utils/TimeUtils";

export default {
  name: "WidgetView",
  components: {WidgetFrame},
  setup(props) {
    const {width: windowWidth, height: windowHeight,} = useWindowSize({includeScrollbar: false});
    const padding = ref(12);
    const refreshKey = ref(new Date());
    const editing = ref(false);
    const containerToggle = ref(true);
    const widgetHover = ref(false)
    let router = useRoute();
    const id = router.query.id as string;
    const widgetName = router.query.name as string;
    const packageName = router.query.package as string;
    const widgetPackage = ref<WidgetPackage>();
    const widget = ref<Widget>();
    const hotspot = ref();
    const widgetFrame = ref();
    const guide = useLocalStorage(Constants.GUIDE_KEY_OVERLAP_MENU, true);
    if (guide) {
      useTimeoutFn(() => {
        guide.value = false
      }, 4000)
    }
    useAppBroadcast([WidgetApiEvent.EDIT_DESKTOP_WIDGETS], async (broadcastEvent: BroadcastEvent) => {
      console.log(broadcastEvent);
      if (broadcastEvent.event == WidgetApiEvent.EDIT_DESKTOP_WIDGETS) {
        editing.value = broadcastEvent.payload;
      }
    });

    const widgetWidth = computed(() => {
      return windowWidth.value - padding.value * 2;
    })
    const widgetHeight = computed(() => {
      return windowHeight.value - padding.value * 2;
    });

    const widgetUrl = ref("");
    WidgetApi.getWidget(widgetName as string).then((dbWidget: Widget) => {
      widget.value = dbWidget;
    });
    WidgetApi.getWidgetPackage(packageName as string).then((dbPackage: WidgetPackage) => {
      widgetPackage.value = dbPackage;
    });

    const getWidgetParams = () => {
      const widgetParams = new WidgetParams();
      widgetParams.id = id;
      widgetParams.widthPx = widgetWidth.value;
      widgetParams.heightPx = widgetHeight.value;
      widgetParams.mode = HostedMode.NORMAL;
      widgetParams.name = widget.value!.name;
      return widgetParams;
    };

    const refresh = () => {
      refreshKey.value = new Date();
      widgetUrl.value = UrlUtils.getWidgetUrl(widget.value!.getIndexRoute().url, widgetPackage.value!, getWidgetParams());
    };

    useIpcListener(Channel.BROWSER_WINDOW, async (...args) => {
      const event = args[0];
      console.log(event)
      if (event == "resized") {
        refresh();
      } else if (event == "edit") {
        editing.value = args[1];
      } else if (event == "refresh") {
        refresh();
      } else if (event == "settings") {
        const widgetConfigUrl = await WidgetApi.getWidgetConfigUrl(widget.value!.name, getWidgetParams());
        await BrowserWindowApi.openUrl(widgetConfigUrl!);
      } else if (event == 'close') {
        await HostedWidgetApi.removeHostedWidget(this.id)
      }
    })
    return {
      widgetName,
      widgetPackage,
      guide,
      refresh, getWidgetParams,
      widget,
      widgetHover,
      containerToggle,
      widgetHeight,
      id,
      widgetWidth,
      hotspot,
      padding,
      widgetUrl,
      windowWidth,
      refreshKey,
      editing,
      widgetFrame,
      windowHeight,
    }
  },
  watch: {
    dataLoaded() {
      this.widgetUrl = UrlUtils.getWidgetUrl(this.widget.getIndexRoute().url, this.widgetPackage, this.getWidgetParams())
    }
  },
  async mounted() {
    await nextTick();
    if (this.isAutoHide) {
      this.hideWidget();
    }
    this.alwaysOnTop = await BrowserWindowApi.isAlwaysOnTop();
  },
  methods: {
    async lock() {
      await HostedWidgetApi.removeHostedWidget(this.id);
    },
    onMaskMouseEnter() {
    },
    bgClick() {
    },
    widgetMouseLeave() {
      this.widgetHover = false;
    },
    widgetMouseEnter() {
      this.widgetHover = false;
    },
    bgMouseEnter() {
      console.log("bgMouseEnter")
    },
    containerMouseEnter() {
    },
    containerMouseMove() {
      if (this.editing) {
      }
    },
    bgMouseLeave() {
    },
  },
  computed: {
    dataLoaded() {
      return this.widget != null && this.widgetPackage != null;
    },
    containerStyle() {
      return {
        width: this.windowWidth,
        transform: `scale(${this.editing ? 0.8 : 1})`,
      }
    },
    bgBorderRadius() {
      return this.editing ? '0' : '12px'
    }
  }
}
</script>

<style lang="scss" scoped>

.hide {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.3s;
}

.icon {
  &:before {
    color: white;
  }
}

.background {
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: v-bind(bgBorderRadius);
  z-index: -2;
  transition-property: background-color;
  transition-duration: 200ms;

  &.hide {
    background: rgba(0, 0, 0, 0);
  }
}

.guide-right-click {
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;

  p {
    color: white;
  }
}

.handler {
  position: absolute;
  right: 2px;
  width: 24px;
  bottom: 2px;
  height: 24px;
  background-size: 24px;
  background-image: url("data:image/svg+xml,%3Csvg t='1669981211195' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='3723' width='200' height='200'%3E%3Cpath d='M938.666667 938.666667h-85.333334v-85.333334h85.333334v85.333334m0-170.666667h-85.333334v-85.333333h85.333334v85.333333m-170.666667 170.666667h-85.333333v-85.333334h85.333333v85.333334m0-170.666667h-85.333333v-85.333333h85.333333v85.333333m-170.666667 170.666667h-85.333333v-85.333334h85.333333v85.333334m341.333334-341.333334h-85.333334v-85.333333h85.333334v85.333333z' fill='%23ffffff' p-id='3724'%3E%3C/path%3E%3C/svg%3E");
}

.widget-container {
  height: calc(100% - 24px);
  width: calc(100% - 24px);
  inset: 12px;
  flex-direction: column;
  align-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
  border-radius: 8px;
  position: absolute;
  display: flex;

}
</style>
