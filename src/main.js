import Vue from 'vue'
import App from './App.vue'
import router from './parts/router.js'
require('./parts/filters.js')
import store from './parts/store.js'
require('./parts/axios.js')
require('./parts/loading/index.js')
import VueScroller from 'vue-scroller'
require('./parts/globalComponent/index.js')

Vue.use(VueScroller)

//关闭生产提示
Vue.config.productionTip = false;

//判断是否是安卓app，然后执行
window.cusAndroid = false;
try {
	window.android.isAndroid();
} catch (e) {

}

window.isAndroid = function() {
	cusAndroid = true;
};

//解决键盘遮住输入框问题
window.adrShowInput = function(){
	if (is_AdrIos() == 'adr') {
		$('.adr_input_show input').on('focus', function () {
			var that = this;
			var windowBeforeH = window.innerHeight;  //计算开始窗口高度
			var thisH = $(this).height();	  //计算input输入框的高度
			var startTop = $('.adr_input_box')[0].scrollTop;	//计算开始滚动高度
			window.onresize = function () {
				var windowAfterH = window.innerHeight;	 //键盘弹出后，窗口高度
				var scrollChange = windowAfterH / 2 - thisH;  //调整input输入框到键盘的距离
				if (windowAfterH < windowBeforeH) {		//弹出键盘时执行
					that.scrollIntoView();				//让input出现在视窗顶部
					var top = $('.adr_input_box')[0].scrollTop;		//计算scrollIntoView置顶后滚动高度

					if (top > thisH*2.5) {		//如果滚动的高度大于多少时，让input出现在视窗底部，然后再调整到键盘的距离
						that.scrollIntoView(false);
						var top = $('.adr_input_box')[0].scrollTop;
						$('.adr_input_box')[0].scrollTop = top + scrollChange;
					}else{
						$('.adr_input_box')[0].scrollTop = 0; 	//如果滚动的高度小于多少时，不滚动
					}
				} else {
					// $('.content')[0].scrollTop = startTop;  //键盘消失时是否回归到原来位置
				}
			}
		});
	}
}

//实例化
var vm = new Vue({
    el: '#app',
  	router,
  	store,
    render: h => h(App)
});