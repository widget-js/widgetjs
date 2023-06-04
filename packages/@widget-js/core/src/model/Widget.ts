import {HostedMode} from "./HostedMode";
import {WidgetPermission} from "../permission/permission";
import {LanguageCode, LanguageTextMap} from "../lang/LanguageCode";
import {getTextByLanguageCode} from "../utils/LanguageUtils";

type WidgetOptions = {
  name: string,
  title: LanguageTextMap,
  description: LanguageTextMap,
  keywords: WidgetKeyword[],
  lang: LanguageCode,
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number,
  minWidth?: number,
  minHeight?: number,
  packageName?: string,
  previewImage?: string,
  /**
   * 悬浮窗模式 是否可移动
   */
  movable?: boolean,
  supportHostedMode?: HostedMode;
  backgroundThrottling?: boolean;
  shortcut?: string;
  /**
   * 组件拉伸后，是否强制刷新组件
   */
  refreshWhenResided?: boolean;
  hideWhenBlur?: boolean;
  routes: WidgetRoute[];
  permissions?: WidgetPermission[];
  broadcastChannels?: string[];
}

export class Widget {
  //组件名称,名称与包名类似，e.g. com.example.countdown
  readonly name: string;

  /**
   * 组件标题，显示在界面上的，
   * https://zh.m.wikipedia.org/zh-hans/ISO_639-1
   */
  readonly title: LanguageTextMap;
  /**
   * 组件介绍
   */
  readonly description: LanguageTextMap;
  readonly keywords: WidgetKeyword[];
  /**
   * 组件默认语言
   */
  readonly lang: LanguageCode = "zh-CN";
  readonly width: number;
  packageName?: string | null;
  readonly height: number;
  readonly maxWidth: number;
  readonly maxHeight: number;
  readonly minWidth: number;
  readonly minHeight: number;
  readonly movable: boolean;
  readonly backgroundThrottling: boolean;
  /**
   * 预览图片，可以是GIF
   */
  readonly previewImage?: string;
  readonly supportHostedMode: number;
  readonly hideWhenBlur: boolean;

  readonly shortcut?: string;
  /**
   * 组件拉伸后，是否强制刷新组件
   */
  readonly refreshWhenResided: boolean

  /**
   * 组件其他页面的url在这注册
   */
  readonly routes: WidgetRoute[];
  readonly permissions: WidgetPermission[];

  constructor(options: WidgetOptions) {
    this.name = options.name;
    this.title = options.title;
    this.description = options.description;
    this.keywords = options.keywords;
    this.lang = options.lang;
    this.width = options.width;
    this.height = options.height;
    this.movable = options.movable ?? true;
    this.permissions = options.permissions ?? [];
    this.maxWidth = options.maxWidth ?? options.width;
    this.maxHeight = options.maxHeight ?? options.height;
    this.minWidth = options.minWidth ?? options.width;
    this.minHeight = options.minHeight ?? options.height;
    this.backgroundThrottling = options.backgroundThrottling ?? true;
    this.packageName = options.packageName;
    this.previewImage = options.previewImage;
    this.shortcut = options.shortcut;
    this.refreshWhenResided = options.refreshWhenResided ?? false;
    this.hideWhenBlur = options.hideWhenBlur == null ? false : options.hideWhenBlur;
    this.supportHostedMode = options.supportHostedMode ?? HostedMode.NORMAL | HostedMode.OVERLAP;
    this.routes = options.routes;
  }

  getIndexRoute(): WidgetRoute {
    const result = this.routes.find((it) => it.name.toLowerCase() == 'index');
    return result!;
  }

  getConfigRoute(): WidgetRoute | undefined {
    return this.routes.find((it) => it.name.toLowerCase() == 'config');
  }

  isConfigurable(): boolean {
    return this.getConfigRoute() != null;
  }

  /**
   * 获取组件标题
   * @param lang 语言环境，不传则获取默认语言
   */
  getTitle(lang?: LanguageCode): string | undefined {
    return getTextByLanguageCode(this.title, lang);
  }

  /**
   * 获取组件描述
   * @param lang 语言环境，不传则获取默认标题
   */
  getDescription(lang?: LanguageCode): string | undefined {
    return getTextByLanguageCode(this.description, lang);
  }


  static parseJSON(json: string): Widget {
    const object = JSON.parse(json);
    return this.parseObject(object);
  }

  static parseObject(obj: any): Widget {
    let widget = new Widget({
      description: {},
      height: 0,
      keywords: [],
      lang: "zh-CN",
      name: "",
      routes: [],
      title: {},
      width: 0
    });
    Object.assign(widget, obj);
    return widget;
  }

  /**
   * 是否支持悬浮窗
   */
  isSupportOverlap(): boolean {
    return (this.supportHostedMode & HostedMode.OVERLAP) > 0;
  }


  isResizable(): boolean {
    return !(this.minWidth == this.width &&
        this.maxWidth == this.width &&
        this.minHeight == this.height &&
        this.maxHeight == this.height);
  }

  isSupportBackground(): boolean {
    return (this.supportHostedMode & HostedMode.BACKGROUND) > 0;
  }

  /**
   * 是否支持普通模式
   */
  isSupportNormal() {
    return (this.supportHostedMode & HostedMode.NORMAL) > 0;
  }

  isSupportWallpaper() {
    return (this.supportHostedMode & HostedMode.WALLPAPER) > 0;
  }

  isSupportScreen() {
    return (this.supportHostedMode & HostedMode.SCREEN) > 0;
  }
}

export interface WidgetRoute {
  name: string;
  url: string;
  meta?: { [key: string]: string };
  /**
   * 使用自定义悬浮窗样式
   */
  customOverlapView?: boolean;
  windowOptions?: WindowOption
}

export interface WindowOption {
  width?: number;
  height?: number;
  maxHeight?: number;
  maxWidth?: number;
  minWidth?: number;
  minHeight?: number;
}

export enum WidgetKeyword {
  RECOMMEND = "recommend",
  TOOLS = "tools",
  EFFICIENCY = "efficiency",
  PICTURE = "picture",
  LIFE = "life",
  SHORTCUT = "shortcut",
  COUNTDOWN = "countdown",
  TIMER = "timer",
  INFO = "info",
  DASHBOARD = "dashboard",
}


