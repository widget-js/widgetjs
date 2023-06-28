<script setup lang="ts">
import {BrowserWindowApi} from "@widget-js/core";
import {useOverlapWidgetWrapper, useWidgetWrapper} from "@/components/useWidgetWrapper";

const props = defineProps({
  shadowColor: {
    type: String,
    default: 'rgba(0,0,0,0.2)'
  },
  padding: {
    type: Number,
    default: 12
  }
});

function hotspotMouseEnter() {
  BrowserWindowApi.setIgnoreMouseEvent(false)
}

const {widgetYTransition, isWidgetHide} = useOverlapWidgetWrapper();

function hotspotMouseLeave() {
  if (isWidgetHide) {
    BrowserWindowApi.setIgnoreMouseEvent(true)
  }
}

const {wrapper} = useWidgetWrapper(props);

</script>

<template>
  <div class="widget-window" ref="widgetWindow">
    <div class="widget-wrapper" ref="wrapper" :style="{
        transform: `translate3d(0,${widgetYTransition}px,0)`
      }">
      <slot></slot>
    </div>
    <div
      class="hotspot"
      v-if="isWidgetHide"
      @mousemove="hotspotMouseEnter"
      @mouseleave="hotspotMouseLeave"
      ref="hotspot"
    >
      <div class="handler"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.widget-wrapper {
  --padding: 24px;
  --shadowColor: rgba(0, 0, 0, 0.2);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 0px 6px var(--shadowColor));

  & > :first-child {
    height: calc(100vh - var(--padding));
    width: calc(100vw - var(--padding));
    transition: all 0.2s ease-out;
  }

  &.editing {
    background-color: rgba(0, 0, 0, 0.3);

    & > :first-child {
      transform: scale(0.8);
    }
  }
}

.hotspot {
  width: 56px;
  cursor: pointer;
  display: flex;
  z-index: 999;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  height: 12px;

  .handler {
    width: 32px;
    height: 4px;
    margin-top: 2px;
    background-color: white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.52);
    border-radius: 50px;
  }
}
</style>
