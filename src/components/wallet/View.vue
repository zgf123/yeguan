<template>
    <div class="page_wallet">
        <div class="wallet_header" v-if="showHeader">
            <div class="back" @click="back"></div>
            <span>{{$route.meta.title}}</span>
        </div>
        <div class="wallet_block" v-if="showHeader"></div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'wallet',
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
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>
<style lang="less">
@import url(./css/style.less);
</style>
