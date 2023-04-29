export enum WebSocketEventType {
    RESISTER_WIDGETS = "ws::cn.widgetjs.core.resister_widgets"
}

export class WebSocketEvent {
    //类型
    type: WebSocketEventType
    payload: any

    constructor(type: WebSocketEventType, payload: any) {
        this.type = type;
        this.payload = payload;
    }
}
