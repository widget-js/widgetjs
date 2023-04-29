export type NotificationType =
    | "countdown"
    | "advance-countdown"
    | "error"
    | "success"
    | "warning"
    | "info"
    | "reminder"
    | "url"
    | "call"

export enum NotificationSize {
    SMALL = 'small',
    NORMAL = 'normal',
    LARGE = 'large',
}

export interface NotificationOption {
    type?: NotificationType;
    title?: string;
    message: string;
    targetTime?: string;
    duration?: number;
    /**
     * 图片名，目前只支持mingcute图标。
     * https://www.mingcute.com/
     */
    icon?: string;
    color?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    cancelBroadcast?: string;
    confirmBroadcast?: string;
    size?: NotificationSize;
    url?: string;
    avatar?: string;
    audio?: string;
    lyric?: string;
    backgroundColor?: string;
}

export class AppNotification {
    type: NotificationType = "info"
    message: string;
    title?: string;
    targetTime?: string;
    duration: number;
    icon?: string;
    color?: string;
    backgroundColor?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    cancelBroadcast?: string;
    confirmBroadcast?: string;
    size: NotificationSize;
    url?: string;
    avatar?: string;
    audio?: string;
    lyric?: string;
    createdAt: string;

    constructor(option: NotificationOption) {
        this.createdAt = new Date().toISOString();
        this.type = option.type ?? "info";
        this.title = option.title;
        this.message = option.message;
        this.targetTime = option.targetTime;
        this.duration = option.duration ?? 5000;
        this.icon = option.icon;
        this.color = option.color ?? "#5D8AC8";
        this.confirmButtonText = option.confirmButtonText;
        this.cancelButtonText = option.cancelButtonText;
        this.cancelBroadcast = option.cancelBroadcast;
        this.confirmBroadcast = option.confirmBroadcast;
        this.size = option.size ?? NotificationSize.NORMAL;
        this.audio = option.audio;
        this.avatar = option.avatar;
        this.lyric = option.lyric;
        this.backgroundColor = option.backgroundColor ?? '#000000';
    }

}
