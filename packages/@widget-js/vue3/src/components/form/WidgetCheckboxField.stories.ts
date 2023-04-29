import WidgetCheckboxField from "@/components/form/WidgetCheckboxField.vue";

export default {
    components: {WidgetCheckboxField},
    title: 'Form/WidgetCheckboxField',
    component: WidgetCheckboxField,
    argTypes: {
    },
};

export const Default = (args: any) => ({
    components: {WidgetCheckboxField},
    setup() {
        return {args};
    },
    template: '<widget-checkbox-field v-bind="args"></widget-checkbox-field>',
});




