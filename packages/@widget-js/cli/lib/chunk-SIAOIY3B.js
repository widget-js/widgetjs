// src/utils.ts
import path from "path";
import process from "process";
import fs from "fs";
function exit(code = 0) {
  if (exports.exitProcess) {
    process.exit(code);
  } else if (code > 0) {
    throw new Error(`Process exited with code ${code}`);
  }
}
function getPackagePath() {
  return path.join(process.cwd(), "package.json");
}
function getPackageJson() {
  return JSON.parse(fs.readFileSync(getPackagePath()).toString());
}
function getPackageVersion() {
  return getPackageJson()["version"];
}

export {
  exit,
  getPackagePath,
  getPackageJson,
  getPackageVersion
};
