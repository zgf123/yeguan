import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        // baseurl:'http://manager.yeguan.fminxiang.com', //正式环境
        baseurl:'http://test.manager.yeguan.fminxiang.com', //测试环境
        // baseurl:'http://manager.fminxiang.local', //本地测试环境
        walleturl: 'http://licai.yeguan.fminxiang.com', //钱包接口
        // walleturl: 'http://licai.yeguan.local', //本地测试钱包接口

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