import ChatgptSearchWidgetDefine from "./ChatgptSearch.widget";


const url = ChatgptSearchWidgetDefine.getIndexRoute().url;
const name = ChatgptSearchWidgetDefine.name;
const configUrl = ChatgptSearchWidgetDefine.getConfigRoute()!.url;
console.log(configUrl);
const ChatgptSearchWidgetRoutes = [
    {
        path: url,
        name: `${name}`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.chatgpt_search" */ './NativeChatgpt.vue')
    },
    {
        path: configUrl,
        name: `${name}.config`,
        component: () => import(/* webpackChunkName: "com.wisdom.widgets.chatgpt_search.config" */ './ConfigView.vue')
    }
]


export default ChatgptSearchWidgetRoutes;
