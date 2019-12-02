import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/dealers',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Dealers.vue'),
                    meta: { title: '经销商管理' }
                },
                {
                    path: '/models',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Models.vue'),
                    meta: { title: '车型管理' }
                },
                {
                    path: '/questions',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Qusetions.vue'),
                    meta: { title: '题目管理' }
                },
                {
                    path: '/users',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Users.vue'),
                    meta: { title: '客户管理' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

