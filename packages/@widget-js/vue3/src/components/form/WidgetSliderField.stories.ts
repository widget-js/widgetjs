import WidgetSliderField from "@/components/form/WidgetSliderField.vue";

export default {
    components: {WidgetSliderField},
    title: 'Form/WidgetSliderField',
    component: WidgetSliderField,
    argTypes: {
    },
};

export const Default = (args: any) => ({
    components: {WidgetSliderField},
    setup() {
        return {args};
    },
    template: '<widget-slider-field v-bind="args"></widget-slider-field>',
});




