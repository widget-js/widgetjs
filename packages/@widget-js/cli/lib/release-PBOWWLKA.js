import {
  promptChecker_default
} from "./chunk-3GPAHQ6O.js";
import {
  getPackageVersion
} from "./chunk-SIAOIY3B.js";

// src/release/release.ts
import fs4 from "fs";
import path2 from "path";

// src/release/update-zip.ts
import fs from "fs";
import archiver from "archiver";
function zipDirectory(sourceDir, outPath, ignoreDir) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);
  return new Promise((resolve, reject) => {
    archive.glob("**/*", { cwd: sourceDir, ignore: ["node_modules/**"] }).on("error", (err) => reject(err)).pipe(stream);
    stream.on("close", () => resolve());
    archive.finalize();
  });
}
var update_zip_default = zipDirectory;

// src/release/oss.ts
import OSS from "ali-oss";
import fs2 from "fs";
import chalk from "chalk";
var packageData = JSON.parse(fs2.readFileSync("./package.json").toString());
var AccessKeyID = packageData.oss?.id ?? "default";
var AccessKeySecret = packageData.oss?.secret ?? "default";
var headers = {
  // 指定Object的存储类型。
  "x-oss-storage-class": "Standard",
  // 指定Object的访问权限。
  "x-oss-object-acl": "public-read",
  "x-oss-forbid-overwrite": "false",
  "Cache-Control": "no-cache"
};
var clinet = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: "oss-cn-hangzhou",
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: AccessKeyID,
  accessKeySecret: AccessKeySecret,
  bucket: "widget-fun"
});
async function put(ossPath, file) {
  try {
    const result = await clinet.put(ossPath, file, { headers });
    console.log(chalk.green(`\u4E0A\u4F20\u6210\u529F\uFF1A${file}->${ossPath}`));
  } catch (e) {
    console.log(e);
  }
}
async function copy(dist, src) {
  try {
    const result = await clinet.copy(dist, src, { headers });
    console.log(chalk.green(`\u590D\u5236\u6210\u529F\uFF1A${src}->${dist}`));
  } catch (e) {
    console.error(e);
  }
}

// src/release/release.ts
import chalk2 from "chalk";

// src/release/ftp.ts
import path from "path";
import fs3 from "fs";
import SSHConfig from "@widget-js/ssh-config";
import os from "os";
import Client from "ssh2-sftp-client";
import consola from "consola";
import inquirer from "inquirer";
import ora from "ora";
import * as process from "process";
async function checkParentDir(ftpClient, file, onMkdir) {
  let dir = path.dirname(file);
  const dirExists = await ftpClient.exists(dir);
  if (!dirExists) {
    onMkdir(dir);
    await ftpClient.mkdir(dir, true);
  }
}
function ftpUpload() {
  const releaseJsonFilePath = path.join(process.cwd(), "release.json");
  const packageVersion = getPackageVersion();
  consola.info("Package Version:", packageVersion);
  let releaseJson = fs3.readFileSync(releaseJsonFilePath).toString().replaceAll("${version}", packageVersion);
  const releaseConfig = JSON.parse(releaseJson);
  const sshConfigFile = path.resolve(os.homedir(), ".ssh/config");
  consola.info("SSH Config File Path:", sshConfigFile);
  const sshConfigs = SSHConfig.parse(fs3.readFileSync(sshConfigFile).toString());
  let sshConfig = sshConfigs.compute(releaseConfig.ftpConfig.host);
  if (!sshConfig) {
    consola.error(`SSH config ${releaseConfig.ftpConfig.host} not found`);
    return;
  }
  consola.info(sshConfig);
  inquirer.prompt([{ type: "password", name: "password", mask: "*", message: "Enter key pair password" }]).then(async (answer) => {
    let ftpClient = new Client();
    const port = sshConfig["Port"];
    const key = fs3.readFileSync(path.resolve(os.homedir(), ".ssh/id_rsa"));
    const spinner = ora("Connecting");
    try {
      spinner.start();
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
              spinner.warn(`Create Dir: ${dir}`);
            });
            let destExists = await ftpClient.exists(item.dest);
            if (destExists) {
              spinner.warn(`Delete exists file:${item.dest}`);
              await ftpClient.delete(item.dest);
            }
            spinner.info(`Copying File: ${item.src} -> ${item.dest}`);
            await ftpClient.rcopy(item.src, item.dest);
          } else {
            const localFile = path.resolve(process.cwd(), item.src);
            if (!item.remoteCopy && !fs3.existsSync(localFile)) {
              spinner.warn(`Skip not exists file:${localFile}`);
              continue;
            }
            if (fs3.lstatSync(localFile).isDirectory()) {
              spinner.info(`Uploading Dir: ${localFile} -> ${item.dest}`);
              await ftpClient.uploadDir(localFile, item.dest);
            } else {
              await checkParentDir(ftpClient, item.dest, (dir) => {
                spinner.warn(`Create Dir: ${dir}`);
              });
              spinner.info(`Uploading File: ${localFile} -> ${item.dest}`);
              await ftpClient.put(localFile, item.dest);
            }
          }
        } else {
          await ftpClient.put(Buffer.from(JSON.stringify(item.src), "utf-8"), item.dest);
        }
      }
      spinner.succeed("Files uploaded!");
      await ftpClient.end();
    } catch (e) {
      spinner.fail(`Connection error:${e}`);
      await ftpClient.end();
    }
  });
}

// src/release/release.ts
var release = async (options) => {
  console.log();
  if (options.type == "ftp") {
    await ftpUpload();
    return;
  }
  const packageJSON = JSON.parse(fs4.readFileSync("package.json", "utf-8"));
  const changelogJSON = JSON.parse(fs4.readFileSync("changelog.json", "utf-8"));
  const version = packageJSON["version"];
  const changelog = changelogJSON[version];
  let needUpdateElectron = await promptChecker_default({
    type: "confirm",
    name: "electron",
    message: chalk2.blue("\u7528\u6237\u662F\u5426\u9700\u8981\u66F4\u65B0Electron?")
  });
  const versionInfo = {
    version,
    releaseNote: changelog,
    updateElectron: needUpdateElectron,
    updateNodeModule: false,
    updateWindowsApi: false,
    downloadLink: ""
  };
  let installerPath = path2.join(`./packaged/widgets-${version}-setup-win-x64.exe`);
  if (!fs4.existsSync(installerPath)) {
    installerPath = path2.join(`./packaged/electron-${version}-setup-win-x64.exe`);
  }
  const updateZipPath = path2.join(`./packaged/update.zip`);
  console.log(chalk2.blue("\u538B\u7F29\u66F4\u65B0\u6587\u4EF6\u4E2D"));
  await update_zip_default("./release", updateZipPath);
  console.log(chalk2.blue("\u4E0A\u4F20installer.exe\u5230OSS"));
  await put("version/installer.exe", installerPath);
  console.log(chalk2.blue("\u4E0A\u4F20update.zip\u5230OSS"));
  await put("version/update.zip", updateZipPath);
  console.log(chalk2.blue("\u66F4\u65B0\u7248\u672C\u4FE1\u606F"));
  versionInfo.downloadLink = "https://widget-fun.oss-cn-hangzhou.aliyuncs.com/version/update.zip";
  const versionJSON = JSON.stringify(versionInfo, null, 2);
  await put("version/version.json", Buffer.from(versionJSON));
  copy(`version/history/${version}.exe`, "version/installer.exe");
  copy(`version/history/update-${version}.zip`, "version/update.zip");
  console.log(chalk2.yellow(versionJSON));
};
var release_default = release;
export {
  release_default as default
};
