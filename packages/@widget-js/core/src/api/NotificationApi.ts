import {AppNotification, NotificationType} from "../model/AppNotification";
import {Channel} from "./Channel";
import {ElectronUtils} from "../utils/ElectronUtils";

type NotificationCallback = (type: NotificationType, message: string, duration: number) => void

export class NotificationApi {

    // static async url(url: string, duration: number = -1) {
    //     ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, new AppNotification({
    //         url, message: "",
    //         duration,
    //         type: "url",
    //     }));
    // }

    /**
     * 来电
     * @param avatar    头像地址
     * @param audio     音频地址
     * @param title     标题文件
     * @param message   初始消息
     * @param lyric     歌词字符串
     */
    static async call(avatar: string, audio: string, title: string, message: string, lyric: string) {
        ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, new AppNotification({
            avatar,
            audio,
            message,
            title,
            duration: -1,
            lyric,
            type: "call",
        }));
    }

    static async send(notification: AppNotification) {
        return ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, notification);
    }

    static async reminder(title: string, message: string, icon: string, cancelButtonText: string,
                          confirmButtonText: string, cancelBroadcast: string, confirmBroadcast: string, duration: number = 5000) {
        return await this.send(new AppNotification({
            icon,
            message,
            title,
            duration,
            cancelButtonText,
            confirmButtonText,
            cancelBroadcast,
            confirmBroadcast,
            type: "reminder",
        }))
    }

    static async advanceCountdown(message: string, targetTime: string, title?: string) {
        return await this.send(new AppNotification({
            title,
            message,
            targetTime,
            type: "advance-countdown"
        }))
    }

    static async countdown(message: string, targetTime: string) {
        ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, new AppNotification({

            message,
            targetTime,
            backgroundColor: 'rgba(0,0,0,0.5)',
            duration: -1,
            type: "countdown"
        }));
    }

    static async success(message: string, duration: number = 5000) {
        if (ElectronUtils.hasElectronApi()) {
            ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, new AppNotification({
                message,
                type: "success",
                icon: "check_circle_line",
                duration
            }));
        } else {
            this.callback("success", message, duration);
        }
    }

    static async error(message: string, duration: number = 5000) {
        if (ElectronUtils.hasElectronApi()) {
            ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, new AppNotification({
                message,
                type: "error",
                icon: "close_circle_line",
                duration
            }));
        } else {
            this.callback("error", message, duration);
        }
    }

    static async warning(message: string, duration: number = 5000) {
        if (ElectronUtils.hasElectronApi()) {
            ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, new AppNotification({
                message,
                type: "warning",
                icon: "warning_line",
                duration
            }));
        } else {
            this.callback("warning", message, duration);
        }
    }

    static async info(message: string, duration: number = 5000) {
        if (ElectronUtils.hasElectronApi()) {
            ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, new AppNotification({
                message,
                type: "info",
                icon: "information_line",
                duration
            }));
        } else {
            this.callback("info", message, duration);
        }
    }

    /**
     * 隐藏通知
     */
    static async hide() {
        if (ElectronUtils.hasElectronApi()) {
            ElectronUtils.getAPI()?.invoke(Channel.NOTIFICATION, null);
        }
    }

    private static callback: NotificationCallback

    static setDebugNotification(callback: NotificationCallback,) {
        this.callback = callback
    }
}
