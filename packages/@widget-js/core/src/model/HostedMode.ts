export enum HostedMode {
    NORMAL = 0x00001,
    /**
     * 悬浮窗
     */
    OVERLAP = 0x00010,
    WALLPAPER = 0x00100,
    SCREEN = 0x01000,
    /**
     * 后台组件，没有界面，一般在后台执行定时任务
     */
    BACKGROUND = 0x10000,
    ALL = 0x11111,
}
