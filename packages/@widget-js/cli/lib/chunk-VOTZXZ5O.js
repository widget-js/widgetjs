// src/promts/promptChecker.ts
import inquirer from "inquirer";
var promptChecker = async (prompt, checker) => {
  const answer = await inquirer.prompt([prompt]);
  if (checker) {
    if (checker(answer)) {
      return answer[prompt.name];
    } else {
      return promptChecker(prompt, checker);
    }
  }
  return answer[prompt.name];
};
var promptChecker_default = promptChecker;

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
function getPackageVersion() {
  const packagePath = path.join(process.cwd(), "package.json");
  return JSON.parse(fs.readFileSync(packagePath).toString())["version"];
}

export {
  promptChecker_default,
  exit,
  getPackageVersion
};
