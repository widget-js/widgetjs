<script setup lang="ts">
import {BroadcastEvent, BrowserWindowApiEvent, WidgetApiEvent} from "@widget-js/core";
import {ref} from "vue";
import {useAppBroadcast} from "@/composition/use-app-broadcast";
import {useWidgetWrapper} from "@/components/useWidgetWrapper";

const editing = ref<boolean>(false);
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

useAppBroadcast([WidgetApiEvent.EDIT_DESKTOP_WIDGETS,
  BrowserWindowApiEvent.BLUR,
], async (broadcastEvent: BroadcastEvent) => {
  if (broadcastEvent.event == WidgetApiEvent.EDIT_DESKTOP_WIDGETS) {
    editing.value = broadcastEvent.payload;
  }
});

const {wrapper} = useWidgetWrapper(props);

</script>

<template>
  <div :class="{'widget-window':true}">
    <div class="widget-wrapper" :class="{editing}" ref="wrapper">
      <slot></slot>
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

</style>
