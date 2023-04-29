import WidgetEditDialog from "./WidgetEditDialog.vue";
import {WidgetConfigOption} from "@/model/WidgetConfigOption";
import {WidgetData, WidgetParams} from "@widget-js/core";

export default {
    title: 'Dialog/WidgetEditDialog',
    component: WidgetEditDialog,
    argTypes: {},
};

export const Default = (args: any) => ({
    components: {WidgetEditDialog},
    setup() {
        const option = new WidgetConfigOption({title: "设置", backgroundColor: true,borderRadius:true, color: true});
        const params = new WidgetParams();
        const widgetData = new WidgetData("test");
        params.widthPx = 250;
        params.heightPx = 250;
        return {...args, option, params, widgetData};
    },
    template: '<widget-edit-dialog v-bind="args" :widget-params="params" :widget-data="widgetData" :option="option"></widget-edit-dialog>',
});


