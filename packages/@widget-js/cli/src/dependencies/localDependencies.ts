import ora from "ora";
import {getPackageJson, getPackagePath, widgetPackages} from "../utils";
import fs from "fs";


const spinner = ora("Connecting");

export namespace LocalDependencies {
  export async function start() {
    spinner.start();
    let json = getPackageJson();
    let packageNames = Object.keys(widgetPackages);
    let dependencies = json["dependencies"];
    let devDependencies = json["devDependencies"];
    await setWorkspaceVersion(dependencies, packageNames);
    await setWorkspaceVersion(devDependencies, packageNames);
    fs.writeFileSync(getPackagePath(), JSON.stringify(json, null, 2));
    spinner.succeed("Using local versions(workspace:*)!");
  }

  async function setWorkspaceVersion(dependencies: { [key: string]: string }, packageNames: string[]) {
    let localPackages = Object.keys(dependencies);
    for (let localPackage of localPackages) {
      if (packageNames.indexOf(localPackage) > -1) {
        dependencies[localPackage] = `workspace:*`;
      }
    }
  }

}
