import {ElectronUtils} from "../utils/ElectronUtils";
import {Channel} from "./Channel";
import {HostedWidget} from "../model/HostedWidget";
import {WidgetParams} from "../model/WidgetParams";

export class HostedWidgetApi {
    static readonly REMOVE_HOSTED_WIDGET = "remove-hosted-widget"
    static readonly REMOVE_HOSTED_WIDGET_BY_NAME = "remove-hosted-widget-by-name"
    static readonly GET_HOSTED_WIDGETS = "get-hosted-widgets"
    static readonly GET_HOSTED_WIDGET = "get-hosted-widget"
    static readonly OPEN_DEV_TOOLS = "open-dev-tools"
    static readonly REGISTER_ACTIVE_SHORTCUT = "register-active-shortcut"
    static readonly SET_PROXY = "SET_PROXY"
    static readonly UPDATE = "UPDATE"
    static readonly OPEN_CONFIG_ROUTE = "open-config-route"

    /**
     * 移除组件
     * @param id
     */
    static async removeHostedWidget(id: string) {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.REMOVE_HOSTED_WIDGET, id)
    }

    /**
     * 通过组件名移除已添加的组件
     * @param name  组件名
     */
    static async removeHostedWidgetByName(name: string): Promise<HostedWidget[]> {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.REMOVE_HOSTED_WIDGET_BY_NAME, name)
    }

    /**
     * 获取已添加的组件
     * @param name  组件名，可以不传
     */
    static async getHostedWidgets(name?: string): Promise<HostedWidget[]> {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.GET_HOSTED_WIDGETS, name)
    }

    static async getHostedWidget(id: string): Promise<HostedWidget> {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.GET_HOSTED_WIDGET, id)
    }

    /**
     * Opens the dev tools for a widget with the specified ID.
     *
     * @param {string} widgetId - The ID of the widget to open the dev tools for.
     * @return {Promise} A Promise that resolves when the dev tools are opened.
     */
    static async openDevTools(widgetId: string) {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.OPEN_DEV_TOOLS, widgetId)
    }

    static async openConfigRoute(widgetId:string,params?:WidgetParams) {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.OPEN_CONFIG_ROUTE, widgetId,params)
    }

    /**
     * 注册激活、呼出、置顶组件快捷键
     * @param widgetId  组件id
     * @param shortcut  如果传空或者不传，则会取消快捷键。更多快捷键配置，请查看Accelerator用法
     *                  https://www.electronjs.org/docs/latest/api/accelerator
     */
    static async registerActiveShortcut(widgetId: string, shortcut?: string): Promise<boolean> {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.REGISTER_ACTIVE_SHORTCUT, widgetId, shortcut)
    }

    static async setProxy(widgetId: string, proxy: string): Promise<boolean> {
        return ElectronUtils.getAPI()?.invoke(Channel.HOSTED_WIDGET, this.SET_PROXY, widgetId, proxy)
    }


}
