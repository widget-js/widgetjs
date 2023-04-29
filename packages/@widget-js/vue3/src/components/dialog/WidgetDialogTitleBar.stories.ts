import WidgetDialogTitleBar from "./WidgetDialogTitleBar.vue";

export default {
    components: {WidgetDialogTitleBar},
    title: 'Dialog/WidgetDialogTitleBar',
    component: WidgetDialogTitleBar,
    argTypes: {
    },
};

export const Default = (args: any) => ({
    components: {WidgetDialogTitleBar},
    setup() {
        return {args};
    },
    template: '<widget-dialog-title-bar v-bind="args"></widget-dialog-title-bar>',
});

Default.parameters = {
    design: [
        {
            name: "蓝湖",
            type: "link",
            url: "https://share.lanhuapp.com/#/invite?sid=X0xtlll",
        }
    ],
}


