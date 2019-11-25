const routers = [
    {
        path: '/',
        meta: {
            title: '后台首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/index',
        meta: {
            title: '后台首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/error',
        meta: {
            title: '错误页面'
        },
        component: (resolve) => require(['./views/error.vue'], resolve)
    },
    {
        path: '*',
        meta: {
            title: '错误页面'
        },
        component: (resolve) => require(['./views/error.vue'], resolve)
    }
];
export default routers;
