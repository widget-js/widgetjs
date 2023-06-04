import {WidgetPackage} from "../../src";
import * as fs from 'fs';

test('parseObject', () => {
    const widget = WidgetPackage.parseObject({
        name: "test",
        url: "/widget",
        other: false,
        routes:[
            {
                url: "/widget",
                name: 'index'
            },
            {
                url: "/config",
                name: 'config'
            },
        ]
    })

    expect(widget.name).toBe("test");
    expect(widget.url).toBe("/widget");
})
test('parseJSON', async () => {

  let json = fs.readFileSync('./test/model/widget.json').toString();
  let widgetPackage = WidgetPackage.parseJSON(json);
  expect(widgetPackage.widgets[0].getTitle()).toBe("bilibili热搜");
})


test('getFullUrl', () => {
    console.log("hash:true")
    let url1 = "http://127.0.0.1:8088";
    let url2 = "http://127.0.0.1:8088/";
    let url3 = "file:\\\\C:\\Users\\neo\\Desktop\\workspace";
    const widgetPackage = WidgetPackage.parseObject({
        name: "test",
        url: "http://127.0.0.1:8088",
        entry: "index.html",
        hash: true,
        other: false,
    })
    // console.log(widgetPackage.getFullUrl())
    // widgetPackage.url= url2
    // console.log(widgetPackage.getFullUrl())
    // widgetPackage.url= url3
    // console.log(widgetPackage.getFullUrl())
    console.log("hash:false")
    // expect(widgetPackage.getFullUrl()).toBe("test");
    // expect(widget.url).toBe("/widget");
})
