<template>
  <div class="widget-fit-box" :style="{maxWidth:`${width}px`,maxHeight:`${height}px`}">
    <div :style="{transform:`scale(${scale})`}">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">

import {useWidgetScale} from "@/composition/use-widget";

export default {
  name: "WidgetFitBox",
  props: {
    width: Number,
    height: Number,
    widgetHeight: Number,
    widgetWidth: Number,
  },
  computed: {
    scale() {
      return useWidgetScale(this.width,this.height,this.widgetWidth,this.widgetHeight);
    }
  }
}
</script>

<style scoped>
.widget-fit-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
