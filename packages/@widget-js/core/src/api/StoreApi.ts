import {BaseApi} from './BaseApi';
import {Channel} from './Channel';

type BaseType = string | number | boolean

interface IStoreApi {
  get<T extends BaseType>(key: string): Promise<T | null>;

  set(key: string, value: BaseType | object): Promise<string>;

  getObject<T>(key: string, defaultValue?: T): Promise<T | undefined>;

  delete(key: string): Promise<void>;
}

type StoreApiMethods = keyof IStoreApi;

class StoreApiImpl extends BaseApi<StoreApiMethods> implements IStoreApi {
  getChannel(): string {
    return Channel.STORE;
  }

  async delete(key: string): Promise<void> {
    return this.invokeMethod('delete', key);
  }

  async get<T extends BaseType>(key: string): Promise<T | null> {
    return this.invokeMethod('get', key);
  }

  async getObject<T>(key: string, defaultValue?: T): Promise<T | undefined> {
    const result = await this.invokeMethod('get', key)
    if (result) {
      return JSON.parse(result)
    }
    if (defaultValue) {
      return defaultValue;
    }
    return undefined;
  }

  async set(key: string, value: BaseType | object): Promise<string> {
    if (typeof value == 'object') {
      return this.invokeMethod('set', key, JSON.stringify(value))
    }
    return this.invokeMethod('set', key, value)
  }

}

const StoreApi: IStoreApi = new StoreApiImpl();
export {StoreApi, StoreApiMethods}
