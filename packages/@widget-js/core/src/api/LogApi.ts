import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";

interface ILogApi {
  info(...data: any[]): void;

  error(...data: any[]): void;

  warn(...data: any[]): void;

  log(...data: any[]): void;
}

type LogApiMethods = keyof ILogApi;

class LogApiImpl extends BaseApi<LogApiMethods> implements ILogApi {

  getChannel(): string {
    return Channel.LOG
  }

  info(...data: any[]) {
    console.info(...data)
    this.invokeMethod('info', ...data)
  }

  error(...data: any[]) {
    console.error(...data)
    this.invokeMethod('error', ...data)
  }

  warn(...data: any[]) {
    console.warn(...data)
    this.invokeMethod('warn', ...data)
  }

  log(...data: any[]) {
    console.log(...data)
    this.invokeMethod('log', ...data)
  }
}

const LogApi: ILogApi = new LogApiImpl();
export {LogApi, LogApiMethods}
