import Vue from 'vue'

const filters = {
    normalTime(time) {
        if (time) {
            var oDate = new Date();
            oDate.setTime(time * 1000);
            var y = oDate.getFullYear();
            var m = oDate.getMonth() + 1;
            var d = oDate.getDate();
            var h = oDate.getHours();
            var min = oDate.getMinutes();
            var s = oDate.getSeconds();
            // return y+'-'+m+'-'+d+' '+h+':'+min+':'+s;
            return y + '-' + (m < 10 ? (0 + '' + m) : m) + '-' + (d < 10 ? (0 + '' + d) : d);
        }
    }
}

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

export default filters;