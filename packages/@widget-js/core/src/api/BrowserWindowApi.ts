import {Channel} from "./Channel";
import {ElectronUtils} from "../utils/ElectronUtils";
import {Rectangle} from "../model/interface/Rectangle";
import {Position} from "../model/msic/graphics";

export class BrowserWindowApi {

  static readonly IGNORE_MOUSE_EVENT = "ignore-mouse-event"
  static readonly WINDOW_VISIBILITY = "window-visibility"
  static readonly CENTER = "center"
  static readonly ALWAYS_ON_TOP = "always-on-top"
  static readonly IS_ALWAYS_ON_TOP = "is-always-on-top"
  static readonly OPEN_URL = "open-url"
  static readonly MOVE_TOP = "move-top"
  static readonly OPEN_DEV_TOOLS = "open-dev-tools"
  static readonly SET_POSITION = "set-position"
  static readonly GET_POSITION = "get-position"
  static readonly BLUR = "blur"
  static readonly FOCUS = "focus"
  static readonly SET_RESIZABLE = "set-resizable"
  static readonly GET_BOUNDS = "get-bounds"
  static readonly SET_BOUNDS = "set-bounds"
  static readonly ALIGN_TO_SCREEN = "align-to-screen"
  static readonly START_DRAGGING_WINDOW = "start-dragging-window"
  static readonly STOP_DRAGGING_WINDOW = "stop-dragging-window"
  static readonly EXISTS_BY_URL = "exists-by-url"
  static readonly SHOW_INACTIVE = "show-inactive"
  static readonly SHOW = "show"

  static async setIgnoreMouseEvent(ignore: boolean) {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.IGNORE_MOUSE_EVENT, ignore);
  }

  static async show() {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.WINDOW_VISIBILITY, true);
  }

  static async showInactive() {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.SHOW_INACTIVE, true);
  }

  static async hide() {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.WINDOW_VISIBILITY, false);
  }

  static async center() {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.CENTER, false);
  }

  /**
   * @deprecated
   * @param show
   */
  static async setWindowVisibility(show: boolean) {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.WINDOW_VISIBILITY, show);
  }

  static async setAlwaysOnTop(alwaysOnTop: boolean) {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.ALWAYS_ON_TOP, alwaysOnTop);
  }

  static async isAlwaysOnTop(): Promise<boolean> {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.IS_ALWAYS_ON_TOP);
  }

  static async openUrl(url: string) {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.OPEN_URL, url);
  }


  static async moveTop() {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.MOVE_TOP);
  }

  static async openDevTools() {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.OPEN_DEV_TOOLS);
  }

  /**
   * 设置窗口位置
   * @param x
   * @param y
   * @param animation 动画只在mac系统有效
   */
  static async setPosition(x: number, y: number, animation: boolean) {
    await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.SET_POSITION, x, y, animation);
  }

  static async getPosition(): Promise<Position> {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.GET_POSITION);
  }


  static async blur() {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.BLUR);
  }

  static async focus() {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.FOCUS);
  }

  /**
   * 设置窗口是否可以拉伸
   * @param resizable
   */
  static async setResizable(resizable: boolean) {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.SET_RESIZABLE, resizable);
  }


  static async getBounds(): Promise<Rectangle> {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.GET_BOUNDS);
  }

  static async setBounds(bounds: Partial<Rectangle>, animate?: boolean): Promise<Rectangle> {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.SET_BOUNDS, bounds, animate);
  }


  static async alignToScreen(align: "top" | "bottom") {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.ALIGN_TO_SCREEN, align);
  }

  static async startDraggingWindow() {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.START_DRAGGING_WINDOW);
  }

  static async stopDraggingWindow() {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.STOP_DRAGGING_WINDOW);
  }

  /**
   * 通过url检测窗口是否存在
   * @param url
   */
  static async existsByUrl(url: string): Promise<boolean> {
    return await ElectronUtils.invoke(Channel.BROWSER_WINDOW, this.EXISTS_BY_URL, url);
  }

}

