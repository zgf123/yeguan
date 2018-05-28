import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from './store.js'
Vue.use(VueRouter);

const router = new VueRouter({
    mode:'history',
    routes,
    scrollBehavior: (x, y, pos) => {
        if(!pos){
            store.state.isFetchData = true;
            return { y: 0 }
        }else{
            store.state.isFetchData = false;
            return pos
        }
    }
})

//导航钩子
router.beforeEach((to, from, next) => {
    
    //改变路由隐藏layer弹窗
    let layLength = $('.layui-m-layer').length;
    // console.log(layLength);
    if (layLength > 0) {
        layer.closeAll();
    }

    // 此函数必须做判断，否则将进入死循环，必须以next()结尾。
    const baseurl = store.state.baseurl;
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.token) {
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next();
    }
})
router.afterEach(route => {
    var pageTitle = route.meta.pageTitle;
    store.state.pageTitle = pageTitle;
});

export default router