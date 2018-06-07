<template>
    <div class="page_wallet">
        <div class="wallet_header" v-if="showHeader">
            <div class="back"></div>
            <span>{{$route.meta.title}}</span>
        </div>
        <div class="wallet_block" v-if="showHeader"></div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    mounted(){
    },
    computed:{
        showHeader(){
            return this.$route.path != '/wallet';
        }
    }
}
</script>
<style lang="less">
@import url(./css/style.less);
</style>
