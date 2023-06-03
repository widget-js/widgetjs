import packageJson from "package-json";
import ora from "ora";
import {getPackageJson, getPackagePath, widgetPackages} from "../utils";
import fs from "fs";

const spinner = ora("Connecting");

export namespace RemoteDependencies {

  export async function start() {
    spinner.start();
    let json = getPackageJson();
    let packageNames = Object.keys(widgetPackages);
    let dependencies = json["dependencies"];
    let devDependencies = json["devDependencies"];
    await upgradePackage(dependencies, packageNames);
    await upgradePackage(devDependencies, packageNames);
    fs.writeFileSync(getPackagePath(), JSON.stringify(json, null, 2));
    spinner.succeed("Using remote versions!");
  }


  async function upgradePackage(dependencies: { [key: string]: string }, packageNames: string[]) {
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

  async function getRemoteVersion(packageName: string): Promise<string> {
    spinner.info(`Fetching package version:${packageName}`);
    const metadata = await packageJson(packageName);
    let version = metadata["version"];
    spinner.info(`version:${version}`);
    return version as string;
  }

}
