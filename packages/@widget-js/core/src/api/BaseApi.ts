import {ElectronUtils} from "../utils/ElectronUtils";

export abstract class BaseApi<T extends string> {

  abstract getChannel(): string

  protected async invoke(method: T, ...args: any[]): Promise<any> {
    return await ElectronUtils.invoke(this.getChannel(), method, ...args);
  }

}
