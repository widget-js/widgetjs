import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";

interface IDialogApi {
  pickFile(extensions?: string[]): Promise<string | undefined>

  pickFolder(): Promise<string | undefined>
}

type DialogApiMethods = keyof IDialogApi;

class DialogApiImpl extends BaseApi<DialogApiMethods> implements IDialogApi {

  getChannel(): string {
    return Channel.DIALOG;
  }

  /**
   * 选取单个文件
   * @param extensions 允许的文件后缀格式，如：["txt","docx","gif"]
   */
  pickFile(extensions: string[] | undefined): Promise<string | undefined> {
    return this.invokeMethod('pickFile', extensions);
  }

  pickFolder(): Promise<string | undefined> {
    return this.invokeMethod('pickFolder');
  }

}


const DialogApi: IDialogApi = new DialogApiImpl();
export {DialogApiMethods, DialogApi,}
