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

window.checkLoginStatus = (to) =>{
    return (to.path !== "/404" && to.path !== "/" && !!window.localStorage.getItem(`${config.projectKey}-token`));
};

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    next();
    // if(to.matched.length ===0){
    //     next({
    //         path:"404"
    //     })
    // }else{
    //     if(checkLoginStatus(to)){
    //         next();
    //     }else{
    //         next({
    //             path:"login"
    //         })
    //     }
    // }
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
