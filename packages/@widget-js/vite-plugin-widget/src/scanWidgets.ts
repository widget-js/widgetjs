import {Widget} from "@widget-js/core";
import fs from "fs";
import path from "path";
import * as process from "process";
import {transpileCodeString} from "./utils";
import {glob} from "glob";

async function scanWidgets() {
  const widgets: Widget[] = [];
  const widgetFiles = await glob('**/*.widget.ts', {ignore: 'node_modules/**'})
  for (let widgetFile of widgetFiles) {
    const file = path.join(process.cwd(), widgetFile);
    const code = fs.readFileSync(file).toString();
    const widget = transpileCodeString(code)
    widgets.push(widget)
  }
  return widgets
}

export default scanWidgets;
