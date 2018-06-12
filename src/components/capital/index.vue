<template>
    <div>
        <component :is="'Header'">
            <!-- <router-link slot="search" tag="div" class="zengjia" :to="'/capital/'+$route.params.id+'/addbuy'" v-if="Number(is_buy)">
                <img src="/public/img/jiahao.png">
            </router-link>
            <router-link slot="search" tag="div" class="zengjia" :to="'/capital/'+$route.params.id+'/template'" v-else>
                <img src="/public/img/jiahao.png">
            </router-link> -->
        </component>
        <div class="container Page">
            <p class="noinfo" v-if="!resdata.length">暂无配置列表</p>
            <div class="item_box">
                <router-link tag='div' :to="'/capital/'+$route.params.id+( Number(is_buy) ? '/detailbuy/' : '/detail/')+item.id" class="item bor_b" v-for="(item,index) in resdata" :key="index">
                    <div class="title flex_align">
                        <div class="flex_1 text_o">{{item.title}}</div>
                        <div class="caozuo">
                            <router-link :to="'/capital/'+$route.params.id+'/editbuy/'+item.id" tag="span" class="edit" v-if="Number(is_buy)"></router-link>
                            <router-link :to="'/capital/'+$route.params.id+'/edit/'+item.id" tag="span" class="edit" v-else></router-link>
                            <span class="delete" @click.prevent="deleteConf(item.id)"></span>
                        </div>
                    </div>
                    <div class="time">
                        {{item.created_at}}
                        <span class="send" v-if="Number(item.status)">已发送</span>
                        <span class="no_send" v-else>未发送</span>
                    </div>
                </router-link>
            </div>

            <div class="create_conf">
                <router-link tag="div" class="create_btn" :to="'/capital/'+$route.params.id+'/addbuy'" v-if="Number(is_buy)">创建资产配置报告</router-link>
                <router-link tag="div" class="create_btn" :to="'/capital/'+$route.params.id+'/template'" v-else>创建资产配置报告</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                is_buy:1,
                resdata:[],
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
                    customer_id: _this.$route.params.id
				});
                this.axios.post('/asset/index',data).then(function(res){
                    if(res.data.code == 1){
                        _this.is_buy = res.data.data.is_buy;
                        _this.resdata = res.data.data.data || [];
                        _this.resdata.reverse();
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            deleteConf(conf_id){
                let _this=this;
                layer.open({
                    content:'确定要删除该条资产配置报告吗？',
                    btn:['确定','取消'],
                    yes:function(index){
                        layer.close(index);
                        let data = _this.qs.stringify({
                            token:localStorage.token,
                            asset_id:conf_id
                        });
                        _this.axios.post('/asset/delete',data).then(function(res){
                            if(res.data.code == 1){
                                _this.$store.commit('msg', '删除成功');
                                _this.fetchData();
                            }
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        background-color: #fff;
        padding-bottom: 60px;
    }
    .noinfo{
        text-align: center;
        color: #aaa;
        font-size: 13px;
        line-height: 1.6;
        padding: 15px;
    }
    .zengjia{
        position: absolute;
        top:0;
        right:0;
        width: 48px;
        height: 48px;
        padding: 14px;
        img{
            width:100%;
            height: 100%;
        }
    }
    .item_box{
        padding: 0 0 0 15px;
        .item{
            padding: 10px 15px 20px 0;
            color: #333;
            .title{
                line-height: 44px;
                font-size: 16px;
                .caozuo{
                    height: 30px;
                    span{
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        &.edit{
                            background: url(/public/img/capital_edit.png) no-repeat center center;
                            background-size: 22px;
                        }
                        &.delete{
                            background: url(/public/img/capital_delete.png) no-repeat center center;
                            background-size: 22px;
                        }
                    }
                }
            }
            .time{
                font-size: 14px;
                color: #666;
                line-height: 30px;
                span{
                    padding:4px 8px;
                    border-radius: 3px;
                    margin-left: 6px;
                    &.send{
                        border:1px solid #43CD80;
                        color: #43CD80;
                    }
                    &.no_send{
                        border:1px solid #FF6A6A;
                        color: #FF6A6A;
                    }
                }
            }
        }
    }
    .create_conf{
        position: fixed;
        bottom:0;
        z-index: 999;
        padding: 10px 15px;
        width: 100%;
        text-align: center;
        .create_btn{
            width: 100%;
            border-radius: 4px;
            padding: 10px 0;
            font-size: 14px;
            background-color: #ffa043;
            color: #fff;
        }
    }
</style>