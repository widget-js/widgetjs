<script setup lang="ts">
import {BroadcastEvent, HostedMode, WidgetApiEvent, WidgetParams} from "@widget-js/core";
import {nextTick, onMounted, ref, watch} from "vue";
import {useAppBroadcast} from "@/composition/use-app-broadcast";

const editing = ref<boolean>(false);
const widgetParams = WidgetParams.fromCurrentLocation();
if (widgetParams.mode == HostedMode.NORMAL) {
  useAppBroadcast([WidgetApiEvent.EDIT_DESKTOP_WIDGETS], async (broadcastEvent: BroadcastEvent) => {
    editing.value = broadcastEvent.payload;
  });
}

const props = defineProps({
  shadowColor: {
    type: String,
    default: 'rgba(0,0,0,0.2)'
  },
  padding: {
    type: Number,
    default: 12
  }
})

const updateCssProperty = () => {
  wrapper.value?.style.setProperty('--padding', `${props.padding * 2}px`)
  wrapper.value?.style.setProperty('--shadowColor', props.shadowColor)
}
const wrapper = ref<HTMLElement>()
onMounted(async () => {
  await nextTick()
  updateCssProperty()
})

watch(() => props, (newVal) => {
  updateCssProperty()
}, {deep: true})

</script>

<template>
  <div :class="{'widget-wrapper':true,editing}" ref="wrapper">
    <slot></slot>
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
</style>
