import WidgetTimeRangeField from "@/components/form/WidgetTimeRangeField.vue";

export default {
    components: {WidgetTimeRangeField},
    title: 'Form/WidgetTimeRangeField',
    component: WidgetTimeRangeField,
    argTypes: {
    },
};

export const Default = (args: any) => ({
    components: {WidgetTimeRangeField},
    setup() {
        return {args};
    },
    template: '<widget-time-range-field v-bind="args"></widget-time-range-field>',
});




