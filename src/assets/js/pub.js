
//fastClick 去除click延时300ms
/* (function fastClick(){
    window.addEventListener('load', function () {
        FastClick.attach(document.body);
    }, false);
})(); */

//禁止双击上移
(function proMove(){
    var agent = navigator.userAgent.toLowerCase();        //检测是否是ios
    var iLastTouch = null;                                //缓存上一次tap的时间
    if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0)
    {
        document.body.addEventListener('touchend', function(event)
        {
            var iNow = new Date().getTime();

            iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
            var delta = iNow - iLastTouch;
            if (delta < 500 && delta > 0)
            {
                event.preventDefault();
                return false;
            }
            iLastTouch = iNow;
        }, false);
    }
})();

//把手机屏幕宽分为10rem
(function(){
    document.documentElement.style.fontSize = document.body.offsetWidth/10 + 'px';
})();

//阻止浏览器默认行为
function preventDefault(e){
	e.preventDefault();
}

function preDe(){
    document.body.addEventListener('touchmove',preventDefault,false);
}

//恢复浏览器默认行为
function clearPreDe(){
    document.body.removeEventListener('touchmove',preventDefault,false);
}

//判断是安卓或IOS
function is_AdrIos(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Android') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isAndroid){
        return 'adr';
    }else{
        return 'ios';
    }
}

//判断是否是微信s
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return 'yes';
    } else {
        return 'no';
    }
}

//跳转传参方法
function GetUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
} 

//读取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}  
//设置cookie   a：key   b：value   c：设置时间（天），不设置时关闭浏览器cookie失效     d：cookie存放目录 ，“ / ”意思为浏览器根目录 
function setCookie(a, b, c, d) {
    var d = d ? d : "/";
    if (c) {
        var e = new Date;
        e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c);
        var f = "; expires=" + e.toGMTString()
    } else var f = "";
    document.cookie = a + "=" + b + f + "; path=" + d;
}
//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//安卓禁用长按弹出菜单
if (is_AdrIos() == 'adr'){
    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
}
