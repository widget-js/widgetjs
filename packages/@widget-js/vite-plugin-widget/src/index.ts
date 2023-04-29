import scanWidgetPackage from "./scanWidgetPackage";
import registerWidgetPackage from "./registerWidgetPackage";
import consola from "consola";
import fs from "fs";
import path from "path";

const register = async () => {
    const widgetPackage = scanWidgetPackage();
    consola.info("Register widgets：", new Date());
    await registerWidgetPackage(widgetPackage);
}
const ViteWidget = () => {
    let server;
    let outputDir: string | null = null;
    return {
        name: 'vite-plugin-widget',
        async configureServer(_server: any) {
            server = _server;
            // console.log(_server);
            await register();
        },
        // @ts-ignore
        async handleHotUpdate({server}) {
            // console.log(server.httpServer.address().port)
            await register();
        },
        outputOptions: (options: any) => {
            outputDir = options.dir;
        },
        closeBundle: () => {
            if (process.env.NODE_ENV == 'production' && outputDir) {
                consola.info("Generate widget info")
                const widgetPackage = scanWidgetPackage();
                let widgetJSONPath = path.resolve(outputDir, "widget.json");
                fs.writeFileSync(widgetJSONPath, JSON.stringify(widgetPackage, null, 2));
                // @ts-ignore
            }
        },
        buildEnd(error?: Error) {

        }
    }
}

export default ViteWidget;
