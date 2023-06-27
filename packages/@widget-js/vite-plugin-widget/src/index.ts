import scanWidgetPackage from "./scanWidgetPackage";
import registerWidgetPackage from "./registerWidgetPackage";
import consola from "consola";
import fs from "fs";
import path from "path";
import {HmrContext, ResolvedConfig, ViteDevServer} from "vite"
import {WidgetPackage} from "@widget-js/core";

const register = async () => {
  const widgetPackage = await scanWidgetPackage();
  consola.info("Register widgets：", new Date());
  await registerWidgetPackage(widgetPackage);
}

interface ViteWidgetOptions {
  fullNameFile?: boolean
}

const ViteWidget = (options?: ViteWidgetOptions) => {

  function generateJsonFile(outputDir: string, fileName: string, widgetPackage: WidgetPackage) {
    let widgetFullNameJSONPath = path.resolve(outputDir, fileName);
    fs.writeFileSync(widgetFullNameJSONPath, JSON.stringify(widgetPackage, null, 2));
    consola.info(`${fileName} generated`);
  }

  async function generateWidgetPackageJson(outputDir: string) {
    const widgetPackage = await scanWidgetPackage();
    generateJsonFile(outputDir, 'widget.json', widgetPackage);
    if (options?.fullNameFile) {
      let fullName = `${widgetPackage.name}.json`;
      generateJsonFile(outputDir, fullName, widgetPackage);
    }
  }

  return {
    name: 'vite-plugin-widget',
    async configureServer(_server: ViteDevServer) {
      await register();
    },
    async configResolved(resolvedConfig: ResolvedConfig) {
      if (resolvedConfig.publicDir) {
        await generateWidgetPackageJson(resolvedConfig.publicDir)
      }
    },
    async handleHotUpdate({file}: HmrContext) {
      if (file.endsWith('widget.ts')) {
        await register();
      }
    }
  }
}

export default ViteWidget;
