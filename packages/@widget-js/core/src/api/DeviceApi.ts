import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";
import {Point} from "../model/msic/graphics";

interface IDeviceApi {
  getCursorScreenPoint(): Promise<Point>;

  isAllKeyReleased(): Promise<boolean>;
}

type DeviceApiMethods = keyof IDeviceApi;

export class DeviceApiImpl extends BaseApi<DeviceApiMethods> implements IDeviceApi {

  /**
   * 获取当前鼠标位置
   */
  async getCursorScreenPoint(): Promise<Point> {
    return this.invokeMethod('getCursorScreenPoint');
  }

  /**
   * 判断是否所有按键都已经释放
   */
  async isAllKeyReleased(): Promise<boolean> {
    return this.invokeMethod('isAllKeyReleased');
  }

  getChannel(): string {
    return Channel.DEVICE;
  }
}


const DeviceApi: IDeviceApi = new DeviceApiImpl();

export {DeviceApi, DeviceApiMethods}
