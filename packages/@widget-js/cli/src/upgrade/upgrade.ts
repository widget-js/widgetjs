import packageJson from "package-json";
import ora from "ora";
import { getPackageJson, getPackagePath } from "../utils";
import fs from "fs";

const packages: { [key: string]: string } = {
  "@widget-js/core": "", "@widget-js/vue3": "", "@widget-js/cli": "", "@widget-js/vite-plugin-widget": ""
};
const spinner = ora("Connecting");

export class Upgrade {

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


  private async upgradePackage(dependencies: { [key: string]: string }, packageNames: string[]) {
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

  async getRemoteVersion(packageName: string): Promise<string> {
    spinner.info(`Fetching package version:${packageName}`);
    const metadata = await packageJson(packageName);
    let version = metadata["version"];
    spinner.info(`version:${version}`);
    return version as string;
  }

}
