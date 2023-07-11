import scanWidgets from "./scanWidgets";
import process from "process";
import {WidgetPackage} from "@widget-js/core";
import {WidgetUtils} from "@widget-js/utils";


const scanWidgetPackage = async (): Promise<WidgetPackage> => {
  let widgetPackage = await WidgetUtils.scanWidgetPackage(process.cwd());
  const widgets = await scanWidgets();
  widgetPackage!["widgets"].push(...widgets);

  return widgetPackage!;
}


export default scanWidgetPackage;
