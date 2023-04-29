import {ElectronUtils} from '../utils/ElectronUtils'
import {Channel} from "./Channel";

export class LogApi {
  static info(name: string, ...data: any[]) {
    console.info(...data)
    ElectronUtils.invoke(Channel.LOG , name, 'info', ...data)
  }

  static error(name: string, ...data: any[]) {
    console.error(...data)
    ElectronUtils.invoke(Channel.LOG, name, 'error', ...data)
  }

  static warn(name: string, ...data: any[]) {
    console.warn(...data)
    ElectronUtils.invoke(Channel.LOG, name, 'warn', ...data)
  }

  static log(name: string, ...data: any[]) {
    console.log(...data)
    ElectronUtils.invoke(Channel.LOG, name, 'log', ...data)
  }
}
