import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";


interface IClipboardApi {
  getSelectedText: () => Promise<string | undefined>;

  getText: () => Promise<string | undefined>;
}

type ClipboardApiMethods = keyof IClipboardApi;

type ClipboardApiEvent = 'clipboard-changed';

class ClipboardApiImpl extends BaseApi<ClipboardApiMethods> implements IClipboardApi {

  async getSelectedText(): Promise<string | undefined> {
    return this.invoke('getSelectedText');
  }

  async getText(): Promise<string | undefined> {
    return this.invoke('getText');
  }

  getChannel(): string {
    return Channel.CLIPBOARD;
  }

}


const ClipboardApi: IClipboardApi = new ClipboardApiImpl();

export {ClipboardApi, ClipboardApiMethods, ClipboardApiEvent}
