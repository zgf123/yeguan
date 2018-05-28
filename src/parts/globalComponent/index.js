import Vue from 'vue'

const PickSelect = require('./PickSelect.vue')
const PickTime = require('./PickTime.vue')
const UploadPic = require('./UploadPic.vue')
const Header = require('./Header.vue')

const globalComponent ={
    install:(Vue) => {
        Vue.component('PickSelect', PickSelect)
        Vue.component('PickTime', PickTime)
        Vue.component('UploadPic', UploadPic)
        Vue.component('Header', Header)
    }
}

Vue.use(globalComponent)