import {AppNotification, AppMouseEvent, Channel, ElectronApi, NativeKeyboardEvent} from "@widget-js/core";
import {onMounted, onUnmounted} from "vue";

export function useIpcListener(channel: Channel, callback: (...args) => void) {

  onMounted(async () => {
    await ElectronApi.addIpcListener(channel, (...args) => {
      callback(...args);
    });
  });
  onUnmounted(async () => {
    await ElectronApi.removeIpcListener(channel);
  });
}

export function useNotification(callback: (notification?: AppNotification) => void) {
  onMounted(async () => {
    await ElectronApi.addIpcListener(Channel.NOTIFICATION, (notification?: AppNotification) => {
      callback(notification);
    });
  });
  onUnmounted(async () => {
    await ElectronApi.removeIpcListener(Channel.NOTIFICATION);
  });
}


export function useMouseEventHook(callback: (event: AppMouseEvent) => void) {
  onMounted(async () => {
    await ElectronApi.addIpcListener(Channel.MOUSE, (event: AppMouseEvent) => {
      callback(event);
    });
  });
  onUnmounted(async () => {
    await ElectronApi.removeIpcListener(Channel.MOUSE);
  });
}

export function useKeyboardEventHook(callback: (event: NativeKeyboardEvent) => void) {
  onMounted(async () => {
    await ElectronApi.addIpcListener(Channel.KEYBOARD, (event: NativeKeyboardEvent) => {
      callback(event);
    });
  });
  onUnmounted(async () => {
    await ElectronApi.removeIpcListener(Channel.KEYBOARD);
  });
}

