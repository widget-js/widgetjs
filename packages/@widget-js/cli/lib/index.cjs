"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/promts/promptChecker.ts
var import_inquirer, promptChecker, promptChecker_default;
var init_promptChecker = __esm({
  "src/promts/promptChecker.ts"() {
    "use strict";
    import_inquirer = __toESM(require("inquirer"), 1);
    promptChecker = async (prompt, checker) => {
      const answer = await import_inquirer.default.prompt([prompt]);
      if (checker) {
        if (checker(answer)) {
          return answer[prompt.name];
        } else {
          return promptChecker(prompt, checker);
        }
      }
      return answer[prompt.name];
    };
    promptChecker_default = promptChecker;
  }
});

// src/utils.ts
function exit(code = 0) {
  if (exports.exitProcess) {
    import_process.default.exit(code);
  } else if (code > 0) {
    throw new Error(`Process exited with code ${code}`);
  }
}
function getPackagePath() {
  return import_path.default.join(import_process.default.cwd(), "package.json");
}
function getPackageJson() {
  return JSON.parse(import_fs.default.readFileSync(getPackagePath()).toString());
}
function getPackageVersion() {
  return getPackageJson()["version"];
}
var import_path, import_process, import_fs, widgetPackages;
var init_utils = __esm({
  "src/utils.ts"() {
    "use strict";
    import_path = __toESM(require("path"), 1);
    import_process = __toESM(require("process"), 1);
    import_fs = __toESM(require("fs"), 1);
    widgetPackages = {
      "@widget-js/core": "",
      "@widget-js/vue3": "",
      "@widget-js/cli": "",
      "@widget-js/vite-plugin-widget": ""
    };
  }
});

// src/createWidget.ts
var createWidget_exports = {};
__export(createWidget_exports, {
  default: () => createWidget
});
async function createWidget() {
  let widgetJson = import_path2.default.join(process.cwd(), "widget.json");
  if (!import_fs2.default.existsSync(widgetJson)) {
    import_consola.default.error("\u6CA1\u6709\u5728\u6839\u76EE\u5F55\u627E\u5230widget.json\u6587\u4EF6");
    exit();
  }
  let widgetPackage = JSON.parse(import_fs2.default.readFileSync(widgetJson).toString());
  let widgetFolder = import_path2.default.join(process.cwd(), "./src/widgets");
  let devOptions = widgetPackage["devOptions"] ?? {};
  if (devOptions["folder"]) {
    widgetFolder = devOptions["folder"];
    import_consola.default.info(`\u7EC4\u4EF6\u8DEF\u5F84\uFF1A${widgetFolder}`);
  } else {
    import_consola.default.info(`\u6CA1\u6709\u914D\u7F6EdevOptions.folder\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u8DEF\u5F84${widgetFolder}`);
  }
  if (!import_fs2.default.existsSync(widgetFolder)) {
    import_fs2.default.mkdirSync(widgetFolder, { recursive: true });
  }
  const __filename2 = (0, import_url.fileURLToPath)(import_meta.url);
  const __dirname2 = import_path2.default.dirname(__filename2);
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
    message: import_chalk.default.blue("\u8BF7\u8F93\u5165\u7EC4\u4EF6\u540D(\u5927\u9A7C\u5CF0\u5F0F)\uFF0C\u5982\uFF1ACountdownClock")
  }, (answer) => {
    const name2 = answer.name;
    if (name2 == null || name2 === "") {
      import_consola.default.log(import_chalk.default.red("\u7EC4\u4EF6\u540D\u4E0D\u80FD\u4E3A\u7A7A"));
      return false;
    }
    return true;
  });
  import_consola.default.log(import_chalk.default.green(name));
  let title = await promptChecker_default({
    type: "input",
    name: "title",
    message: import_chalk.default.blue("\u8BF7\u8F93\u5165\u7EC4\u4EF6\u6807\u9898\uFF0C\u5982\uFF1A\u5012\u8BA1\u65F6")
  });
  import_consola.default.log(import_chalk.default.green(title));
  let answerW = await promptChecker_default({
    type: "checkbox",
    name: "w",
    message: import_chalk.default.blue("\u8BF7\u9009\u62E9\u7EC4\u4EF6\u5BBD\u5EA6\uFF0C\u6700\u591A\u90093\u4E2A\uFF0C\u4F8B\u5982\u9009\u4E2D2,4,6\uFF0C\u4EE3\u8868\u7EC4\u4EF6\u6700\u5C0F\u5BBD\u4E3A2\uFF0C\u9ED8\u8BA4\u5BBD\u4E3A4\uFF0C\u6700\u5927\u5BBD\u4E3A6\uFF0C\u5355\u9009\u4EE3\u8868\u4E0D\u53EF\u62C9\u4F38"),
    choices: [1, 2, 3, 4, 5, 6]
  }, (answer) => {
    if (answer.w.length === 0) {
      import_consola.default.log(import_chalk.default.red("\u5BBD\u5EA6\u5FC5\u987B\u9009\u62E9"));
      return false;
    }
    if (answer.w.length > 3) {
      import_consola.default.log(import_chalk.default.red("\u5BBD\u5EA6\u6700\u591A\u9009\u62E93\u4E2A"));
      return false;
    }
    return true;
  });
  import_consola.default.log(import_chalk.default.green(answerW));
  let answerH = await promptChecker_default({
    type: "checkbox",
    name: "h",
    message: import_chalk.default.blue("\u8BF7\u9009\u62E9\u7EC4\u4EF6\u9AD8\u5EA6\uFF0C\u6700\u591A\u90093\u4E2A\uFF0C\u4F8B\u5982\u9009\u4E2D1,2\uFF0C\u4EE3\u8868\u7EC4\u4EF6\u6700\u5C0F\u9AD8\u4E3A1\uFF0C\u9ED8\u8BA4\u9AD8\u4E3A2\uFF0C\u6700\u5927\u9AD8\u4E3A2\uFF0C\u5355\u9009\u4EE3\u8868\u4E0D\u53EF\u62C9\u4F38"),
    choices: [1, 2, 3, 4, 5, 6]
  }, (answer) => {
    if (answer.h.length === 0) {
      import_consola.default.log(import_chalk.default.red("\u9AD8\u5EA6\u5FC5\u987B\u9009\u62E9"));
      return false;
    }
    if (answer.h.length > 3) {
      import_consola.default.log(import_chalk.default.red("\u9AD8\u5EA6\u6700\u591A\u9009\u62E93\u4E2A"));
      return false;
    }
    return true;
  });
  import_consola.default.log(import_chalk.default.green(answerH));
  let configurable = await promptChecker_default({
    type: "confirm",
    name: "configurable",
    message: import_chalk.default.blue("\u7EC4\u4EF6\u662F\u5426\u53EF\u914D\u7F6E\uFF0C\u4F8B\u5982\u4FEE\u6539\u80CC\u666F\u989C\u8272\uFF0C\u5B57\u4F53\u5927\u5C0F\u7B49")
  });
  import_consola.default.log(import_chalk.default.green(configurable));
  const width = getMiddleValue(answerW);
  const height = getMiddleValue(answerH);
  const minWidth = Math.min(...answerW);
  const maxWidth = Math.max(...answerW);
  const minHeight = Math.min(...answerH);
  const maxHeight = Math.max(...answerH);
  const snakeCaseName = (0, import_change_case.snakeCase)(name);
  const paramCaseName = (0, import_change_case.paramCase)(name);
  const packageName = "com.wisdom.widgets." + snakeCaseName;
  const widgetDir = import_path2.default.join(widgetFolder, paramCaseName);
  if (!import_fs2.default.existsSync(widgetDir)) {
    import_fs2.default.mkdirSync(widgetDir);
  } else {
    let answer = await import_inquirer2.default.prompt([{
      type: "confirm",
      name: "override",
      message: import_chalk.default.red("\u7EC4\u4EF6\u540D\u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u7EE7\u7EED?")
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
    const defineTemplatePath = import_path2.default.join(__dirname2, "../template", templateFile);
    let defineTemplate = import_fs2.default.readFileSync(defineTemplatePath, "utf8");
    import_fs2.default.writeFileSync(outputFile, import_ejs.default.render(defineTemplate, renderOptions2));
  }
  const widgetDefineFile = import_path2.default.resolve(widgetDir, `${name}.widget.ts`);
  const widgetFile = import_path2.default.resolve(widgetDir, `${name}Widget.vue`);
  const widgetViewFile = import_path2.default.resolve(widgetDir, `${name}WidgetView.vue`);
  const widgetRoutesFile = import_path2.default.resolve(widgetDir, `${name}WidgetRoutes.ts`);
  renderToFile("WidgetDefine.ejs", widgetDefineFile, renderOptions);
  renderToFile("Widget.ejs", widgetFile, renderOptions);
  renderToFile("WidgetView.ejs", widgetViewFile, renderOptions);
  renderToFile("WidgetRoutes.ejs", widgetRoutesFile, renderOptions);
  if (configurable) {
    const configFile = import_path2.default.resolve(widgetDir, `${name}ConfigView.vue`);
    renderToFile("WidgetConfig.ejs", configFile, renderOptions);
  }
  if (devOptions["useStorybook"]) {
    const storiesFile = import_path2.default.resolve(widgetDir, `${name}Widget.stories.ts`);
    renderToFile("stories.ejs", storiesFile, renderOptions);
  }
  const routeFile = import_path2.default.join(widgetFolder, "widget-router.ts");
  let routeContent;
  if (import_fs2.default.existsSync(routeFile)) {
    routeContent = import_fs2.default.readFileSync(routeFile, "utf8");
  } else {
    routeContent = import_fs2.default.readFileSync(import_path2.default.join(__dirname2, "../template/widget-router.ts"), "utf8");
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
  import_fs2.default.writeFileSync(routeFile, routeContent);
  let gitAdd = `git add ${widgetDir}`;
  import_consola.default.info(import_chalk.default.grey(gitAdd));
  import_shelljs.default.exec(gitAdd);
  import_consola.default.log("=================");
  import_consola.default.info(`\u5DF2\u521B\u5EFA\u7EC4\u4EF6\uFF1A${widgetDir}`);
  import_consola.default.success("Happy coding!");
}
var import_path2, import_fs2, import_consola, import_url, import_change_case, import_inquirer2, import_ejs, import_shelljs, import_chalk, import_meta;
var init_createWidget = __esm({
  "src/createWidget.ts"() {
    "use strict";
    import_path2 = __toESM(require("path"), 1);
    import_fs2 = __toESM(require("fs"), 1);
    import_consola = __toESM(require("consola"), 1);
    import_url = require("url");
    init_promptChecker();
    import_change_case = require("change-case");
    import_inquirer2 = __toESM(require("inquirer"), 1);
    import_ejs = __toESM(require("ejs"), 1);
    import_shelljs = __toESM(require("shelljs"), 1);
    init_utils();
    import_chalk = __toESM(require("chalk"), 1);
    import_meta = {};
  }
});

// src/dependencies/remoteDependencies.ts
var import_package_json, import_ora, import_fs3, spinner, RemoteDependencies;
var init_remoteDependencies = __esm({
  "src/dependencies/remoteDependencies.ts"() {
    "use strict";
    import_package_json = __toESM(require("package-json"), 1);
    import_ora = __toESM(require("ora"), 1);
    init_utils();
    import_fs3 = __toESM(require("fs"), 1);
    spinner = (0, import_ora.default)("Connecting");
    ((RemoteDependencies2) => {
      async function start() {
        spinner.start();
        let json = getPackageJson();
        let packageNames = Object.keys(widgetPackages);
        let dependencies = json["dependencies"];
        let devDependencies = json["devDependencies"];
        await upgradePackage(dependencies, packageNames);
        await upgradePackage(devDependencies, packageNames);
        import_fs3.default.writeFileSync(getPackagePath(), JSON.stringify(json, null, 2));
        spinner.succeed("Using remote versions!");
      }
      RemoteDependencies2.start = start;
      async function upgradePackage(dependencies, packageNames) {
        let localPackages = Object.keys(dependencies);
        for (let localPackage of localPackages) {
          if (packageNames.indexOf(localPackage) > -1) {
            let packageVersion = widgetPackages[localPackage];
            if (!packageVersion) {
              packageVersion = await getRemoteVersion(localPackage);
              widgetPackages[localPackage] = packageVersion;
            }
            dependencies[localPackage] = `^${packageVersion}`;
          }
        }
      }
      async function getRemoteVersion(packageName) {
        spinner.info(`Fetching package version:${packageName}`);
        const metadata = await (0, import_package_json.default)(packageName);
        let version = metadata["version"];
        spinner.info(`version:${version}`);
        return version;
      }
    })(RemoteDependencies || (RemoteDependencies = {}));
  }
});

// src/dependencies/localDependencies.ts
var import_ora2, import_fs4, spinner2, LocalDependencies;
var init_localDependencies = __esm({
  "src/dependencies/localDependencies.ts"() {
    "use strict";
    import_ora2 = __toESM(require("ora"), 1);
    init_utils();
    import_fs4 = __toESM(require("fs"), 1);
    spinner2 = (0, import_ora2.default)("Connecting");
    ((LocalDependencies2) => {
      async function start() {
        spinner2.start();
        let json = getPackageJson();
        let packageNames = Object.keys(widgetPackages);
        let dependencies = json["dependencies"];
        let devDependencies = json["devDependencies"];
        await setWorkspaceVersion(dependencies, packageNames);
        await setWorkspaceVersion(devDependencies, packageNames);
        import_fs4.default.writeFileSync(getPackagePath(), JSON.stringify(json, null, 2));
        spinner2.succeed("Using local versions(workspace:*)!");
      }
      LocalDependencies2.start = start;
      async function setWorkspaceVersion(dependencies, packageNames) {
        let localPackages = Object.keys(dependencies);
        for (let localPackage of localPackages) {
          if (packageNames.indexOf(localPackage) > -1) {
            dependencies[localPackage] = `workspace:*`;
          }
        }
      }
    })(LocalDependencies || (LocalDependencies = {}));
  }
});

// src/dependencies/index.ts
var dependencies_exports = {};
__export(dependencies_exports, {
  default: () => dependencies_default
});
async function dependencies_default(options) {
  let type = options.type;
  if (type == "remote") {
    await RemoteDependencies.start();
  } else {
    await LocalDependencies.start();
  }
}
var init_dependencies = __esm({
  "src/dependencies/index.ts"() {
    "use strict";
    init_remoteDependencies();
    init_localDependencies();
  }
});

// src/build/build.ts
var build_exports = {};
__export(build_exports, {
  build: () => build
});
function build() {
  const preloadSpinner = (0, import_ora3.default)("Preload").start();
  const mainSpinner = (0, import_ora3.default)("Main").start();
  const build2 = (0, import_child_process.exec)("npm run build:preload").on("close", () => {
    import_consola2.default.success("done");
  });
  build2.stdout.on("data", (data) => {
    import_consola2.default.log("data", data);
  });
  (0, import_child_process.exec)("npm run build:main", (error, stdout, stderr) => {
    if (error) {
      import_consola2.default.error("error: " + error);
      return;
    }
    import_consola2.default.log("stdout: " + stdout);
    import_consola2.default.log("stderr: " + typeof stderr);
  }).on("message", () => {
    import_consola2.default.log("on-message");
  }).on("data", () => {
    import_consola2.default.log("on-data");
  }).on("close", () => {
    import_consola2.default.log("done");
  });
}
var import_ora3, import_child_process, import_consola2;
var init_build = __esm({
  "src/build/build.ts"() {
    "use strict";
    import_ora3 = __toESM(require("ora"), 1);
    import_child_process = require("child_process");
    import_consola2 = __toESM(require("consola"), 1);
  }
});

// src/release/update-zip.ts
function zipDirectory(sourceDir, outPath, ignoreDir) {
  const archive = (0, import_archiver.default)("zip", { zlib: { level: 9 } });
  const stream = import_fs5.default.createWriteStream(outPath);
  return new Promise((resolve, reject) => {
    archive.glob("**/*", { cwd: sourceDir, ignore: ["node_modules/**"] }).on("error", (err) => reject(err)).pipe(stream);
    stream.on("close", () => resolve());
    archive.finalize();
  });
}
var import_fs5, import_archiver, update_zip_default;
var init_update_zip = __esm({
  "src/release/update-zip.ts"() {
    "use strict";
    import_fs5 = __toESM(require("fs"), 1);
    import_archiver = __toESM(require("archiver"), 1);
    update_zip_default = zipDirectory;
  }
});

// src/release/oss.ts
async function put(ossPath, file) {
  try {
    const result = await clinet.put(ossPath, file, { headers });
    console.log(import_chalk2.default.green(`\u4E0A\u4F20\u6210\u529F\uFF1A${file}->${ossPath}`));
  } catch (e) {
    console.log(e);
  }
}
async function copy(dist, src) {
  try {
    const result = await clinet.copy(dist, src, { headers });
    console.log(import_chalk2.default.green(`\u590D\u5236\u6210\u529F\uFF1A${src}->${dist}`));
  } catch (e) {
    console.error(e);
  }
}
var import_ali_oss, import_fs6, import_chalk2, packageData, AccessKeyID, AccessKeySecret, headers, clinet;
var init_oss = __esm({
  "src/release/oss.ts"() {
    "use strict";
    import_ali_oss = __toESM(require("ali-oss"), 1);
    import_fs6 = __toESM(require("fs"), 1);
    import_chalk2 = __toESM(require("chalk"), 1);
    packageData = JSON.parse(import_fs6.default.readFileSync("./package.json").toString());
    AccessKeyID = packageData.oss?.id ?? "default";
    AccessKeySecret = packageData.oss?.secret ?? "default";
    headers = {
      // 指定Object的存储类型。
      "x-oss-storage-class": "Standard",
      // 指定Object的访问权限。
      "x-oss-object-acl": "public-read",
      "x-oss-forbid-overwrite": "false",
      "Cache-Control": "no-cache"
    };
    clinet = new import_ali_oss.default({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: "oss-cn-hangzhou",
      // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
      accessKeyId: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      bucket: "widget-fun"
    });
  }
});

// src/release/ftp.ts
async function checkParentDir(ftpClient, file, onMkdir) {
  let dir = import_path3.default.dirname(file);
  const dirExists = await ftpClient.exists(dir);
  if (!dirExists) {
    onMkdir(dir);
    await ftpClient.mkdir(dir, true);
  }
}
async function runSSH(sshConfig, releaseConfig) {
  import_consola3.default.info("run ssh:", sshConfig);
  const answer = await import_inquirer3.default.prompt([{ type: "password", name: "password", mask: "*", message: "Enter key pair password" }]);
  let ftpClient = new import_ssh2_sftp_client.default();
  const port = sshConfig["Port"];
  const key = import_fs7.default.readFileSync(import_path3.default.resolve(import_os.default.homedir(), ".ssh/id_rsa"));
  const spinner3 = (0, import_ora4.default)("Connecting");
  try {
    spinner3.start();
    await ftpClient.connect({
      host: sshConfig["HostName"],
      port: port ? parseInt(port) : 22,
      username: sshConfig["User"],
      passphrase: answer.password,
      privateKey: key
    });
    releaseConfig.fileMap.sort((it1, it2) => (it1.order ?? 0) - (it2.order ?? 0));
    for (let item of releaseConfig.fileMap) {
      if (typeof item.src == "string") {
        if (item.remoteCopy) {
          await checkParentDir(ftpClient, item.dest, (dir) => {
            spinner3.warn(`Create Dir: ${dir}`);
          });
          let destExists = await ftpClient.exists(item.dest);
          if (destExists) {
            spinner3.warn(`Delete exists file:${item.dest}`);
            await ftpClient.delete(item.dest);
          }
          spinner3.info(`Copying File: ${item.src} -> ${item.dest}`);
          await ftpClient.rcopy(item.src, item.dest);
        } else {
          const localFile = import_path3.default.resolve(process3.cwd(), item.src);
          if (!item.remoteCopy && !import_fs7.default.existsSync(localFile)) {
            spinner3.warn(`Skip not exists file:${localFile}`);
            continue;
          }
          if (import_fs7.default.lstatSync(localFile).isDirectory()) {
            spinner3.info(`Uploading Dir: ${localFile} -> ${item.dest}`);
            await ftpClient.uploadDir(localFile, item.dest);
          } else {
            await checkParentDir(ftpClient, item.dest, (dir) => {
              spinner3.warn(`Create Dir: ${dir}`);
            });
            spinner3.info(`Uploading File: ${localFile} -> ${item.dest}`);
            await ftpClient.put(localFile, item.dest);
          }
        }
      } else {
        await ftpClient.put(Buffer.from(JSON.stringify(item.src), "utf-8"), item.dest);
      }
    }
    spinner3.succeed("Files uploaded!");
    await ftpClient.end();
  } catch (e) {
    spinner3.fail(`Connection error:${e}`);
    await ftpClient.end();
  }
}
async function ftpUpload() {
  const releaseJsonFilePath = import_path3.default.join(process3.cwd(), "release.json");
  const packageVersion = getPackageVersion();
  import_consola3.default.info("Package Version:", packageVersion);
  let releaseJson = import_fs7.default.readFileSync(releaseJsonFilePath).toString().replaceAll("${version}", packageVersion);
  const releaseConfig = JSON.parse(releaseJson);
  const sshConfigFile = import_path3.default.resolve(import_os.default.homedir(), ".ssh/config");
  import_consola3.default.info("SSH Config File Path:", sshConfigFile);
  const sshConfigs = import_ssh_config.default.parse(import_fs7.default.readFileSync(sshConfigFile).toString());
  for (let host of releaseConfig.ftpConfig.host) {
    let sshConfig = sshConfigs.compute(host);
    if (!sshConfig) {
      import_consola3.default.error(`SSH config ${releaseConfig.ftpConfig.host} not found`);
      return;
    }
    await runSSH(sshConfig, releaseConfig);
  }
}
var import_path3, import_fs7, import_ssh_config, import_os, import_ssh2_sftp_client, import_consola3, import_inquirer3, import_ora4, process3;
var init_ftp = __esm({
  "src/release/ftp.ts"() {
    "use strict";
    import_path3 = __toESM(require("path"), 1);
    import_fs7 = __toESM(require("fs"), 1);
    import_ssh_config = __toESM(require("@widget-js/ssh-config"), 1);
    import_os = __toESM(require("os"), 1);
    import_ssh2_sftp_client = __toESM(require("ssh2-sftp-client"), 1);
    import_consola3 = __toESM(require("consola"), 1);
    import_inquirer3 = __toESM(require("inquirer"), 1);
    import_ora4 = __toESM(require("ora"), 1);
    process3 = __toESM(require("process"), 1);
    init_utils();
  }
});

// src/release/release.ts
var release_exports = {};
__export(release_exports, {
  default: () => release_default
});
var import_fs8, import_path4, import_chalk3, release, release_default;
var init_release = __esm({
  "src/release/release.ts"() {
    "use strict";
    import_fs8 = __toESM(require("fs"), 1);
    import_path4 = __toESM(require("path"), 1);
    init_promptChecker();
    init_update_zip();
    init_oss();
    import_chalk3 = __toESM(require("chalk"), 1);
    init_ftp();
    release = async (options) => {
      if (options.type == "ftp") {
        await ftpUpload();
        return;
      }
      const packageJSON = JSON.parse(import_fs8.default.readFileSync("package.json", "utf-8"));
      const changelogJSON = JSON.parse(import_fs8.default.readFileSync("changelog.json", "utf-8"));
      const version = packageJSON["version"];
      const changelog = changelogJSON[version];
      let needUpdateElectron = await promptChecker_default({
        type: "confirm",
        name: "electron",
        message: import_chalk3.default.blue("\u7528\u6237\u662F\u5426\u9700\u8981\u66F4\u65B0Electron?")
      });
      const versionInfo = {
        version,
        releaseNote: changelog,
        updateElectron: needUpdateElectron,
        updateNodeModule: false,
        updateWindowsApi: false,
        downloadLink: ""
      };
      let installerPath = import_path4.default.join(`./packaged/widgets-${version}-setup-win-x64.exe`);
      if (!import_fs8.default.existsSync(installerPath)) {
        installerPath = import_path4.default.join(`./packaged/electron-${version}-setup-win-x64.exe`);
      }
      const updateZipPath = import_path4.default.join(`./packaged/update.zip`);
      console.log(import_chalk3.default.blue("\u538B\u7F29\u66F4\u65B0\u6587\u4EF6\u4E2D"));
      await update_zip_default("./release", updateZipPath);
      console.log(import_chalk3.default.blue("\u4E0A\u4F20installer.exe\u5230OSS"));
      await put("version/installer.exe", installerPath);
      console.log(import_chalk3.default.blue("\u4E0A\u4F20update.zip\u5230OSS"));
      await put("version/update.zip", updateZipPath);
      console.log(import_chalk3.default.blue("\u66F4\u65B0\u7248\u672C\u4FE1\u606F"));
      versionInfo.downloadLink = "https://widget-fun.oss-cn-hangzhou.aliyuncs.com/version/update.zip";
      const versionJSON = JSON.stringify(versionInfo, null, 2);
      await put("version/version.json", Buffer.from(versionJSON));
      copy(`version/history/${version}.exe`, "version/installer.exe");
      copy(`version/history/update-${version}.zip`, "version/update.zip");
      console.log(import_chalk3.default.yellow(versionJSON));
    };
    release_default = release;
  }
});

// src/index.ts
var import_commander = require("commander");
var import_fs9 = __toESM(require("fs"), 1);
var import_path5 = __toESM(require("path"), 1);
var process4 = __toESM(require("process"), 1);
var import_url2 = require("url");
var import_figlet = __toESM(require("figlet"), 1);
var import_gradient_string = __toESM(require("gradient-string"), 1);
var import_meta2 = {};
var __filename = (0, import_url2.fileURLToPath)(import_meta2.url);
var __dirname = import_path5.default.dirname(__filename);
var packageJsonPath = import_path5.default.join(__dirname, "../package.json");
var cliPackage = JSON.parse(import_fs9.default.readFileSync(packageJsonPath).toString());
console.log(import_gradient_string.default.pastel.multiline(import_figlet.default.textSync("widget-cli", { horizontalLayout: "full" })));
import_commander.program.version(`@widget-js/cli ${cliPackage.version}`).usage("<command> [options]");
import_commander.program.command("create").description("\u521B\u5EFA\u65B0\u7684\u7EC4\u4EF6").action(async () => {
  const createWidget2 = await Promise.resolve().then(() => (init_createWidget(), createWidget_exports));
  await createWidget2.default();
});
var dependenciesOption = new import_commander.Option("-t, --type <type>").choices(["remote", "local"]);
import_commander.program.command("dependencies").description("\u5C06@widget-js\u4F9D\u8D56\u7248\u672C\u8BBE\u7F6E\u6210\u8FDC\u7A0B\u6216\u8005\u672C\u5730").addOption(dependenciesOption).action(async (options) => {
  let dependencies = await Promise.resolve().then(() => (init_dependencies(), dependencies_exports));
  await dependencies.default(options);
});
import_commander.program.command("build").description("\u6267\u884C\u7F16\u8BD1\u4EFB\u52A1").action(async () => {
  const build2 = await Promise.resolve().then(() => (init_build(), build_exports));
  await build2.build();
});
var typeOption = new import_commander.Option("-t, --type <type>").choices(["ftp", "oss"]);
import_commander.program.command("release").description("\u901A\u8FC7FTP/OSS\u53D1\u5E03\u6587\u4EF6\uFF0C\u4EC5\u5185\u90E8\u4F7F\u7528").addOption(typeOption).action(async (options, command) => {
  let release2 = await Promise.resolve().then(() => (init_release(), release_exports));
  await release2.default(options);
});
import_commander.program.parse(process4.argv);
