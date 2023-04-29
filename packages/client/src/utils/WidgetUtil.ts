import {Widget, WidgetPackage, WidgetParams} from "@widget-js/core";

export default class WidgetUtil {

    static buildPreviewWidgetUrl(widget: Widget, widgetPackage: WidgetPackage, widthPx: number, heightPx: number) {
        const widgetParams = new WidgetParams();
        widgetParams.width = widget.width;
        widgetParams.height = widget.height;
        widgetParams.preview = true;
        widgetParams.widthPx = widthPx;
        widgetParams.heightPx = heightPx;
        widgetParams.name = widget.name;
        const toUrlParams = widgetParams.toUrlParams();
        const indexRoute = widget.getIndexRoute();
        if (indexRoute.url.startsWith("http")) {
            if (indexRoute.url.indexOf("?") > -1) {
                return indexRoute.url + toUrlParams.toString();
            } else {
                return indexRoute.url + "?" + toUrlParams.toString();
            }

        }
        const path = indexRoute.url + "?" + toUrlParams.toString();
        return widgetPackage.getIndexUrl() + path;
    }


}
