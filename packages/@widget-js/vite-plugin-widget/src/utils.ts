import * as ts from "typescript";
import vm from "vm";

export function transpileCodeString(code: string) {
  const result = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext
    }
  });
  const contextObject = {
    require: require,
    console: console,
    exports: exports,
  };
  return vm.runInNewContext(result.outputText, contextObject)
}
