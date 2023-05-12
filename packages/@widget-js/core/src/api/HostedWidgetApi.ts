import {Channel} from "./Channel";
import {HostedWidget} from "../model/HostedWidget";
import {WidgetParams} from "../model/WidgetParams";
import {BaseApi} from "./BaseApi";
import {HostedMode} from '../model/HostedMode';
import {Widget} from '../model/Widget';

interface IHostedWidgetApi {
  removeHostedWidget(id: string): Promise<void>;

  removeHostedWidgetByName(name: string): Promise<HostedWidget[]>;

  getHostedWidgets(): Promise<HostedWidget[]>;

  openDevTools(id: string): Promise<void>;

  openConfigRoute(id: string): Promise<void>;

  registerActiveShortcut(id: string, shortcut: string): Promise<boolean>;

  setProxy(id: string, proxy: string): Promise<boolean>;

  getHostedWidget(id: string): Promise<HostedWidget>;

  addWidget(widgetName: string, hostMode: HostedMode): Promise<Widget[]>;
}

type HostedWidgetApiMethods = keyof IHostedWidgetApi;

export class HostedWidgetApiImpl extends BaseApi<HostedWidgetApiMethods> implements IHostedWidgetApi {
  getChannel(): string {
    return Channel.HOSTED_WIDGET;
  }

  /**
   * 移除组件
   * @param id
   */
  async removeHostedWidget(id: string) {
    return this.invokeMethod('removeHostedWidget', id)
  }


  addWidget(widgetName: string, hostMode: HostedMode): Promise<Widget[]> {
    return this.invokeMethod('addWidget', widgetName, hostMode);
  }

  /**
   * 通过组件名移除已添加的组件
   * @param name  组件名
   */
  async removeHostedWidgetByName(name: string): Promise<HostedWidget[]> {
    return this.invokeMethod('removeHostedWidgetByName', name)
  }

  /**
   * 获取已添加的组件
   * @param name  组件名，可以不传
   */
  async getHostedWidgets(name?: string): Promise<HostedWidget[]> {
    return this.invokeMethod('getHostedWidgets', name)
  }

  async getHostedWidget(id: string): Promise<HostedWidget> {
    return this.invokeMethod('getHostedWidget', id)
  }

  /**
   * Opens the dev tools for a widget with the specified ID.
   *
   * @param {string} widgetId - The ID of the widget to open the dev tools for.
   * @return {Promise} A Promise that resolves when the dev tools are opened.
   */
  async openDevTools(widgetId: string) {
    return this.invokeMethod('openDevTools', widgetId)
  }

  async openConfigRoute(widgetId: string, params?: WidgetParams) {
    return this.invokeMethod('openConfigRoute', widgetId, params)
  }

  /**
   * 注册激活、呼出、置顶组件快捷键
   * @param widgetId  组件id
   * @param shortcut  如果传空或者不传，则会取消快捷键。更多快捷键配置，请查看Accelerator用法
   *                  https://www.electronjs.org/docs/latest/api/accelerator
   */
  async registerActiveShortcut(widgetId: string, shortcut?: string): Promise<boolean> {
    return this.invokeMethod('registerActiveShortcut', widgetId, shortcut)
  }

  async setProxy(widgetId: string, proxy: string): Promise<boolean> {
    return this.invokeMethod('setProxy', widgetId, proxy)
  }

}

const HostedWidgetApi = new HostedWidgetApiImpl();
export {HostedWidgetApi, HostedWidgetApiMethods}
