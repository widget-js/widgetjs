<template>
  <div class="dialog-wrapper">
    <div class="background" @mouseenter="backgroundMouseEnter" />
    <el-container direction="vertical" class="dialog" @mouseenter="dialogMouseEnter">
      <slot name="header">
        <widget-dialog-title-bar :title="title"></widget-dialog-title-bar>
      </slot>
      <div class="main">
        <slot name="main">

        </slot>
      </div>
      <div class="footer">
        <slot name="footer">
        </slot>
      </div>
    </el-container>
  </div>

</template>

<script lang="ts">

import DialogTitleBar from "@/components/dialog/WidgetDialogTitleBar.vue";
import WidgetDialogTitleBar from "@/components/dialog/WidgetDialogTitleBar.vue";
import {defineComponent} from "vue";
import {BrowserWindowApi} from "@widget-js/core";

export default defineComponent({
      components: {WidgetDialogTitleBar, DialogTitleBar},
      name: "WidgetBaseDialog",
      props: {
        title: {
          type: String,
        },
      },
      methods: {
        backgroundMouseEnter() {
        },
        dialogMouseEnter() {
        }
      }
    }
)

</script>

<style scoped lang="scss">
@import "@/scss/theme.scss";


.dialog-wrapper {
  .dialog {
    @include browser-window;
    left: 16px;
    top: 50%;
    right: 16px;
    position: absolute;
    margin-top: auto;
    margin-bottom: auto;
    background-color: white;
    transform: translate(0, -50%);
  }

  .background {
    position: fixed;
    color: transparent;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .main{
    padding: 1rem;
  }

}


</style>
