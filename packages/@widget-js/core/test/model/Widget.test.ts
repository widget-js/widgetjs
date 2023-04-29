import {Widget, WidgetKeyword} from "../../src";

test("stringify", () => {
    const name = "com.wisdom.widgets.clock";
    const title = {"zh": "时钟"};
    const description = {"zh": "带动画的时钟"};
    const keywords = [WidgetKeyword.RECOMMEND];
    const url = "/widget/clock";
    const configUrl = "/widget/config/clock";
    const ClockWidgetDefine = new Widget({
        routes: [],
        name: name,
        title: title,
        description: description,
        keywords: keywords,
        lang: "zh",
        width: 2,
        height: 2,
        minWidth: 2,
        maxWidth: 4,
        minHeight: 2,
        maxHeight: 4
    })
    console.log(JSON.stringify(ClockWidgetDefine));
})
test("stringify-array", () => {
    const name = "com.wisdom.widgets.clock";
    const title = {"zh": "时钟"};
    const description = {"zh": "带动画的时钟"};
    const keywords = [WidgetKeyword.RECOMMEND];
    const url = "/widget/clock";
    const configUrl = "/widget/config/clock";
    const ClockWidgetDefine = new Widget({
        name: name,
        title: title,
        description: description,
        keywords: keywords,
        lang: "zh",
        width: 2, routes: [],
        height: 2,
        minWidth: 2,
        maxWidth: 4,
        minHeight: 2,
        maxHeight: 4
    })
    console.log(JSON.stringify([ClockWidgetDefine]));
})

test("parseJSON", () => {
    const json = `  {
    "id": 188,
    "name": "cn.widgetjs.widgets.chatgpt_search",
    "packageName": "cn.widgetjs.widgets.chatgpt",
    "title": "{\\"zh\\":\\"ChatGPT搜索\\"}",
    "description": "{\\"zh\\":\\"一个集成AI、简单的搜索框\\"}",
    "keywords": "recommend",
    "socialInfo": "{}",
    "lang": "zh",
    "width": 6,
    "height": 8,
    "maxWidth": 12,
    "maxHeight": 15,
    "minWidth": 5,
    "minHeight": 5,
    "refreshWhenResided": 0,
    "shortcut": "Ctrl+Shift+C",
    "author": null,
    "supportHostedMode": 16,
    "previewImage": null,
    "backgroundThrottling": 1,
    "routes": "[{\\"name\\":\\"index\\",\\"url\\":\\"https://chat.openai.com\\",\\"assistUrl\\":\\"/widget/chatgpt_search\\"},{\\"name\\":\\"config\\",\\"url\\":\\"/widget/config/chatgpt_search\\"}]"
  }`;
    let widget = Widget.parseJSON(json);
    console.log(widget);
    console.log(widget.getTitle("zh"));
    console.log(widget.getTitle());
    console.log(widget.getDescription("zh"));
    console.log(widget.getDescription());
})

test("parseObject", () => {
    const json = `{
  "id": 188,
  "name": "cn.widgetjs.widgets.chatgpt_search",
  "packageName": "cn.widgetjs.widgets.chatgpt",
  "title": {
    "zh": "ChatGPT搜索"
  },
  "description": {
    "zh": "一个集成AI、简单的搜索框"
  },
  "keywords": "recommend",
  "socialInfo": "{}",
  "lang": "zh",
  "width": 6,
  "height": 8,
  "maxWidth": 12,
  "maxHeight": 15,
  "minWidth": 5,
  "minHeight": 5,
  "refreshWhenResided": 0,
  "shortcut": "Ctrl+Shift+C",
  "author": null,
  "supportHostedMode": 16,
  "previewImage": null,
  "backgroundThrottling": 1,
  "routes": [
    {
      "name": "index",
      "url": "https://chat.openai.com",
      "assistUrl": "/widget/chatgpt_search"
    },
    {
      "name": "config",
      "url": "/widget/config/chatgpt_search"
    }
  ]
}`;
    let object = JSON.parse(json);
    let widget = Widget.parseObject(object);
    let indexRoute = widget.getIndexRoute();
    console.log(indexRoute)
});

test("parseJSONArray", () => {
    const json = `[{
  "id": 188,
  "name": "cn.widgetjs.widgets.chatgpt_search",
  "packageName": "cn.widgetjs.widgets.chatgpt",
  "title": {
    "zh": "ChatGPT搜索"
  },
  "description": {
    "zh": "一个集成AI、简单的搜索框"
  },
  "keywords": "recommend",
  "socialInfo": "{}",
  "lang": "zh",
  "width": 6,
  "height": 8,
  "maxWidth": 12,
  "maxHeight": 15,
  "minWidth": 5,
  "minHeight": 5,
  "refreshWhenResided": 0,
  "shortcut": "Ctrl+Shift+C",
  "author": null,
  "supportHostedMode": 16,
  "previewImage": null,
  "backgroundThrottling": 1,
  "routes": [
    {
      "name": "index",
      "url": "https://chat.openai.com",
      "assistUrl": "/widget/chatgpt_search"
    },
    {
      "name": "config",
      "url": "/widget/config/chatgpt_search"
    }
  ]
}]`;
    let arr = JSON.parse(json);
    for (const i in arr) {
        let widget = Widget.parseObject(arr[i]);
        let indexRoute = widget.getIndexRoute();
        console.log(indexRoute)
    }

});
