// src/index.ts
import { Option, program } from "commander";
import fs from "fs";
import path from "path";
import * as process from "process";
import { fileURLToPath } from "url";
import figlet from "figlet";
import gradient from "gradient-string";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var packageJsonPath = path.join(__dirname, "../package.json");
var cliPackage = JSON.parse(fs.readFileSync(packageJsonPath).toString());
console.log(gradient.pastel.multiline(figlet.textSync("widget-cli", { horizontalLayout: "full" })));
program.version(`@widget-js/cli ${cliPackage.version}`).usage("<command> [options]");
program.command("create").description("\u521B\u5EFA\u65B0\u7684\u7EC4\u4EF6").action(async () => {
  const createWidget = await import("./createWidget-LWD7JPGR.js");
  await createWidget.default();
});
var dependenciesOption = new Option("-t, --type <type>").choices(["remote", "local"]);
program.command("dependencies").description("\u5C06@widget-js\u4F9D\u8D56\u7248\u672C\u8BBE\u7F6E\u6210\u8FDC\u7A0B\u6216\u8005\u672C\u5730").addOption(dependenciesOption).action(async (options) => {
  let dependencies = await import("./dependencies-J3BZI237.js");
  await dependencies.default(options);
});
program.command("build").description("\u6267\u884C\u7F16\u8BD1\u4EFB\u52A1").action(async () => {
  const build = await import("./build-BTARJMCZ.js");
  await build.build();
});
var typeOption = new Option("-t, --type <type>").choices(["ftp", "oss"]);
program.command("release").description("\u901A\u8FC7FTP/OSS\u53D1\u5E03\u6587\u4EF6\uFF0C\u4EC5\u5185\u90E8\u4F7F\u7528").addOption(typeOption).action(async (options, command) => {
  let release = await import("./release-MNILEHXP.js");
  await release.default(options);
});
program.parse(process.argv);
