/**
 * 组件参数，如宽，高，id，语言等环境参数
 */
import {parseQuery} from "../router/query";
import {snakeCase} from "change-case";
import {HostedMode} from "./HostedMode";
import {stringify} from "ts-jest";

export class WidgetParams {
    static readonly PARAM_PREFIX = "w_";
    static readonly PARAM_ID = "id";
    static readonly PARAM_WIDTH = "width";
    static readonly PARAM_HEIGHT = "height";
    static readonly PARAM_WIDTH_PX = "width_px";
    static readonly PARAM_HEIGHT_PX = "height_px";
    static readonly PARAM_X = "x";
    static readonly PARAM_Y = "y";
    static readonly PARAM_LANG = "lang";
    static readonly PARAM_THEME = "theme";
    static readonly PARAM_MODE = "mode";
    static readonly PARAM_RADIUS = "radius";
    static readonly PARAM_NAME = "name";
    static readonly PARAM_TITLE = "title";
    static readonly PARAM_PREVIEW = "preview";
    static readonly PARAMS = [
        WidgetParams.PARAM_ID,
        WidgetParams.PARAM_WIDTH,
        WidgetParams.PARAM_HEIGHT,
        WidgetParams.PARAM_X,
        WidgetParams.PARAM_Y,
        WidgetParams.PARAM_LANG,
        WidgetParams.PARAM_THEME,
        WidgetParams.PARAM_MODE,
        WidgetParams.PARAM_WIDTH_PX,
        WidgetParams.PARAM_HEIGHT_PX,
        WidgetParams.PARAM_NAME,
        WidgetParams.PARAM_TITLE,
        WidgetParams.PARAM_PREVIEW,
    ];
    //组件id
    id?: string;
    //网格宽度，1就代表宽度占用1格
    width?: number;
    //宽度,单位px
    widthPx?: number;
    //宽度,单位px
    heightPx?: number;
    //网格高度，2就代表高度占用2格
    height?: number;
    x?: number;
    y?: number;
    //是否是预览模式，添加组件时，预览状态
    preview?: boolean;
    //语言环境：zh,en,jp...
    lang?: string;
    //主题：浅色，深色
    theme?: ThemeMode;
    //
    mode?: HostedMode;
    //系统设置的组件圆角半径
    radius?: number;
    //组件名
    name?: string;
    title?: string;

    /**
     * 将组件参数转为url参数
     * @param object
     * @return URLSearchParams  w_w=2&w_h=2&w_id=21&w_width=156&w_height=156
     */
    toUrlParams(): URLSearchParams {
        const urlParams = new URLSearchParams();
        const ownPropertyNames = Object.getOwnPropertyNames(this);
        for (let ownPropertyName of ownPropertyNames) {
            type ObjectKey = keyof typeof this;
            const key = ownPropertyName as ObjectKey;
            const value = this[key];
            if (value) {
                urlParams.append(WidgetParams.PARAM_PREFIX + snakeCase(ownPropertyName), value.toString())
            }
        }
        return urlParams
    }

    getPersistKey(): string {
        return `${this.name}-${this.id}`;
    }

    /**
     * 从当前地址解析组件参数：
     * http://localhost:8080/#/widget/config/labor_progress?w_w=2&w_h=2&w_width=156&w_height=156
     * =>
     *  {width:2,height:2,id:21,width_px:156,height_px:156}
     */
    static fromCurrentLocation(): WidgetParams {
        const href = window.location.href;
        let strings = href.split("?");
        if (strings.length > 1) {
            let queryString = strings[1];
            return this.fromObject(parseQuery(queryString));
        }
        return new WidgetParams();
    }

    static fromLocation(url: string): WidgetParams {
        let strings = url.split("?");
        if (strings.length > 1) {
            let queryString = strings[1];
            return this.fromObject(parseQuery(queryString));
        }
        return new WidgetParams();
    }

    private static setValue(widgetEnv: WidgetParams, key: string, value: string) {
        const keyWithoutPrefix = key.replace(this.PARAM_PREFIX, "");
        if (keyWithoutPrefix == WidgetParams.PARAM_ID) {
            widgetEnv.id = value
        } else if (keyWithoutPrefix == WidgetParams.PARAM_X) {
            widgetEnv.x = parseInt(value)
        } else if (keyWithoutPrefix == WidgetParams.PARAM_Y) {
            widgetEnv.y = parseInt(value)
        } else if (keyWithoutPrefix == WidgetParams.PARAM_HEIGHT) {
            widgetEnv.height = parseInt(value)
        } else if (keyWithoutPrefix == WidgetParams.PARAM_WIDTH) {
            widgetEnv.width = parseInt(value)
        } else if (keyWithoutPrefix == WidgetParams.PARAM_LANG) {
            widgetEnv.lang = value
        } else if (keyWithoutPrefix == WidgetParams.PARAM_THEME) {
            widgetEnv.theme = value as ThemeMode
        } else if (keyWithoutPrefix == WidgetParams.PARAM_MODE) {
            widgetEnv.mode = parseInt(value) as HostedMode
        } else if (keyWithoutPrefix == WidgetParams.PARAM_RADIUS) {
            widgetEnv.radius = parseInt(value)
        } else if (keyWithoutPrefix == WidgetParams.PARAM_WIDTH_PX) {
            widgetEnv.widthPx = parseInt(value)
        } else if (keyWithoutPrefix == WidgetParams.PARAM_HEIGHT_PX) {
            widgetEnv.heightPx = parseInt(value)
        } else if (keyWithoutPrefix == WidgetParams.PARAM_NAME) {
            widgetEnv.name = value
        } else if (keyWithoutPrefix == WidgetParams.PARAM_TITLE) {
            widgetEnv.title = value
        } else if (keyWithoutPrefix == WidgetParams.PARAM_PREVIEW) {
            widgetEnv.preview = (value === 'true')
        }
    }

    /**
     * 从对象键值对中初始化组件参数
     * {w_width:2,w_height:2,w_id:21,w_width_px:156,w_height_px:156}=>
     *  {width:2,height:2,id:21,width_px:156,height_px:156}
     * @param object
     */
    static fromObject(object: any): WidgetParams {
        const widgetEnv = new WidgetParams();
        const ownPropertyNames = Object.getOwnPropertyNames(object);
        for (let ownPropertyName of ownPropertyNames) {
            type ObjectKey = keyof typeof this;
            const key = ownPropertyName as ObjectKey;
            const value = object[key];
            this.setValue(widgetEnv, key, value);
        }
        return widgetEnv;
    }
}

export enum ThemeMode {
    AUTO = "auto",
    LIGHT = "LIGHT",
    DARK = "DARK"
}

