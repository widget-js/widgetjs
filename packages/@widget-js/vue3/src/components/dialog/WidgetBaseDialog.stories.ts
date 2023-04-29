import WidgetBaseDialog from "./WidgetBaseDialog.vue";
import {WidgetConfigOption} from "@/model/WidgetConfigOption";
import {WidgetParams} from "@widget-js/core";

export default {
    title: 'Dialog/WidgetBaseDialog',
    component: WidgetBaseDialog,
    argTypes: {
    },
};

export const Default = (args: any) => ({
    components: {WidgetBaseDialog},
    setup() {
        const option = new WidgetConfigOption({title:"设置"});
        const params = new WidgetParams();
        params.widthPx =250;
        params.heightPx =250;
        return {...args,option,params};
    },
    template: '<widget-base-dialog v-bind="args" :widget-params="params" :option="option"></widget-base-dialog>',
});


