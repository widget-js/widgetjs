import {BroadcastApi, BroadcastEvent, BroadcastEventType, Channel} from "@widget-js/core";
import {onMounted, onUnmounted} from "vue";
import {useIpcListener} from "@/composition/use-ipc";

/**
 * 注册广播监听
 * @param events    广播事件类型
 * @param callback
 */
export function useAppBroadcast(events: BroadcastEventType[], callback: (event: BroadcastEvent) => void) {

    onMounted(() => {
        BroadcastApi.register(...events)
    });
    onUnmounted(() => {
        BroadcastApi.unregister(...events);
    })

    useIpcListener(Channel.BROADCAST, (...args: any[]) => {
        callback(args[0] as BroadcastEvent);
    })
}
