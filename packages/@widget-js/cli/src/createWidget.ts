import path from "path";
import fs from "fs";
import consola from "consola";
import promptChecker from "./promts/promptChecker";
import {paramCase, snakeCase} from "change-case";
import inquirer from "inquirer";
import ejs from "ejs";
import shell from "shelljs";
import exit from "./utils.js";
import chalk from "chalk";
import {WidgetUtils} from "@widget-js/utils";
import prettier, {BuiltInParserName} from "prettier";

// import vm from "vm";

interface RenderOptions {
  name: string,
  snakeCaseName: string,
  paramCaseName: string,
  packageName: string,
  widgetName: string,
  title: string,
  configurable: string,
  width: number,
  height: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number,
  minWidth: number,
}

export default async function createWidget() {
  let widgetPackage = await WidgetUtils.scanWidgetPackage(process.cwd());
  if (!widgetPackage) {
    consola.error("widget.ts or widget.json not found")
    return;
  }
  let widgetFolder = path.join(process.cwd(), "./src/widgets");
  let devOptions = widgetPackage["devOptions"] ?? {};
  if (devOptions["folder"]) {
    widgetFolder = devOptions["folder"];
    consola.info(`组件路径：${widgetFolder}`);
  } else {
    consola.info(`没有配置devOptions.folder，使用默认路径${widgetFolder}`);
  }

  if (!fs.existsSync(widgetFolder)) {
    fs.mkdirSync(widgetFolder, {recursive: true});
  }

  const getMiddleValue = (arr: number[]) => {
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
  }

  let name = await promptChecker({
    type: "input",
    name: 'name',
    message: chalk.blue("请输入组件名(大驼峰式)，如：CountdownClock")
  }, (answer) => {
    const name = answer.name;
    if (name == null || name === '') {
      consola.log(chalk.red('组件名不能为空'));
      return false;
    }
    return true;
  })

  consola.log(chalk.green(name))

  let title = await promptChecker({
    type: "input",
    name: 'title',
    message: chalk.blue("请输入组件标题，如：倒计时")
  })
  consola.log(chalk.green(title))
  let answerW = await promptChecker({
    type: "checkbox",
    name: 'w',
    message: chalk.blue("请选择组件宽度，最多选3个，例如选中2,4,6，代表组件最小宽为2，默认宽为4，最大宽为6，单选代表不可拉伸"),
    choices: [1, 2, 3, 4, 5, 6]
  }, (answer) => {
    if (answer.w.length === 0) {
      consola.log(chalk.red('宽度必须选择'));
      return false;
    }

    if (answer.w.length > 3) {
      consola.log(chalk.red('宽度最多选择3个'));
      return false;
    }
    return true;
  })
  consola.log(chalk.green(answerW))

  let answerH = await promptChecker({
    type: "checkbox",
    name: 'h',
    message: chalk.blue("请选择组件高度，最多选3个，例如选中1,2，代表组件最小高为1，默认高为2，最大高为2，单选代表不可拉伸"),
    choices: [1, 2, 3, 4, 5, 6]
  }, (answer) => {
    if (answer.h.length === 0) {
      consola.log(chalk.red('高度必须选择'));
      return false;
    }

    if (answer.h.length > 3) {
      consola.log(chalk.red('高度最多选择3个'));
      return false;
    }
    return true;
  })

  consola.log(chalk.green(answerH))

  let configurable = await promptChecker({
    type: "confirm",
    name: 'configurable',
    message: chalk.blue("组件是否可配置，例如修改背景颜色，字体大小等")
  })

  consola.log(chalk.green(configurable))

  const width = getMiddleValue(answerW);
  const height = getMiddleValue(answerH);
  const minWidth = Math.min(...answerW);
  const maxWidth = Math.max(...answerW);
  const minHeight = Math.min(...answerH);
  const maxHeight = Math.max(...answerH);
  const snakeCaseName = snakeCase(name);
  const paramCaseName = paramCase(name);

  const widgetName = widgetPackage.name + '.' + snakeCaseName;

  const widgetDir = path.join(widgetFolder, paramCaseName)
  if (!fs.existsSync(widgetDir)) {
    fs.mkdirSync(widgetDir);
  } else {
    let answer = await inquirer.prompt([{
      type: 'confirm',
      name: 'override',
      message: chalk.red('组件名已存在，是否继续?')
    }])
    if (!answer.override) {
      exit()
    }
  }

  const renderOptions: RenderOptions = {
    name: name,
    snakeCaseName: snakeCaseName,
    paramCaseName: paramCaseName,
    packageName: widgetPackage.name,
    widgetName: widgetName,
    title: title,
    configurable: configurable,
    width: width,
    height: height,
    maxWidth: maxWidth,
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWidth: minWidth
  }

  function renderToFile(templateFile: string, outputFile: string, parser: BuiltInParserName, renderOptions: RenderOptions) {
    const defineTemplatePath = path.join(__dirname, '../template', templateFile)
    let defineTemplate = fs.readFileSync(defineTemplatePath, 'utf8');
    // Format the EJS code using Prettier

    let code = ejs.render(defineTemplate, renderOptions);
    let fileFormat = outputFile.split('.');
    const formattedEJSCode = prettier.format(code, {
      parser: parser, tabWidth: 2, singleQuote: true
    });
    fs.writeFileSync(outputFile, formattedEJSCode)
  }

  const widgetDefineFile = path.resolve(widgetDir, `${name}.widget.ts`)
  const widgetFile = path.resolve(widgetDir, `${name}Widget.vue`);
  const widgetViewFile = path.resolve(widgetDir, `${name}WidgetView.vue`)
  const widgetRoutesFile = path.resolve(widgetDir, `${name}WidgetRoutes.ts`)

  renderToFile('WidgetDefine.ejs', widgetDefineFile, 'typescript', renderOptions);
  renderToFile('Widget.ejs', widgetFile, 'vue', renderOptions);
  renderToFile('WidgetView.ejs', widgetViewFile, 'vue', renderOptions);
  renderToFile('WidgetRoutes.ejs', widgetRoutesFile, 'typescript', renderOptions);
  if (configurable) {
    const configFile = path.resolve(widgetDir, `${name}ConfigView.vue`)
    renderToFile('WidgetConfig.ejs', configFile, 'vue', renderOptions)
    ;
  }
// 注册路由
  const routeFile = path.join(widgetFolder, 'widget-router.ts');
  let routeContent;
  if (fs.existsSync(routeFile)) {
    routeContent = fs.readFileSync(routeFile, 'utf8');
  } else {
    routeContent = fs.readFileSync(path.join(__dirname, "../template/widget-router.ts"), 'utf8');
  }
  const importRouteStr = `import ${name}WidgetRoutes from "./${paramCaseName}/${name}WidgetRoutes";`
  const routeStr = `...${name}WidgetRoutes,`
  if (!routeContent.includes(importRouteStr)) {
    routeContent = routeContent.replaceAll("//FBI WANING! IMPORT PLACE", `${importRouteStr}\n//FBI WANING! IMPORT PLACE`)
  }
  if (!routeContent.includes(routeStr)) {
    routeContent = routeContent.replaceAll("//FBI WANING! ROUTE PLACE", `${routeStr}\n    //FBI WANING! ROUTE PLACE`)
  }

  fs.writeFileSync(routeFile, routeContent)

//添加到版本控制
  let gitAdd = `git add ${widgetDir}`;
  consola.info(chalk.grey(gitAdd))
  shell.exec(gitAdd);
  consola.log("=================")
  consola.info(`已创建组件：${widgetDir}`)
  consola.success("Happy coding!")
}
