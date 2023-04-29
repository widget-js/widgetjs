import {WidgetPackage} from "@widget-js/core";

const widgetPackage = new WidgetPackage({
    author: "Neo Fu",
    description: {
        "zh-CN": "全网热点组件",
    },
    entry: "index.html",
    hash: true,
    homepage: "https://widgetjs.cn",
    lang: undefined,
    name: "cn.widgetjs.widgets.hotspot",
    remoteEntry: "https://rtugeek.gitee.io/hotspot",
    remotePackage: "https://rtugeek.gitee.io/hotspot/widget.json",
    title: {
        "zh-CN": "包含知乎、bilibili、抖音、微博等平台的热搜组件。",
    },
    url: "",
    version: "1.0.0",
    devOptions:{
        folder: "./src/widgets/",
        route: true,
        devUrl: "http://localhost:5173"
    }
});

export default widgetPackage;
