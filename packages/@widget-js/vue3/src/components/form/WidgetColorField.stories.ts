import WidgetColorField from "@/components/form/WidgetColorField.vue";

export default {
    components: {WidgetColorField},
    title: 'Form/WidgetColorField',
    component: WidgetColorField,
    argTypes: {
    },
};

export const Default = (args: any) => ({
    components: {WidgetColorField},
    setup() {
        return {args};
    },
    template: '<widget-color-field v-bind="args"></widget-color-field>',
});




