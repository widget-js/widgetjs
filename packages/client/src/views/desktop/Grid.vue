<template>
  <canvas id="canvas" :width="width" :height="height - 5"/>
</template>

<script lang="ts" setup>
import {useWindowSize} from "@vueuse/core";
import {nextTick, onMounted} from "vue";
import {ApiConstants, AppApi} from "@widget-js/core";

const {width, height} = useWindowSize();

onMounted(async () => {
  await nextTick();
  const gridSize = await AppApi.getConfig(ApiConstants.CONFIG_GRID_SIZE, 70) as number;
  console.log(ApiConstants.CONFIG_GRID_SIZE, gridSize)
  const cellPadding = 16
  const outerGridSize = gridSize + cellPadding * 2;
  const canvas = document.getElementById("canvas");
  //@ts-ignore
  const ctx = canvas.getContext("2d");
  ctx.moveTo(cellPadding, 0);
  ctx.lineTo(cellPadding, height.value);
  ctx.stroke();

  ctx.moveTo(0, cellPadding);
  ctx.lineTo(width.value, cellPadding);
  ctx.stroke();
  for (let i = cellPadding; i <= width.value + outerGridSize; i += outerGridSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height.value);
    ctx.stroke();
    ctx.moveTo(0, i);
    ctx.lineTo(width.value, i);
    ctx.stroke();
  }
})

</script>

<style scoped lang="scss">
html,
body,
.grid {
  margin: 0;
  overflow: hidden;
}

.grid {
  position: absolute;
  display: block;
  background-image: repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%),
  repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%);
  background-size: calc(96px + 16px) calc(96px + 16px);
  overflow: hidden;
}
</style>
