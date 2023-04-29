import fs from "fs";
import path from "path";
import scanWidgets from "./scanWidgets";
import process from "process";
import {transpileCodeString} from "./utils";
import {WidgetPackage} from "@widget-js/core";


const scanWidgetPackage = (): WidgetPackage => {
  // Read widget.ts first
  let tsFile = path.join(process.cwd(), 'widget.ts');
  let widgetPackage: WidgetPackage;
  if (fs.existsSync(tsFile)) {
    const code = fs.readFileSync(tsFile).toString();
    widgetPackage = transpileCodeString(code)
  } else {
    const json = fs.readFileSync(path.join(process.cwd(), 'widget.json')).toString();
    widgetPackage = JSON.parse(json);
  }
  scanWidgets().forEach((it) => {
    widgetPackage["widgets"].push(it);
  })
  return widgetPackage;
}


export default scanWidgetPackage;
