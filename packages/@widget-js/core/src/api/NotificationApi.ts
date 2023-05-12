import {AppNotification} from "../model/AppNotification";
import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";

interface INotificationApi {
  send(notification: AppNotification): Promise<void>;

  hide(): Promise<void>;
}

type NotificationApiMethods = keyof INotificationApi

enum NotificationApiEvent {
  CONFIRM = "event::cn.widgetjs.core.notification.confirm",
  CANCEL = "event::cn.widgetjs.core.notification.cancel",
  HIDE = "event::cn.widgetjs.core.notification.hide",
}

class NotificationApiImpl extends BaseApi<NotificationApiMethods> implements INotificationApi {

  // static async url(url: string, duration: number = -1) {
  //     this.invoke(Channel.NOTIFICATION, new AppNotification({
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
  async call(avatar: string, audio: string, title: string, message: string, lyric: string) {
    await this.invoke(new AppNotification({
      avatar,
      audio,
      message,
      title,
      duration: -1,
      lyric,
      type: "call",
    }));
  }

  async send(notification: AppNotification) {
    return this.invokeMethod('send', notification);
  }

  async reminder(title: string, message: string, icon: string, cancelButtonText: string,
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

  async advanceCountdown(message: string, targetTime: string, title?: string) {
    return await this.send(new AppNotification({
      title,
      message,
      targetTime,
      type: "advance-countdown"
    }))
  }

  async countdown(message: string, targetTime: string) {
    await this.send(new AppNotification({
      message,
      targetTime,
      backgroundColor: 'rgba(0,0,0,0.5)',
      duration: -1,
      type: "countdown"
    }));
  }

  async success(message: string, duration: number = 5000) {
    await this.send(new AppNotification({
      message,
      type: "success",
      icon: "check_circle_line",
      duration
    }));
  }

  async error(message: string, duration: number = 5000) {
    await this.send(new AppNotification({
      message,
      type: "error",
      icon: "close_circle_line",
      duration
    }));
  }

  async warning(message: string, duration: number = 5000) {
    await this.send(new AppNotification({
      message,
      type: "warning",
      icon: "warning_line",
      duration
    }));
  }

  async info(message: string, duration: number = 5000) {
    await this.send(new AppNotification({
      message,
      type: "info",
      icon: "information_line",
      duration
    }));
  }

  /**
   * 隐藏通知
   */
  async hide() {
    await this.invokeMethod('hide');
  }

  getChannel(): string {
    return Channel.NOTIFICATION;
  }
}

const NotificationApi: NotificationApiImpl = new NotificationApiImpl();
export {NotificationApi, NotificationApiMethods, NotificationApiEvent}
