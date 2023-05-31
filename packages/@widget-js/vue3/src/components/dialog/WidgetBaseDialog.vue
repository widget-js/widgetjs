<template>
  <div class="dialog-wrapper" ref="dialogWrapper">
    <el-container direction="vertical" class="dialog" ref="dialog">
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

<script lang="ts" setup>

import WidgetDialogTitleBar from "@/components/dialog/WidgetDialogTitleBar.vue";
import {ref, watch} from "vue";
import {useElementBounding} from "@vueuse/core";
import {BrowserWindowApi} from "@widget-js/core";
import {useDebounceFn} from "@vueuse/shared";

const props = defineProps({
  title: {
    type: String,
  },
})
const dialogWrapper = ref<HTMLElement>()
let {height} = useElementBounding(dialogWrapper);
let heightInit = false;
let resizeWindow = useDebounceFn((newHeight) => {
  BrowserWindowApi.setBounds({height: newHeight + 32})
  if (!heightInit) {
    //只有第一次初始化时才居中
    BrowserWindowApi.center();
    heightInit = true;
  }
}, 100);
watch(height, (newHeight) => {
  if (newHeight > 0) {
    resizeWindow(newHeight)
  }
})

</script>

<style scoped lang="scss">
@import "@/scss/theme.scss";

.dialog-wrapper {
  display: flex;
  padding: 12px 24px 32px 24px;

  .dialog {
    @include browser-window;
    margin-bottom: auto;
    background-color: white;
  }

  .main {
    padding: 1rem;
  }

}


</style>
