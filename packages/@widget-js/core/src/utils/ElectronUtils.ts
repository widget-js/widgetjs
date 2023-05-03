export class ElectronUtils {
  static hasElectronApi(): boolean {
    return this.getAPI() != null;
  }

  /**
   * 获取ElectronAPI
   * windows api
   */
  static getAPI() {
    if (Reflect.has(window, "electronAPI")) {
      //@ts-ignore
      return window.electronAPI;
    } else if (Reflect.has(window.parent, "electronAPI")) {
      //@ts-ignore
      return window.parent.electronAPI;
    }
    return null
  }

  static async invokeMethod(channel: string, method: string, ...args: any[]): Promise<any> {
    return this.getAPI()?.invoke(channel, method, ...args);
  }

  static async invoke(channel: string, ...args: any[]): Promise<any> {
    return this.getAPI()?.invoke(channel, ...args);
  }
}
