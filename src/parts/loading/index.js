import Vue from 'vue';

const Loadinga = require('./Loadinga.vue')
const Loadingb = require('./Loadingb.vue')
const Loadingc = require('./Loadingc.vue')
const Loadingd = require('./Loadingd.vue')
const Loadinge = require('./Loadinge.vue')
const Loadingf = require('./Loadingf.vue')
const Loadingg = require('./Loadingg.vue')
const Loading = {
  	install: function(Vue) {
    	Vue.component('Loadinga', Loadinga);
    	Vue.component('Loadingb', Loadingb);
    	Vue.component('Loadingc', Loadingc);
    	Vue.component('Loadingd', Loadingd);
    	Vue.component('Loadinge', Loadinge);
    	Vue.component('Loadingf', Loadingf);
    	Vue.component('Loadingg', Loadingg);
  	}
}

Vue.use(Loading)

