<template>
    <div>
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">{{$route.query.title}}的发送记录</div>
        </component>
        <div class="container Page">
            <!-- <p class="noinfo" v-if="!resdata.length">暂无发送记录</p> -->
            <div class="history">
                <ul>
                    <li class="flex flex_align" :class="item.is_read ? 'on':''" v-for="(item,index) in resdata" :key="index">
                        <div class="flex_1">{{item.name}}</div>
                        <div class="flex_1">{{item.status ? '发送成功' : '发送失败'}}</div>
                        <div class="flex_1">{{item.is_read ? '已查阅' : '未查阅'}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                resdata:[]
            }
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                let _this = this;
				var data = this.qs.stringify({
                    token:localStorage.token,
                    asset_id:_this.$route.params.id
				});
                this.axios.post('/asset/getsend',data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data || [];
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .noinfo{
        text-align: center;
        color: #aaa;
        font-size: 13px;
        line-height: 1.6;
        padding: 15px;
    }
    .container{
        background-color: #fff;
    }
    .com_title{
        padding:0 50px;
    }
    .history{
        padding: 16px 0;
        li{
            text-align:center;
            color: #aaa;
            height: 40px;
            &.on{
                color: #333;
            }
        }
    }
</style>