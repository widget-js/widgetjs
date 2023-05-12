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

export {
  promptChecker_default
};
