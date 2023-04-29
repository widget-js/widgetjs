import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/Loading.vue'

/**
 * 组件路由都以 /widget/开头，e.g. /widget/countdown
 * 组件设置路由都以 /widget/config/开头，e.g. /widget/config/countdown
 * webpackChunkName: 和路由名称保持一致
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "setting" */ '@/views/settings/SettingView.vue')
    },
    {
        path: '/add',
        name: 'add',
        component: () => import(/* webpackChunkName: "add" */ '../views/add/AddWidgetView.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import(/* webpackChunkName: "add" */ '../views/Demo.vue')
    },
    {
        path: '/overlap',
        name: 'overlap',
        component: () => import(/* webpackChunkName: "overlap" */ '../views/overlap/OverlapView.vue')
    },
    {
        path: '/desktop',
        name: 'desktop',
        component: () => import(/* webpackChunkName: "widget" */ '../views/desktop/DesktopView.vue')
    },
    {
        path: '/desktop/grid',
        name: 'grid',
        component: () => import(/* webpackChunkName: "grid" */ '../views/desktop/Grid.vue')
    },
    {
        path: '/desktop/tray',
        name: 'tray',
        component: () => import(/* webpackChunkName: "tray" */ '../views/desktop/TrayGuide.vue')
    },
    {
        path: '/check-update',
        name: 'check-update',
        component: () => import(/* notification: "check-update" */ '../views/update/CheckUpdateView.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
