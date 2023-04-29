import path from "path";
import process from "process";
import fs from "fs";

export default function exit(code: number = 0) {
  if (exports.exitProcess) {
    process.exit(code)
  } else if (code > 0) {
    throw new Error(`Process exited with code ${code}`)
  }
}

export function getPackageVersion() {
  const packagePath = path.join(process.cwd(), 'package.json')
  return JSON.parse(fs.readFileSync(packagePath).toString())['version']
}
