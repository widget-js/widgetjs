import {Channel} from "./Channel";
import {BaseApi} from "./BaseApi";
import {FileTypeResult} from 'file-type';

export interface ReadDirOptions {
  ignoreDir?: boolean;
  traverseDir?: boolean;
}

interface IFileApi {
  readDirectory(path: string, options?: ReadDirOptions): Promise<string[]>;

  isDirectory(filePath: string): Promise<boolean>;

  getFileType(filePath: string): Promise<FileTypeResult>;
}

type FileApiMethods = keyof IFileApi;

class FileApiImpl extends BaseApi<FileApiMethods> implements IFileApi {
  getFileType(filePath: string): Promise<FileTypeResult> {
    return this.invokeMethod('getFileType', filePath);
  }

  isDirectory(filePath: string): Promise<boolean> {
    return this.invokeMethod('isDirectory', filePath);
  }

  getChannel(): string {
    return Channel.FILE;
  }

  readDirectory(path: string, options?: ReadDirOptions): Promise<string[]> {
    return this.invokeMethod('readDirectory', path, options);
  }

}


const FileApi: IFileApi = new FileApiImpl();

export {FileApi, FileApiMethods}
