<template>
  <widget-base-dialog title="设置">
    <template v-slot:main>
      <setting-section title="应用设置">
        <el-form label-width="90px" label-position="left">
          <el-form-item label="开机启动">
            <el-switch v-model="launchAtStartup"/>
          </el-form-item>
          <el-form-item v-if="debugMode" label="开发者模式">
            <el-switch v-model="debugMode"/>
          </el-form-item>
        </el-form>
      </setting-section>
      <setting-section title="桌面设置">
        <el-form label-width="90px" label-position="left">
          <el-form-item label="网格大小">
            <el-radio-group v-model="gridSize">
              <el-radio :label="50">50px</el-radio>
              <el-radio :label="60">60px</el-radio>
              <el-radio :label="70">70px</el-radio>
              <el-radio :label="80">80px</el-radio>
              <el-radio :label="90">90px</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="置顶快捷键">
            <bind-shortcut-field v-model:shortcut="pinDesktopShortcut"></bind-shortcut-field>
          </el-form-item>
        </el-form>
      </setting-section>
      <setting-section title="交个朋友">
        <div class="social">
          <a target="_blank" href="https://v.douyin.com/YhuNAb8/"> <img
              src="../../assets/images/douyin.png" alt=""></a>

          <a target="_blank" href="https://jq.qq.com/?_wv=1027&k=TgO2mUQe"> <img
              src="../../assets/images/qq.png" alt=""></a>

          <a target="_blank" href="https://space.bilibili.com/207395767"> <img
              src="../../assets/images/bilibili_logo_blue.png" alt=""></a>

          <a target="_blank" href="https://github.com/widget-js" ref="github"> <img
              src="../../assets/images/github-mark.png" alt=""></a>
        </div>
      </setting-section>
    </template>

  </widget-base-dialog>

</template>

<script lang="ts">
import {ref, watch} from "vue";
import {ApiConstants, AppApi, NotificationApi} from "@widget-js/core";
import SettingSection from "./SettingSection.vue";
import {BindShortcutField, WidgetBaseDialog, WidgetColorField} from "@widget-js/vue3";
import {onLongPress} from '@vueuse/core'
import {useDebugConfig, useGridSizeConfig} from "@/composition/use-config";

export default {
  name: "SettingView",
  components: {WidgetColorField, WidgetBaseDialog, SettingSection, BindShortcutField},
  setup() {
    const launchAtStartup = ref(true);
    const pinDesktopShortcut = ref("Ctrl+Alt+D");
    AppApi.getConfig(ApiConstants.SHORTCUT_PIN_DESKTOP_WIDGETS, pinDesktopShortcut.value).then((value) => {
      pinDesktopShortcut.value = value as string
    });
    AppApi.getConfig(ApiConstants.CONFIG_LAUNCH_AT_STARTUP, true).then((value) => {
      launchAtStartup.value = value as boolean
      watch(launchAtStartup, (newValue, preValue) => {
        AppApi.setConfig(ApiConstants.CONFIG_LAUNCH_AT_STARTUP, newValue)
      })
    });
    const debugMode = useDebugConfig();
    const gridSize = useGridSizeConfig();
    const github = ref();

    onLongPress(github, () => {
      NotificationApi.info("启用开发者模式");
      debugMode.value = true;
    }, {delay: 3000});

    return {
      launchAtStartup,
      debugMode,
      github,
      pinDesktopShortcut,
      gridSize,
    }
  },
  async mounted() {
    document.title = "设置"
  },
  watch: {
    pinDesktopShortcut(newValue) {
      AppApi.setConfig(ApiConstants.SHORTCUT_PIN_DESKTOP_WIDGETS, newValue);
    }
  },
  methods: {}
}


</script>

<style scoped lang="scss">
@import "@/assets/scss/theme.scss";

body {
}

.el-form {
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}

.setting-section:nth-child(n+2) {
  margin-top: 12px;
}

.social {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: start;

  a {
    text-decoration: none;
    margin-right: 16px;
    color: $color-primary;

    img {
      width: 32px;
    }
  }
}

</style>
