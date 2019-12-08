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
        path: '/login',
        meta: {
            title: '超级管理员登录页'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/watch/list',
        meta: {
            title: '手表列表'
        },
        component: (resolve) => require(['./views/watch/list.vue'], resolve)
    },
    {
        path: '/watch/create',
        meta: {
            title: '新建手表'
        },
        component: (resolve) => require(['./views/watch/create.vue'], resolve)
    },
    {
        path: '/watch/edit',
        meta: {
            title: '编辑手表'
        },
        component: (resolve) => require(['./views/watch/edit.vue'], resolve)
    },
    {
        path: '/base/brand',
        meta: {
            title: '品牌管理'
        },
        component: (resolve) => require(['./views/base/brand.vue'], resolve)
    },
    {
        path: '/base/spec',
        meta: {
            title: '规格管理'
        },
        component: (resolve) => require(['./views/base/spec.vue'], resolve)
    },
    {
        path: '/base/classify',
        meta: {
            title: '分类管理'
        },
        component: (resolve) => require(['./views/base/classify.vue'], resolve)
    },
    {
        path: '/base/system',
        meta: {
            title: '系统管理'
        },
        component: (resolve) => require(['./views/base/system.vue'], resolve)
    },
    {
        path: '/base/comment',
        meta: {
            title: '留言管理'
        },
        component: (resolve) => require(['./views/base/comment.vue'], resolve)
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
