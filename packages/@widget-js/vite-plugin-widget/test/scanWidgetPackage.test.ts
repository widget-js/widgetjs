import scanWidgetPackage from "../src/scanWidgetPackage";
import scanWidgets from "../src/scanWidgets";

test('scanWidgetPackage', () => {
  console.log(scanWidgetPackage());
})


test('scanWidgets', async () => {
  let widgets = await scanWidgets();
  console.log(widgets);
})
