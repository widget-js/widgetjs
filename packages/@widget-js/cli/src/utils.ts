import path from "path";
import process from "process";
import fs from "fs";

export const widgetPackages: { [key: string]: string } = {
    "@widget-js/core": "", "@widget-js/vue3": "", "@widget-js/cli": "", "@widget-js/vite-plugin-widget": ""
};
export default function exit(code: number = 0) {
    if (exports.exitProcess) {
        process.exit(code);
    } else if (code > 0) {
        throw new Error(`Process exited with code ${code}`);
    }
}

export function getPackagePath() {
    return path.join(process.cwd(), "package.json");
}

export function getPackageJson() {
    return JSON.parse(fs.readFileSync(getPackagePath()).toString());
}

export function getPackageVersion() {
    return getPackageJson()["version"];
}
