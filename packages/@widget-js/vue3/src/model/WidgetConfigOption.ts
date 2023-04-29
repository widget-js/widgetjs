export type ConfigOption = {
    custom?: boolean;
    borderRadius?: boolean;
    backgroundColor?: boolean;
    fontSize?: boolean;
    color?: boolean;
    previewWidth?: number;
    previewHeight?: number;
    title?: string;
    preview?: boolean;
}

/**
 * 配置组件设置页面 要显示哪些表单
 */
export class WidgetConfigOption {
    custom = true;
    borderRadius = false;
    backgroundColor = false;
    fontSize = false;
    color = false;
    previewWidth = 250;
    previewHeight = 250;
    preview = true;
    title?: string;

    constructor(option: ConfigOption) {
        this.custom = option.custom ?? true;
        this.borderRadius = option.borderRadius ?? false;
        this.backgroundColor = option.backgroundColor ?? false;
        this.fontSize = option.fontSize ?? false;
        this.color = option.color ?? false;
        this.previewWidth = option.previewWidth ?? 250;
        this.previewHeight = option.previewHeight ?? 250;
        this.title = option.title;
        this.preview = option.preview ?? true;
    }

    isSupportBackgroundSetting() {
        return this.borderRadius || this.backgroundColor
    }

    isSupportTextSetting() {
        return this.fontSize || this.color
    }
}
