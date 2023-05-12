import { Option, program } from "commander";
import fs from "fs";
import path from "path";
import * as process from "process";

import { fileURLToPath } from "url";
import figlet from "figlet";
import gradient from "gradient-string";
import consola from "consola";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//
const packageJsonPath = path.join(__dirname, "../package.json");
let cliPackage = JSON.parse(fs.readFileSync(packageJsonPath).toString());

console.log(gradient.pastel.multiline(figlet.textSync("widget-cli", { horizontalLayout: "full" })));
program.version(`@widget-js/cli ${cliPackage.version}`).usage("<command> [options]");
program
  .command("create")
  .description("创建新的组件")
  .action(async () => {
    const createWidget = await import("./createWidget");
    await createWidget.default();
  });

program
  .command("upgrade")
  .description("升级依赖")
  .action(async () => {
    const upgrade = await import("./upgrade/upgrade");
    const instance = new upgrade.Upgrade();
    await instance.start()
  });

program
  .command("build")
  .description("执行编译任务")
  .action(async () => {
    const build = await import("./build/build");
    await build.build();
  });

let typeOption = new Option("-t, --type <type>").choices(["ftp", "oss"]);
program
  .command("release")
  .description("通过FTP/OSS发布文件，仅内部使用")
  .addOption(typeOption)
  .action(async (options, command) => {
    // @ts-ignore
    let release = await import("./release/release");
    await release.default(options);
  });

program.parse(process.argv);
