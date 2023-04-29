import inquirer, {Answers, Question} from "inquirer";

const promptChecker = async <T extends Question>(prompt:T, checker?:(answer:any)=>boolean):Promise<any> => {
  const answer:Answers = await inquirer.prompt([prompt]);
  if (checker) {
    if (checker(answer)) {
      return answer[prompt.name!];
    } else {
      return promptChecker(prompt, checker);
    }
  }
  return answer[prompt.name!];
}

export default promptChecker;
