import {ElectronUtils} from "../utils/ElectronUtils";

export abstract class BaseApi<T extends string> {

  abstract getChannel(): string

  protected async invokeMethod(method: T, ...args: any[]): Promise<any> {
    return await ElectronUtils.invokeMethod(this.getChannel(), method, ...args);
  }

  protected async invoke(...args: any[]): Promise<any> {
    return await ElectronUtils.invoke(this.getChannel(), ...args);
  }
}
