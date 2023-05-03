import {Channel} from "./Channel";
import {ElectronUtils} from "../utils/ElectronUtils";
import {Rectangle} from "../model/interface/Rectangle";
import {Position} from "../model/msic/graphics";
import {BaseApi} from "./BaseApi";

interface IBrowserWindowApi {
  setIgnoreMouseEvent(ignore: boolean): Promise<void>;

  show(): Promise<void>;

  hide(): Promise<void>;

  showInactive(): Promise<void>;

  center(): Promise<void>;

  startDraggingWindow(): Promise<void>;

  stopDraggingWindow(): Promise<void>;

  setAlwaysOnTop(alwaysOnTop: boolean): Promise<void>;

  isAlwaysOnTop(): Promise<boolean>;

  openUrl(url: string): Promise<void>;

  moveTop(): Promise<void>;

  openDevTools(): Promise<void>;

  setPosition(x: number, y: number, animation: boolean): Promise<void>;

  getPosition(): Promise<Position>;

  blur(): Promise<void>;

  focus(): Promise<void>;

  setResizable(resizable: boolean): Promise<void>;

  getBounds(): Promise<Rectangle>;

  setBounds(bounds: Partial<Rectangle>, animate: boolean): Promise<void>;

  alignToScreen(align: AlignPosition): Promise<void>;

  existsByUrl(url: string): Promise<boolean>;
}

type BrowserWindowApiMethods = keyof IBrowserWindowApi;
type AlignPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

enum BrowserWindowApiEvent {
  BLUR = "event::cn.widgetjs.core.browser-window.blur",
  FOCUS = "event::cn.widgetjs.core.browser-window.focus",
}

export class BrowserWindowApiImpl extends BaseApi<BrowserWindowApiMethods> implements IBrowserWindowApi {

  getChannel(): string {
    return Channel.BROWSER_WINDOW
  }

  async setIgnoreMouseEvent(ignore: boolean) {
    await this.invokeMethod('setIgnoreMouseEvent', ignore);
  }

  async show() {
    await this.invokeMethod('show', true);
  }

  async showInactive() {
    await this.invokeMethod('showInactive', true);
  }

  async hide() {
    await this.invokeMethod('hide', false);
  }

  async center() {
    await this.invokeMethod('center', false);
  }

  async setAlwaysOnTop(alwaysOnTop: boolean) {
    await this.invokeMethod('setAlwaysOnTop', alwaysOnTop);
  }

  async isAlwaysOnTop(): Promise<boolean> {
    return await this.invokeMethod('isAlwaysOnTop');
  }

  async openUrl(url: string) {
    await this.invokeMethod('openUrl', url);
  }


  async moveTop() {
    await this.invokeMethod('moveTop');
  }

  async openDevTools() {
    await this.invokeMethod('openDevTools');
  }

  /**
   * 设置窗口位置
   * @param x
   * @param y
   * @param animation 动画只在mac系统有效
   */
  async setPosition(x: number, y: number, animation: boolean) {
    await this.invokeMethod('setPosition', x, y, animation);
  }

  async getPosition(): Promise<Position> {
    return await this.invokeMethod('getPosition');
  }


  async blur() {
    return await this.invokeMethod('blur');
  }

  async focus() {
    return await this.invokeMethod('focus');
  }

  /**
   * 设置窗口是否可以拉伸
   * @param resizable
   */
  async setResizable(resizable: boolean) {
    return await this.invokeMethod('setResizable', resizable);
  }


  async getBounds(): Promise<Rectangle> {
    return await this.invokeMethod('getBounds');
  }

  async setBounds(bounds: Partial<Rectangle>, animate?: boolean): Promise<void> {
    return await this.invokeMethod("setBounds", bounds, animate);
  }


  async alignToScreen(align: AlignPosition) {
    return await this.invokeMethod('alignToScreen', align);
  }

  async startDraggingWindow() {
    return await this.invokeMethod('startDraggingWindow');
  }

  async stopDraggingWindow() {
    return await this.invokeMethod('stopDraggingWindow');
  }

  /**
   * 通过url检测窗口是否存在
   * @param url
   */
  async existsByUrl(url: string): Promise<boolean> {
    return await this.invokeMethod('existsByUrl', url);
  }

}

const BrowserWindowApi = new BrowserWindowApiImpl();
export {BrowserWindowApi, BrowserWindowApiMethods, BrowserWindowApiEvent}

