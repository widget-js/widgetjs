import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";

interface IAppApi {
  setConfig(key: string, value: string | number | boolean): Promise<void>

  getConfig(key: string, defaultValue: string | number | boolean): Promise<string | number | boolean>

  getVersion(): Promise<string>

  getPreloadPath(): Promise<string>

  openAddWidgetWindow(): Promise<void>

  openSettingWindow(): Promise<void>

  getIconFile(): Promise<string>
}

type AppApiMethods = keyof IAppApi;

enum AppApiEvent {
  CONFIG_CHANGED = "event::cn.widgetjs.core.app.config.changed",
}

class AppApiImpl extends BaseApi<AppApiMethods> implements IAppApi {
  async getIconFile(): Promise<string> {
    return this.invokeMethod('getIconFile');
  }

  getChannel(): string {
    return Channel.APP;
  }

  async setConfig(key: string, value: string | number | boolean) {
    return await this.invokeMethod('setConfig', key, value);
  }

  async getConfig(key: string, defaultValue: string | number | boolean): Promise<string | number | boolean> {
    const value = await this.invokeMethod("getConfig", key);
    if (value === null || value === undefined) {
      return defaultValue;
    }
    if (typeof defaultValue == "boolean") {
      return value === "true"
    }

    if (typeof defaultValue == "number") {
      return Number(value)
    }
    return value;
  }

  async openAddWidgetWindow() {
    return this.invokeMethod('openAddWidgetWindow');
  }

  /**
   * 获取应用版本号，格式为 x.y.z
   */
  async getVersion(): Promise<string> {
    return this.invokeMethod('getVersion');
  }

  async getPreloadPath(): Promise<string> {
    return this.invokeMethod('getPreloadPath');
  }

  async openSettingWindow() {
    return this.invokeMethod('openSettingWindow');
  }
}

const AppApi = new AppApiImpl();

export {AppApi, AppApiEvent, AppApiMethods}
