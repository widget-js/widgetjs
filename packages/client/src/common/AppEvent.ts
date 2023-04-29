import {useEventBus} from "@vueuse/core";

export class AppEvent {
    static CHANNEL_WIDGET = "CHANNEL_WIDGET"
    static TYPE_CONTEXT_MENU = "TYPE_CONTEXT_MENU"
    static TYPE_CLICK = "TYPE_CLICK"
    static TYPE_WIDGET_CLICK = "TYPE_WIDGET_CLICK"
    static TYPE_WIDGET_ADD = "TYPE_WIDGET_ADD"
    static TYPE_WIDGET_UPDATED = "TYPE_WIDGET_UPDATED"
    static TYPE_WIDGET_RESIZE = "TYPE_WIDGET_RESIZE"
    static TYPE_OPEN_WIDGET_SETTINGS = "TYPE_OPEN_WIDGET_SETTINGS"
    type: string
    payload: any
    static bus = useEventBus<string>(AppEvent.CHANNEL_WIDGET)

    constructor(type: string, payload: any = {}) {
        this.type = type;
        this.payload = payload;
    }

    stringify(): string {
        return JSON.stringify(this)
    }

    emit(bus) {
        bus.emit(JSON.stringify(this))
    }
}

