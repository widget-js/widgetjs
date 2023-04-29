// src/build/build.ts
import ora from "ora";
import { exec } from "child_process";
import consola from "consola";
function build() {
  const preloadSpinner = ora("Preload").start();
  const mainSpinner = ora("Main").start();
  const build2 = exec("npm run build:preload").on("close", () => {
    consola.success("done");
  });
  build2.stdout.on("data", (data) => {
    consola.log("data", data);
  });
  exec("npm run build:main", (error, stdout, stderr) => {
    if (error) {
      consola.error("error: " + error);
      return;
    }
    consola.log("stdout: " + stdout);
    consola.log("stderr: " + typeof stderr);
  }).on("message", () => {
    consola.log("on-message");
  }).on("data", () => {
    consola.log("on-data");
  }).on("close", () => {
    consola.log("done");
  });
}
export {
  build
};
