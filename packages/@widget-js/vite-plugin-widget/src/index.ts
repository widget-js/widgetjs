import scanWidgetPackage from "./scanWidgetPackage";
import registerWidgetPackage, {scanAndRegister} from "./registerWidgetPackage";
import consola from "consola";
import fs from "fs";
import path from "path";
import {HmrContext, ResolvedConfig, ViteDevServer} from "vite"
import {WidgetPackage} from "@widget-js/core";


interface ViteWidgetOptions {
  /**
   * 是否生成 packageName.json 组件包文件，e.g.
   * cn.widgetjs.widgets.countdown.json
   */
  generateFullNamePackage?: boolean
}

const widget = (options?: ViteWidgetOptions) => {

  function generateJsonFile(outputDir: string, fileName: string, widgetPackage: WidgetPackage) {
    let widgetFullNameJSONPath = path.resolve(outputDir, fileName);
    const devOptions = widgetPackage.devOptions;
    // ignore devOptions
    widgetPackage.devOptions = undefined;
    let json = JSON.stringify(widgetPackage, null, 2);
    widgetPackage.devOptions = devOptions;
    fs.writeFileSync(widgetFullNameJSONPath, json);

    consola.info(`${fileName} generated`);
  }

  async function generateWidgetPackageJson(outputDir: string) {
    const widgetPackage = await scanWidgetPackage();
    generateJsonFile(outputDir, 'widget.json', widgetPackage);
    if (options?.generateFullNamePackage) {
      let fullName = `${widgetPackage.name}.json`;
      generateJsonFile(outputDir, fullName, widgetPackage);
    }
  }

  let devUrl: string | undefined = undefined;
  return {
    name: 'vite-plugin-widget',
    async configureServer(_server: ViteDevServer) {
      _server.httpServer?.once("connection", async () => {
        if (process.env.NODE_ENV === 'development') {
          devUrl = _server.resolvedUrls!.local[0];
          await scanAndRegister({devUrl});
        }
      });
    },
    async configResolved(resolvedConfig: ResolvedConfig) {
      if (resolvedConfig.publicDir) {
        await generateWidgetPackageJson(resolvedConfig.publicDir)
      }
    },
    async handleHotUpdate({file}: HmrContext) {
      if (file.endsWith('widget.ts')) {
        await scanAndRegister({devUrl});
      }
    }
  }
}

export default widget;
