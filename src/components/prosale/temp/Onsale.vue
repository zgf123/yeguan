<template>
    <div class="content cus_body">
        <div v-if="saleList.length ? false : true" class="com_noinfo">
            <p><img src="/src/assets/images/no_info.png" alt=""></p>
        </div>
        <router-link tag="div" class="itembox lyui_tap_active" v-for="item in saleList" :key="item.product_id" :to="'/prosale/info/' + item.product_id">
            <div class="sign" v-show="item.status == '募集中' ? false : true">已封闭</div>
            <div class="title">{{item.product_name}}</div>
            <div class="text">{{item.product_point}}</div>
            <div class="progress flex_align">
                <div class="left">募集进度</div>
                <div class="center flex_1">
                    <div class="linebox" v-if="item.collect_percent == '0%'">
                        <div class="line" :style="'max-width:100%;width:60%;'"></div>
                    </div>
                    <div class="linebox" v-else>
                        <div class="line" :style="'max-width:100%;width:' + item.collect_percent"></div>
                    </div>
                </div>
                <div class="right">{{item.collect_percent}}</div>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                saleList:[]
            }
        },
        created(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                var data = this.qs.stringify({
					'token':localStorage.token
				});
                this.axios.post('/product/index',data).then(function(res){
                    if(res.data.code == 1){
                        let resdata = res.data.data;
                        // console.log(resdata[6]);
                        resdata && (this.saleList = resdata);
                    }
                }.bind(this));
            }
        }
    }
</script>
<style scoped="scoped" lang="less">
    .content{
        margin-top:2px;
    }
    .itembox{
        width: 100%;
        background-color: #fff;
        margin-bottom: 10px;
        padding:15px;
        overflow: hidden;
        position: relative;
        .title{
            color: #333;
            font-size: 18px;
            padding-top: 10px;
        }
        .text{
            font-size: 15px;
            color: #aaa;
            margin-top:14px;
        }
    }
    .progress{
        margin-top:18px;
        color: #ff8b03;
        .left{
            font-size: 14px;
            padding-right: 15px;
        }
        .right{
            font-size: 15px;
            padding-left: 14px;
        }
        .center{
            .linebox,.line{
                height: 8px;
                -webkit-border-radius: 4px;
                border-radius: 4px;
            }
            .linebox{
                width: 100%;
                background-color: #ffe8cd;
                overflow: hidden;
            }
            .line{
                background-color: #ff8b03;
            }
        }
    }
    .sign{
        font-size: 13px;
        color: #fff;
        background-color: #cecece;
        text-align: center;
        position: absolute;
        height: 25px;
        line-height: 25px;
        width: 100px;
        right: -30px;
        top: 6px;
        transform: rotate(45deg);
    }
</style>

