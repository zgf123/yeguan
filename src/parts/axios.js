import Vue from 'vue'
import store from './store.js'
import axios from 'axios'
import qs from 'qs'

Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

const baseurl = store.state.baseurl;
const testbaseurl = store.state.testbaseurl;

// axios 配置
axios.defaults.timeout = 15000;

//上线之前必须修改
// axios.defaults.baseURL = baseurl; //正式
axios.defaults.baseURL = testbaseurl; //测试

//axios配置
axios.interceptors.request.use(function (config) {  //配置发送请求的信息

    return config;
}, function (error) {
    
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
    if (response.data.status == 505){
        store.commit('toLogin','账号异常，请重新登录');
        return false;
    }
    return response;
}, function (error) {
    if (error.response) {
        console.log(error.response);
        switch (error.response.status) {
	        /*case 401:
              	// 401 清除token信息并跳转到登录页面
              	// store.commit(types.LOGOUT);
              	localStorage.clear();
              	router.replace({
                  	path: '/login',
                  	query: {redirect: router.currentRoute.fullPath}
              	});
              	break;*/
        }
    } else {
        console.log('请求超时:', error);
        // store.commit('hideLoading');
    }

    return Promise.reject(error);
});
