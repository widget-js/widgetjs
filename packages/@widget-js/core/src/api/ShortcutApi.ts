import {BaseApi} from "./BaseApi";
import {Channel} from "./Channel";

interface IShortcutApi {
  register: (shortcut: string) => void
  unregister: (shortcut: string) => void
}

type ShortcutApiMethods = keyof IShortcutApi;

enum ShortcutApiEvent {
  TRIGGERED = "channel::cn.widgetjs.core.shortcut.triggered"
}


class ShortcutApiImpl extends BaseApi<ShortcutApiMethods> implements IShortcutApi {
  getChannel(): string {
    return Channel.SHORTCUT;
  }

  async register(shortcut: string) {
    return await this.invoke('register', shortcut);
  }

  async unregister(shortcut: string) {
    return await this.invoke('unregister', shortcut);
  }

}

const ShortcutApi: IShortcutApi = new ShortcutApiImpl();
export {ShortcutApi, ShortcutApiMethods, ShortcutApiEvent}
