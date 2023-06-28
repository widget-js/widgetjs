import {Widget} from "./Widget";
import {UrlUtils} from "../utils/UrlUtils";
import {LanguageCode, LanguageTextMap} from "../lang/LanguageCode";
import {getTextByLanguageCode} from "../utils/LanguageUtils";


type WidgetPackageOptions = {
  name: string,
  version: string,
  author: string,
  homepage: string,
  title: LanguageTextMap;
  description: LanguageTextMap;
  entry: string;
  remoteEntry?: string;
  remotePackage?: string;
  icon?: string;
  hash: boolean;
  url: string
  lang?: LanguageCode;
  widgets?: Widget[];
  devOptions?: DevOptions;
}

export class WidgetPackage {
  /**
   * 组件包名,一般为域名倒置，e.g. com.example
   */
  readonly name!: string;
  /**
   * 组件包版本，e.g. 1.0.2
   */
  readonly version!: string;
  /**
   * 组件作者署名
   */
  readonly author!: string;
  /**
   * 组件首页
   */
  readonly homepage?: string;
  /**
   * 组件描述
   */
  readonly title!: { [key: LanguageCode | string]: string };
  /**
   * 组件描述
   */
  readonly description!: { [key: LanguageCode | string]: string };
  /**
   * 组件入口文件，通常为 index.html
   */
  readonly entry!: string;
  /**
   * 组件包的远程入口地址，
   */
  readonly remoteEntry?: string;
  readonly remotePackage?: string;
  /**
   * 组件包图标
   */
  readonly icon?: string;
  /**
   * Hash路由模式，默认为true
   */
  readonly hash: boolean = true;
  /**
   * 可能是网络地址，或者本地路径（解压后的文件夹路径）,
   * 网络地址：https://www.bilibili.com
   * 本地地址：file:///C:/Users/neo/Desktop
   * 在测试时。地址通常为: http://127.0.0.1:8080
   */
  readonly url!: string
  readonly widgets: Widget[] = [];
  devOptions?: DevOptions;

  constructor(options: WidgetPackageOptions) {
    this.name = options.name;
    this.version = options.version;
    this.author = options.author;
    this.homepage = options.homepage;
    this.title = options.title;
    this.description = options.description;
    this.entry = options.entry;
    this.remoteEntry = options.remoteEntry;
    this.remotePackage = options.remotePackage;
    this.hash = options.hash;
    this.url = options.url;
    this.icon = options.icon;
    this.devOptions = options.devOptions;
    if (options.widgets) {
      for (let widget of options.widgets) {
        this.widgets.push(widget)
      }
    }
  }

  static parseJSON(json: string): WidgetPackage {
    const object = JSON.parse(json);
    return this.parseObject(object);
  }

  static parseObject(obj: any): WidgetPackage {
    let widgetPackage = new WidgetPackage({
      author: "",
      description: {
        "zh-CN": "",
      },
      entry: "",
      hash: false,
      homepage: "",
      name: "",
      title: {
        "zh-CN": "",
      },
      url: "",
      version: ""
    });
    Object.assign(widgetPackage, obj);
    const widgets: Widget[] = []
    if (widgetPackage.widgets) {
      for (let jsonWidget of widgetPackage.widgets) {
        let widget = new Widget({
          description: {"zh-CN": ""},
          height: 0,
          keywords: [],
          lang: "zh-CN",
          name: '',
          routes: [],
          title: {"zh-CN": ""},
          width: 0
        });
        Object.assign(widget, jsonWidget);
        widgets.push(widget)
      }
    }
    widgetPackage.widgets.splice(0, widgetPackage.widgets.length)
    widgetPackage.widgets.push(...widgets)
    return widgetPackage;
  }

  /**
   * 获取组件包标题
   * @param lang 语言环境，不传则获取默认语言
   */
  getTitle(lang?: LanguageCode): string | undefined {
    return getTextByLanguageCode(this.title, lang)
  }

  /**
   * 获取组件包描述
   * @param lang 语言环境，不传则获取默认标题
   */
  getDescription(lang?: LanguageCode): string | undefined {
    return getTextByLanguageCode(this.description, lang)
  }


  /**
   * 获取组件完整路径
   * 如果url是http链接，直接返回链接
   * 如果是本地组件：file://链接，则返回 url+entry,e.g. file://C:\users\neo\desktop\index.html#
   */
  getIndexUrl(hash?: boolean) {
    return UrlUtils.getWidgetPackageIndexUrl(this.url, this.entry, hash == null ? this.hash : hash);
  }

}


export type DevOptions = {
  folder?: string;
  route?: boolean;
  devUrl?: string;
  remoteEntry?: string;
}
