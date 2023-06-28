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

  minimize(): Promise<void>;

  restore(): Promise<void>;

  isMinimized(): Promise<boolean>;

  isMaximized(): Promise<boolean>;

  maximize(): Promise<void>;

  stopDraggingWindow(): Promise<void>;

  setAlwaysOnTop(alwaysOnTop: boolean): Promise<void>;

  isAlwaysOnTop(): Promise<boolean>;

  openUrl(url: string, option?: OpenUrlOptions): Promise<void>;

  moveTop(): Promise<void>;

  unmaximize(): Promise<void>;

  reload(): Promise<void>;

  setSize(width: number, height: number, animate?: boolean): Promise<void>;

  openDevTools(): Promise<void>;

  setPosition(options: SetPositionOptions): Promise<void>;

  getPosition(): Promise<Position>;

  blur(): Promise<void>;

  focus(): Promise<void>;

  setResizable(resizable: boolean): Promise<void>;

  setMovable(movable: boolean): Promise<void>;

  getBounds(): Promise<Rectangle>;

  setBounds(bounds: Partial<Rectangle>, animate: boolean): Promise<void>;

  alignToScreen(align: AlignPosition): Promise<void>;

  existsByUrl(url: string): Promise<boolean>;

  getMaximumSize(): Promise<number[]>;

  setZoomLevel(level: number): Promise<void>;

  isFocused(): Promise<boolean>;
}

type BrowserWindowApiMethods = keyof IBrowserWindowApi;
type AlignPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

interface OpenUrlOptions {
  partition?: string
}

interface SetPositionOptions {
  x?: number;
  y?: number;
  /**
   * 只有在 macOS 上有效
   */
  animation?: boolean;
}

enum BrowserWindowApiEvent {
  BLUR = "event::cn.widgetjs.core.browser-window.blur",
  FOCUS = "event::cn.widgetjs.core.browser-window.focus",
  SNAP_TO_EDGE = "event::cn.widgetjs.core.browser-window.snap_to_edge",
  RESIZE = "event::cn.widgetjs.core.browser-window.resize",
  CANCEL_SNAP_TO_EDGE = "event::cn.widgetjs.core.browser-window.cancel_snap_to_edge",
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

  async openUrl(url: string, option?: OpenUrlOptions) {
    if (ElectronUtils.hasElectronApi()) {
      await this.invokeMethod('openUrl', url, option);
    } else {
      window.open(url, '_blank')
    }
  }


  async moveTop() {
    await this.invokeMethod('moveTop');
  }

  async openDevTools() {
    await this.invokeMethod('openDevTools');
  }

  async setPosition(options: SetPositionOptions) {
    await this.invokeMethod('setPosition', options);
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

  async getMaximumSize(): Promise<number[]> {
    return await this.invokeMethod('getMaximumSize');
  }

  async minimize(): Promise<void> {
    return await this.invokeMethod('minimize');
  }

  async maximize(): Promise<void> {
    return await this.invokeMethod('maximize');
  }

  async isMaximized(): Promise<boolean> {
    return await this.invokeMethod('isMaximized');
  }

  async isMinimized(): Promise<boolean> {
    return await this.invokeMethod('isMinimized');
  }

  async restore(): Promise<void> {
    return await this.invokeMethod('restore');
  }

  async unmaximize(): Promise<void> {
    return await this.invokeMethod('unmaximize');
  }

  async setZoomLevel(level: number): Promise<void> {
    return await this.invokeMethod('setZoomLevel');
  }

  async reload(): Promise<void> {
    return await this.invokeMethod('reload');
  }

  async setMovable(movable: boolean): Promise<void> {
    return await this.invokeMethod('setMovable', movable);
  }

  async setSize(width: number, height: number, animate?: boolean): Promise<void> {
    return this.invokeMethod('setSize', width, height, animate);
  }

  async isFocused(): Promise<boolean> {
    return this.invokeMethod('isFocused');
  }

}

const BrowserWindowApi = new BrowserWindowApiImpl();
export {
  BrowserWindowApi,
  BrowserWindowApiMethods,
  OpenUrlOptions,
  SetPositionOptions,
  BrowserWindowApiEvent,
  AlignPosition
}

