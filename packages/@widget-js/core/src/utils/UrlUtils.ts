import {WidgetPackage} from "../model/WidgetPackage";
import {WidgetParams} from "../model/WidgetParams";

export class UrlUtils {
    static getWidgetUrl(widgetUrl: string, widgetPackage: WidgetPackage, widgetParams: WidgetParams) {
        let url = "";
        if (widgetUrl.startsWith("http")) {
            url = widgetUrl;
        } else {
            url = widgetPackage.getIndexUrl() + widgetUrl;
        }
        if (url.includes("?")) {
            return url + "&" + widgetParams.toUrlParams().toString();
        } else {
            return url + "?" + widgetParams.toUrlParams().toString();
        }
    }

    static getWidgetPackageIndexUrl(url: string, entry: string, hash: boolean): string {
        const arr = [url];
        if (url.startsWith("http")) {
            if (hash) {
                arr.push(url.endsWith("/") ? "#" : "/#")
            }
        } else {
            arr.push(entry.startsWith("/") ? entry : `/${entry}`);
            if (hash) {
                arr.push(url.endsWith("#") ? "" : "#")
            }
        }
        return arr.join("");
    }
}
