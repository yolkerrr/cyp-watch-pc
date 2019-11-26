import Vue from 'vue';
import ViewUI from 'view-design';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'view-design/dist/styles/iview.css';
import config from "./libs/config"

Vue.use(VueRouter);
Vue.use(ViewUI);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    if(to.matched[0]["path"] === "*"){
        next();
    }else{
        if(to.path !== "/error" && to.path !== "/" && to.path !== "/login"){
            if(!window.localStorage.getItem(`${config.projectKey}-token`)){
                next({
                    path:"login"
                });
            }else{
                next();
            }
        }else{
            next();
        }
    }
});

router.afterEach((to, from, next) => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
