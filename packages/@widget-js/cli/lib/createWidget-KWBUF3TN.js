import {
  promptChecker_default
} from "./chunk-3GPAHQ6O.js";
import {
  exit
} from "./chunk-SIAOIY3B.js";

// src/createWidget.ts
import path from "path";
import fs from "fs";
import consola from "consola";
import { fileURLToPath } from "url";
import { paramCase, snakeCase } from "change-case";
import inquirer from "inquirer";
import ejs from "ejs";
import shell from "shelljs";
import chalk from "chalk";
async function createWidget() {
  let widgetJson = path.join(process.cwd(), "widget.json");
  if (!fs.existsSync(widgetJson)) {
    consola.error("\u6CA1\u6709\u5728\u6839\u76EE\u5F55\u627E\u5230widget.json\u6587\u4EF6");
    exit();
  }
  let widgetPackage = JSON.parse(fs.readFileSync(widgetJson).toString());
  let widgetFolder = path.join(process.cwd(), "./src/widgets");
  let devOptions = widgetPackage["devOptions"] ?? {};
  if (devOptions["folder"]) {
    widgetFolder = devOptions["folder"];
    consola.info(`\u7EC4\u4EF6\u8DEF\u5F84\uFF1A${widgetFolder}`);
  } else {
    consola.info(`\u6CA1\u6709\u914D\u7F6EdevOptions.folder\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u8DEF\u5F84${widgetFolder}`);
  }
  if (!fs.existsSync(widgetFolder)) {
    fs.mkdirSync(widgetFolder, { recursive: true });
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getMiddleValue = (arr) => {
    if (arr.length === 1) {
      return arr[0];
    } else if (arr.length === 2) {
      return Math.max(...arr);
    } else {
      const max = Math.max(...arr);
      const min = Math.min(...arr);
      const sum = arr[0] + arr[1] + arr[2];
      return sum - max - min;
    }
  };
  let name = await promptChecker_default({
    type: "input",
    name: "name",
    message: chalk.blue("\u8BF7\u8F93\u5165\u7EC4\u4EF6\u540D(\u5927\u9A7C\u5CF0\u5F0F)\uFF0C\u5982\uFF1ACountdownClock")
  }, (answer) => {
    const name2 = answer.name;
    if (name2 == null || name2 === "") {
      consola.log(chalk.red("\u7EC4\u4EF6\u540D\u4E0D\u80FD\u4E3A\u7A7A"));
      return false;
    }
    return true;
  });
  consola.log(chalk.green(name));
  let title = await promptChecker_default({
    type: "input",
    name: "title",
    message: chalk.blue("\u8BF7\u8F93\u5165\u7EC4\u4EF6\u6807\u9898\uFF0C\u5982\uFF1A\u5012\u8BA1\u65F6")
  });
  consola.log(chalk.green(title));
  let answerW = await promptChecker_default({
    type: "checkbox",
    name: "w",
    message: chalk.blue("\u8BF7\u9009\u62E9\u7EC4\u4EF6\u5BBD\u5EA6\uFF0C\u6700\u591A\u90093\u4E2A\uFF0C\u4F8B\u5982\u9009\u4E2D2,4,6\uFF0C\u4EE3\u8868\u7EC4\u4EF6\u6700\u5C0F\u5BBD\u4E3A2\uFF0C\u9ED8\u8BA4\u5BBD\u4E3A4\uFF0C\u6700\u5927\u5BBD\u4E3A6\uFF0C\u5355\u9009\u4EE3\u8868\u4E0D\u53EF\u62C9\u4F38"),
    choices: [1, 2, 3, 4, 5, 6]
  }, (answer) => {
    if (answer.w.length === 0) {
      consola.log(chalk.red("\u5BBD\u5EA6\u5FC5\u987B\u9009\u62E9"));
      return false;
    }
    if (answer.w.length > 3) {
      consola.log(chalk.red("\u5BBD\u5EA6\u6700\u591A\u9009\u62E93\u4E2A"));
      return false;
    }
    return true;
  });
  consola.log(chalk.green(answerW));
  let answerH = await promptChecker_default({
    type: "checkbox",
    name: "h",
    message: chalk.blue("\u8BF7\u9009\u62E9\u7EC4\u4EF6\u9AD8\u5EA6\uFF0C\u6700\u591A\u90093\u4E2A\uFF0C\u4F8B\u5982\u9009\u4E2D1,2\uFF0C\u4EE3\u8868\u7EC4\u4EF6\u6700\u5C0F\u9AD8\u4E3A1\uFF0C\u9ED8\u8BA4\u9AD8\u4E3A2\uFF0C\u6700\u5927\u9AD8\u4E3A2\uFF0C\u5355\u9009\u4EE3\u8868\u4E0D\u53EF\u62C9\u4F38"),
    choices: [1, 2, 3, 4, 5, 6]
  }, (answer) => {
    if (answer.h.length === 0) {
      consola.log(chalk.red("\u9AD8\u5EA6\u5FC5\u987B\u9009\u62E9"));
      return false;
    }
    if (answer.h.length > 3) {
      consola.log(chalk.red("\u9AD8\u5EA6\u6700\u591A\u9009\u62E93\u4E2A"));
      return false;
    }
    return true;
  });
  consola.log(chalk.green(answerH));
  let configurable = await promptChecker_default({
    type: "confirm",
    name: "configurable",
    message: chalk.blue("\u7EC4\u4EF6\u662F\u5426\u53EF\u914D\u7F6E\uFF0C\u4F8B\u5982\u4FEE\u6539\u80CC\u666F\u989C\u8272\uFF0C\u5B57\u4F53\u5927\u5C0F\u7B49")
  });
  consola.log(chalk.green(configurable));
  const width = getMiddleValue(answerW);
  const height = getMiddleValue(answerH);
  const minWidth = Math.min(...answerW);
  const maxWidth = Math.max(...answerW);
  const minHeight = Math.min(...answerH);
  const maxHeight = Math.max(...answerH);
  const snakeCaseName = snakeCase(name);
  const paramCaseName = paramCase(name);
  const packageName = "com.wisdom.widgets." + snakeCaseName;
  const widgetDir = path.join(widgetFolder, paramCaseName);
  if (!fs.existsSync(widgetDir)) {
    fs.mkdirSync(widgetDir);
  } else {
    let answer = await inquirer.prompt([{
      type: "confirm",
      name: "override",
      message: chalk.red("\u7EC4\u4EF6\u540D\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u7EE7\u7EED?")
    }]);
    if (!answer.override) {
      exit();
    }
  }
  const renderOptions = {
    name,
    snakeCaseName,
    paramCaseName,
    packageName,
    title,
    configurable,
    width,
    height,
    maxWidth,
    minHeight,
    maxHeight,
    minWidth
  };
  function renderToFile(templateFile, outputFile, renderOptions2) {
    const defineTemplatePath = path.join(__dirname, "../template", templateFile);
    let defineTemplate = fs.readFileSync(defineTemplatePath, "utf8");
    fs.writeFileSync(outputFile, ejs.render(defineTemplate, renderOptions2));
  }
  const widgetDefineFile = path.resolve(widgetDir, `${name}.widget.ts`);
  const widgetFile = path.resolve(widgetDir, `${name}Widget.vue`);
  const widgetViewFile = path.resolve(widgetDir, `${name}WidgetView.vue`);
  const widgetRoutesFile = path.resolve(widgetDir, `${name}WidgetRoutes.ts`);
  renderToFile("WidgetDefine.ejs", widgetDefineFile, renderOptions);
  renderToFile("Widget.ejs", widgetFile, renderOptions);
  renderToFile("WidgetView.ejs", widgetViewFile, renderOptions);
  renderToFile("WidgetRoutes.ejs", widgetRoutesFile, renderOptions);
  if (configurable) {
    const configFile = path.resolve(widgetDir, `${name}ConfigView.vue`);
    renderToFile("WidgetConfig.ejs", configFile, renderOptions);
  }
  if (devOptions["useStorybook"]) {
    const storiesFile = path.resolve(widgetDir, `${name}Widget.stories.ts`);
    renderToFile("stories.ejs", storiesFile, renderOptions);
  }
  const routeFile = path.join(widgetFolder, "widget-router.ts");
  let routeContent;
  if (fs.existsSync(routeFile)) {
    routeContent = fs.readFileSync(routeFile, "utf8");
  } else {
    routeContent = fs.readFileSync(path.join(__dirname, "../template/widget-router.ts"), "utf8");
  }
  const importRouteStr = `import ${name}WidgetRoutes from "./${paramCaseName}/${name}WidgetRoutes";`;
  const routeStr = `...${name}WidgetRoutes,`;
  if (!routeContent.includes(importRouteStr)) {
    routeContent = routeContent.replaceAll("//FBI WANING! IMPORT PLACE", `${importRouteStr}
//FBI WANING! IMPORT PLACE`);
  }
  if (!routeContent.includes(routeStr)) {
    routeContent = routeContent.replaceAll("//FBI WANING! ROUTE PLACE", `${routeStr}
    //FBI WANING! ROUTE PLACE`);
  }
  fs.writeFileSync(routeFile, routeContent);
  let gitAdd = `git add ${widgetDir}`;
  consola.info(chalk.grey(gitAdd));
  shell.exec(gitAdd);
  consola.log("=================");
  consola.info(`\u5DF2\u521B\u5EFA\u7EC4\u4EF6\uFF1A${widgetDir}`);
  consola.success("Happy coding!");
}
export {
  createWidget as default
};
