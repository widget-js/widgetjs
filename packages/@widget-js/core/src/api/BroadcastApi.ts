import {BroadcastEvent} from "../model/event/BroadcastEvent";
import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";
import {WidgetApiEvent} from "./WidgetApi";
import {ShortcutApiEvent} from "./ShortcutApi";
import {ClipboardApiEvent} from "./ClipboardApi";

type BroadcastEventType = WidgetApiEvent | ShortcutApiEvent | ClipboardApiEvent | string

interface IBroadcastApi {
  send: (event: BroadcastEvent) => Promise<void>;
  register: (...event: BroadcastEventType[]) => Promise<void>;
  unregister: (...event: BroadcastEventType[]) => Promise<void>;
}

type BroadcastApiMethods = keyof IBroadcastApi;

export class BroadcastApiImpl extends BaseApi<BroadcastApiMethods> implements IBroadcastApi {
  async send(event: BroadcastEvent) {
    await this.invoke('send', event);
  }

  async register(...event: BroadcastEventType[]) {
    await this.invoke('register', event)
  }

  async unregister(...event: BroadcastEventType[]) {
    await this.invoke('unregister', event)
  }

  getChannel(): string {
    return Channel.BROADCAST;
  }

}

const BroadcastApi: IBroadcastApi = new BroadcastApiImpl();

export {BroadcastApi, BroadcastApiMethods, BroadcastEventType}
