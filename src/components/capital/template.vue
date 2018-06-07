<template>
    <div>
        <component :is="'Header'">
            <router-link slot="search" tag="div" class="bianji" :to="'/capital/'+$route.params.id+'/edit'">
                <img src="/public/img/capital_edit_head.png">
            </router-link>
        </component>
        <div class="container Page">
            {{'这是默认模板'}}
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                resdata:{}
            }
        },
        mounted(){
            
        },
        methods:{
            fetchData(){
				var data = this.qs.stringify({
                    token:localStorage.token
				});
                this.axios.post(url, data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
        }
    }
</script>

<style lang="less" scoped>
    .bianji{
        position: absolute;
        top:0;
        right:0;
        width: 48px;
        height: 48px;
        padding: 12px;
        img{
            width:100%;
            height: 100%;
        }
    }
</style>