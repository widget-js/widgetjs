import WebSocket from "ws";
import {WebSocketEvent, WebSocketEventType} from "@widget-js/core";
import consola from "consola";
import scanWidgetPackage from "./scanWidgetPackage";

export interface RegisterOption {
  devUrl?: string
}

export const scanAndRegister = async (option: RegisterOption) => {
  const widgetPackage = await scanWidgetPackage();
  consola.info("Register widgets at：", new Date());
  await registerWidgetPackage(widgetPackage, option);
}

const registerWidgetPackage = async (widgetPackage: any, option: RegisterOption) => {
  if (process.env.NODE_ENV === 'development') {
    const url = `ws://127.0.0.1:3506`;
    const ws = new WebSocket(url)
    ws.onerror = () => {
      consola.error("注册组件失败，客户端可能没有启动，或者端口占用")
    }
    ws.onopen = () => {
      if (option.devUrl) {
        widgetPackage.remoteEntry = option.devUrl;
        widgetPackage.url = option.devUrl;
      }
      for (const widget of widgetPackage.widgets) {
        widget.packageName = widgetPackage.name;
      }
      const webSocketEvent = new WebSocketEvent(WebSocketEventType.RESISTER_WIDGETS, widgetPackage);
      consola.info(`Widgets size:${widgetPackage.widgets.length}`);
      // widgetPackage.widgets.forEach((it: Widget) => {
      //   consola.info(it.name);
      // });
      const data = JSON.stringify(webSocketEvent);
      ws.send(data);
      ws.close();
    }
  }
}

export default registerWidgetPackage;
