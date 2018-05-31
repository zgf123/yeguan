<template>
    <div>
        <component :is="'Header'">
            <router-link slot="search" tag="div" class="zengjia" :to="'/capital/edit'"><img src="/public/img/jiahao.png" alt=""></router-link>
        </component>
        <div class="container Page">
            <p class="noinfo" v-if="!resdata.length">暂无配置列表</p>
            <div class="item_box">
                <div class="item bor_b" v-for="(item,index) in resdata" :key="index">
                    <div class="title">{{item.title}}</div>
                    <div class="time">{{item.created_at}}
                        <template v-if="item.status == 1">
                            <span class="send">已发送</span>
                        </template>
                        <template v-else>
                            <span class="no_send">未发送</span>
                        </template>
                    </div>
                    <div class="caozuo cr">
                        <template v-if="item.status == 1">
                            <router-link tag=div :to="'/capital/show/'+item.id" class="btn edit">查看详情</router-link>
                            <router-link tag=div :to="'/capital/sendhistory/'+item.id+'?title='+item.title" class="btn history">发送记录</router-link>
                        </template>
                        <template v-else>
                            <router-link tag=div :to="'/capital/edit/'+item.id" class="btn edit">继续编辑</router-link>
                        </template>
                        <div class="btn delete" @click="deleteConf(item.id)">删除</div>
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
				});
                this.axios.post('/asset/index',data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data || [];
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
            padding: 5px 15px 18px 0;
            color: #333;
            .title{
                line-height: 44px;
                font-size: 16px;
            }
            .time{
                font-size: 14px;
                color: #666;
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
        .caozuo{
            padding-top: 20px;
            .btn{
                float: right;
                background-color: #ddd;
                border-radius: 4px;
                margin-left: 10px;
                padding: 5px 10px;
                font-size: 14px;
                color: #fff;
                &.delete{
                    background-color: #FF6A6A;
                }
                &.history{
                    background-color: #5CACEE;
                }
                &.edit{
                    background-color: #00C5CD;
                }
            }
        }
    }
</style>