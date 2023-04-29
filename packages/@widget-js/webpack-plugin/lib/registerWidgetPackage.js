const WebSocket = require("ws");
const {WebSocketEvent, WebSocketEventType} = require("@widget-js/core");
const consola = require("consola");
const registerWidgetPackage = async (widgetPackage) => {
    if (process.env.NODE_ENV === 'development') {
        if (!widgetPackage.devOptions.devUrl) {
            consola.error("注册组件失败，没有配置开发链接devUrl，示例：http://127.0.0.1:8080")
            return
        }
        const url = `ws://127.0.0.1:3506`;
        const ws = new WebSocket(url)
        ws.onerror = () => {
            consola.error("注册组件失败，客户端可能没有启动，或者端口占用")
        }
        ws.onopen = () => {
            widgetPackage.url = widgetPackage.devOptions.devUrl;
            for (let widget of widgetPackage.widgets) {
                widget.packageName = widgetPackage.name;
            }
            let webSocketEvent = new WebSocketEvent(WebSocketEventType.RESISTER_WIDGETS, widgetPackage);
            consola.info(`Widgets size:${widgetPackage.widgets.length}`);
            widgetPackage.widgets.forEach((it) => {
                consola.info(it.name);
            });
            let data = JSON.stringify(webSocketEvent);
            ws.send(data);
            ws.close();
        }
    }
}
module.exports = registerWidgetPackage
