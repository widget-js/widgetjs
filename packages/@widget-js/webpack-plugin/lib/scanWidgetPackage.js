const scanWidgets = require('./scanWidgets');
const path = require("path");
const fs = require("fs");


function scanWidgetPackage() {
    let json = fs.readFileSync(path.join(process.cwd(), 'widget.json')).toString();
    const widgetPackage = JSON.parse(json);
    if (!widgetPackage["widgets"]) {
        widgetPackage["widgets"] = [];
    }
    scanWidgets().forEach((it) => {
        widgetPackage["widgets"].push(it);
    })
    return widgetPackage;
}

module.exports = scanWidgetPackage;

