import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        baseurl:'http://manager.pvwyeguan.fminxiang.com',
        // baseurl:'http://manager.yeguan.fminxiang.com',
		// baseurl:'http://192.168.1.164',
        loading: false,
        isFetchData: true,
        pageTitle:'业管系统'
    },
    getters: {

    },
    mutations: {
        showLoading(state) {
            state.loading = true;
        },
        hideLoading(state) {
            state.loading = false;
        },
        toLogin(state, msg){
            localStorage.removeItem('info');
            localStorage.removeItem('token');
            layer.open({
                content: '账号异常，请重新登录',
                btn: '确定',
                shadeClose: false,
                yes: function (index) {
                    layer.close(index);
                    router.push({
                        path: '/login'
                    })
                }
            });
        },
        msg(state, resmsg) {
            layer.open({
                content: resmsg
                , skin: 'msg'
                , time: 2
            });
        }
    },
    actions: {

    }
});

export default store