<script setup lang="ts">
import {HostedMode, WidgetParams} from "@widget-js/core";
import OverlapWidgetWrapper from "@/components/OverlapWidgetWrapper.vue";
import DesktopWidgetWrapper from "@/components/DesktopWidgetWrapper.vue";

const widgetParams = WidgetParams.fromCurrentLocation();
const isOverlap = widgetParams.mode == HostedMode.OVERLAP;
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
</script>

<template>
  <OverlapWidgetWrapper v-if="isOverlap" v-bind="$props">
    <slot></slot>
  </OverlapWidgetWrapper>
  <DesktopWidgetWrapper v-else v-bind="$props">
    <slot></slot>
  </DesktopWidgetWrapper>
</template>

<style scoped lang="scss">
</style>
