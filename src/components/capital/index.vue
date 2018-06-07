<template>
    <div>
        <component :is="'Header'">
            <router-link slot="search" tag="div" class="zengjia" :to="'/capital/'+$route.params.id+'/add'" v-if="resdata.is_buy">
                <img src="/public/img/jiahao.png">
            </router-link>
            <router-link slot="search" tag="div" class="zengjia" :to="'/capital/'+$route.params.id+'/template'" v-else>
                <img src="/public/img/jiahao.png">
            </router-link>
        </component>
        <div class="container Page">
            <p class="noinfo" v-if="!resdata.length">暂无配置列表</p>
            <div class="item_box">
                <div class="item bor_b">
                    <div class="title flex_align">
                        <div class="flex_1 text_o">资产配置报告资产配置报告资产配置报告资产配置报告资产配置报告</div>
                        <div class="caozuo">
                            <span class="edit"></span>
                            <span class="delete"></span>
                        </div>
                    </div>
                    <div class="time">
                        2018/05/02
                        <span class="send">已发送</span>
                        <span class="no_send">未发送</span>
                    </div>
                </div>
                <div class="item bor_b">
                    <div class="title flex_align">
                        <div class="flex_1 text_o">资产配置报告资产配置报告资产配置报告资产配置报告资产配置报告</div>
                        <div class="caozuo">
                            <span class="edit"></span>
                            <span class="delete"></span>
                        </div>
                    </div>
                    <div class="time">
                        2018/05/02
                        <span class="send">已发送</span>
                        <span class="no_send">未发送</span>
                    </div>
                </div>
                <div class="item bor_b">
                    <div class="title flex_align">
                        <div class="flex_1 text_o">资产配置报告资产配置报告资产配置报告资产配置报告资产配置报告</div>
                        <div class="caozuo">
                            <span class="edit"></span>
                            <span class="delete"></span>
                        </div>
                    </div>
                    <div class="time">
                        2018/05/02
                        <span class="send">已发送</span>
                        <span class="no_send">未发送</span>
                    </div>
                </div>
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
                    customer_id: _this.$route.params.id
				});
                this.axios.post('/asset/index',data).then(function(res){
                    if(res.data.code == 1){
                        // _this.resdata = res.data.data || [];
                    }else{
                        // _this.$store.commit('msg','请求错误，请重试');
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
        padding-bottom: 40px;
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
</style>