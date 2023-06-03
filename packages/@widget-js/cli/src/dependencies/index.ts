import {RemoteDependencies} from "./remoteDependencies";
import {LocalDependencies} from "./localDependencies";

export type DependenciesOptions = 'remote' | 'local';
export default async function (options: any) {
  let type = options.type as DependenciesOptions;
  if (type == 'remote') {
    await RemoteDependencies.start()
  } else {
    await LocalDependencies.start()
  }
}
