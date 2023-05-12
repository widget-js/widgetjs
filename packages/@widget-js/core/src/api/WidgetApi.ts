import {Widget} from "../model/Widget";
import {WidgetPackage} from "../model/WidgetPackage";
import {Channel} from "./Channel";
import {WidgetParams} from "../model/WidgetParams";
import {UrlUtils} from "../utils/UrlUtils";
import {WidgetData} from "../model/WidgetData";
import {BroadcastEvent} from "../model/event/BroadcastEvent";
import {BroadcastApi} from "./BroadcastApi";
import localforage from "localforage";
import {BaseApi} from "./BaseApi";
import {HostedMode} from "../model/HostedMode";
import {SaveWidgetOption} from "./WidgetDataApi";


interface IWidgetApi {
    registerWidgets(widgets: Widget[]): Promise<void>;

    registerWidgetPackage(widgetPackage: WidgetPackage): Promise<void>;

    getWidgets(): Promise<Widget[]>;

    getWidget(name: string): Promise<Widget>;

    getWidgetPackage(name: string): Promise<WidgetPackage>

    getWidgetPackages(): Promise<WidgetPackage[]>;

    getWidgetUrl(widgetName: string, widgetParams: WidgetParams): Promise<string | null>

    getWidgetPackageIndexUrl(packageName: string, hash?: boolean): Promise<string | null>

    getWidgetConfigUrl(widgetName: string, widgetParams: WidgetParams): Promise<string | null>

    // saveDataByName<T extends WidgetData>(data: T, options: SaveWidgetOption): Promise<string>

    getWidgetPackageUrl(packageName: string): Promise<string | null>
}

type WidgetApiMethods = keyof IWidgetApi;

enum WidgetApiEvent {
    DATA_CHANGED = "event::cn.widgetjs.core.widget.data-changed",
    EDIT_DESKTOP_WIDGETS = "event::cn.widgetjs.core.widget.desktop.edit",
}

class WidgetApiImpl extends BaseApi<WidgetApiMethods> implements IWidgetApi {

    getChannel(): string {
        return Channel.WIDGET;
    }

    async registerWidgets(widgets: Widget[]) {
        return this.invokeMethod("registerWidgets", JSON.stringify(widgets));
    }

    async registerWidgetPackage(widgetPackage: WidgetPackage) {
        return this.invokeMethod("registerWidgetPackage", JSON.stringify(widgetPackage));
    }

    async getWidgets(): Promise<Widget[]> {
        const data = await this.invokeMethod('getWidgets');
        const widgets: Widget[] = [];
        if (data) {
            for (const item of data) {
                widgets.push(Widget.parseObject(item))
            }
        }
        return widgets;
    }

    async getWidgetPackages(): Promise<WidgetPackage[]> {
        return await this.invokeMethod('getWidgetPackages');
    }

    /**
     *
     * @param name package name
     */
    async getWidget(name: string): Promise<Widget> {
        return Widget.parseObject(await this.invokeMethod('getWidget', name));
    }

    /**
     *
     * @param name package name
     */
    async getWidgetPackage(name: string): Promise<WidgetPackage> {
        return WidgetPackage.parseObject(await this.invokeMethod('getWidgetPackage', name));
    }


    /**
     * 获取组件配置地址
     * @param widgetName
     */
    async getWidgetConfigUrl(widgetName: string, widgetParams: WidgetParams): Promise<string | null> {
        const widget = await this.getWidget(widgetName);
        if (!widget) return null;
        const configRoute = widget.getConfigRoute();
        if (!configRoute) return null;
        const widgetPackage = await this.getWidgetPackage(widget.packageName!);
        if (!widgetPackage) return null;
        return UrlUtils.getWidgetUrl(configRoute.url, widgetPackage, widgetParams);
    }

    async getWidgetUrl(widgetName: string, widgetParams: WidgetParams): Promise<string | null> {
        const widget = await this.getWidget(widgetName);
        if (!widget) return null;
        const indexRoute = widget.getIndexRoute();
        const widgetPackage = await this.getWidgetPackage(widget.packageName!);
        if (!widgetPackage) return null;
        return UrlUtils.getWidgetUrl(indexRoute.url, widgetPackage, widgetParams);
    }

    async getWidgetPackageIndexUrl(packageName: string, hash?: boolean): Promise<string | null> {
        const widgetPackage = await this.getWidgetPackage(packageName!);
        if (!widgetPackage) return null;
        return widgetPackage.getIndexUrl(hash);
    }

    async getWidgetPackageUrl(packageName: string): Promise<string | null> {
        const widgetPackage = await this.getWidgetPackage(packageName!);
        if (!widgetPackage) return null;
        return widgetPackage.url;
    }

    // /**
    //  * 通过组件名保存组件信息，通常用于存储可以在同类组件中共用的数据
    //  * @param data
    //  * @param options
    //  */
    // public async saveDataByName<T extends WidgetData>(data: T, options: SaveWidgetOption = {sendBroadcast: true}) {
    //     const store = this.getStore(data.name);
    //     const json = JSON.stringify(data);
    //     const result = await store.setItem(data.name, json);
    //     if (options.sendBroadcast) {
    //         const broadcastEvent = new BroadcastEvent({
    //             event: WidgetApiEvent.DATA_CHANGED,
    //             payload: {
    //                 name: data.name,
    //                 id: options.id,
    //                 json
    //             }
    //         });
    //         await BroadcastApi.send(broadcastEvent);
    //     }
    //     return result;
    // }
    //
    // private stores = new Map<string, LocalForage>()
    //
    // /**
    //  * 获取组件 LocalForage 存储实例
    //  * @param name
    //  */
    // public getStore(name: string): LocalForage {
    //     if (this.stores.has(name)) {
    //         return this.stores.get(name)!
    //     }
    //     const store = localforage.createInstance({name: name});
    //     this.stores.set(name, store);
    //     return store;
    // }

}


const WidgetApi = new WidgetApiImpl();
export {WidgetApi, WidgetApiEvent, WidgetApiMethods}
