import scanWidgetPackage from "./scanWidgetPackage";
import registerWidgetPackage from "./registerWidgetPackage";
import consola from "consola";
import fs from "fs";
import path from "path";
import {ResolvedConfig, ViteDevServer} from "vite"
import {WidgetPackage} from "../../core";

const register = async () => {
  const widgetPackage = scanWidgetPackage();
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

  function generateWidgetPackageJson(outputDir: string) {
    const widgetPackage = scanWidgetPackage();
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
    configResolved(resolvedConfig: ResolvedConfig) {
      if (resolvedConfig.publicDir) {
        generateWidgetPackageJson(resolvedConfig.publicDir)
      }
    },
    // @ts-ignore
    async handleHotUpdate({server}) {
      await register();
    }
  }
}

export default ViteWidget;
