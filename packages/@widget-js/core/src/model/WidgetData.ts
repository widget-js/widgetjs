/**
 * 组件配置数据，用于存储组件自定义页面所设置的数据
 */
export class WidgetData {
    /**
     * 组件id
     */
    id?: string;
    /**
     * 组件名
     */
    name: string;
    /**
     * 背景颜色
     */
    backgroundColor?: string;
    /**
     * 文字颜色
     */
    color?: string;
    /**
     * 字体大小
     */
    fontSize?: number;
    /**
     * 字体
     */
    fontFamily?: string;
    /**
     * 圆角半径
     */
    borderRadius?: number;

    constructor(name: string, id?: string) {
        this.id = id;
        this.name = name;
    }

    public parseJSON(json: {}) {
        Object.assign(this, json)
    }
}
