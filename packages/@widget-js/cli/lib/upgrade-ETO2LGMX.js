import {
  getPackageJson,
  getPackagePath
} from "./chunk-SIAOIY3B.js";

// src/upgrade/upgrade.ts
import packageJson from "package-json";
import ora from "ora";
import fs from "fs";
var packages = {
  "@widget-js/core": "",
  "@widget-js/vue3": "",
  "@widget-js/cli": "",
  "@widget-js/vite-plugin-widget": ""
};
var spinner = ora("Connecting");
var Upgrade = class {
  async start() {
    spinner.start();
    let json = getPackageJson();
    let packageNames = Object.keys(packages);
    let dependencies = json["dependencies"];
    let devDependencies = json["devDependencies"];
    await this.upgradePackage(dependencies, packageNames);
    await this.upgradePackage(devDependencies, packageNames);
    fs.writeFileSync(getPackagePath(), JSON.stringify(json, null, 2));
    spinner.succeed("Upgraded!");
  }
  async upgradePackage(dependencies, packageNames) {
    let localPackages = Object.keys(dependencies);
    for (let localPackage of localPackages) {
      if (packageNames.indexOf(localPackage) > -1) {
        let packageVersion = packages[localPackage];
        if (!packageVersion) {
          packageVersion = await this.getRemoteVersion(localPackage);
          packages[localPackage] = packageVersion;
        }
        dependencies[localPackage] = `^${packageVersion}`;
      }
    }
  }
  async getRemoteVersion(packageName) {
    spinner.info(`Fetching package version:${packageName}`);
    const metadata = await packageJson(packageName);
    let version = metadata["version"];
    spinner.info(`version:${version}`);
    return version;
  }
};
export {
  Upgrade
};
