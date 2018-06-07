<template>
    <div>
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">{{resdata.title}}</div>
            <router-link slot="search" tag="div" class="zengjia" :to="'/capital/edit/'+$route.params.id">编辑</router-link>
        </component>
        <div class="container Page">
            <div>
                <ul class="product cr">
                    <li v-if="resdata.stock_fund_percent && resdata.stock_fund_percent!=0">股权类产品：{{Math.round(resdata.stock_fund_percent) || '0'}}%</li>
                    <li v-if="resdata.fixed_fund_percent &&  resdata.fixed_fund_percent!=0">保险类产品：{{Math.round(resdata.fixed_fund_percent) || '0'}}%</li>
                    <li v-if="resdata.insurance_fund_percent &&  resdata.insurance_fund_percent!=0">固守类产品：{{Math.round(resdata.insurance_fund_percent) || '0'}}%</li>
                </ul>
            </div>
            <div class="confdetail">
                <h1><span>资产配置详情</span></h1>
                <p class="noinfo" v-if="!resdata.products.stock.length && !resdata.products.fixed.length && !resdata.products.insurance.length">暂无资产配置详情</p>
                <div class="item" v-if="resdata.products.stock.length || 0">
                    <h2>股权类产品：</h2>
                    <ul>
                        <li v-for="(item,index) in resdata.products.stock" :key="index">
                            <h3>{{item.product_name}}</h3>
                            <p>{{item.suggest}}</p>
                        </li>
                    </ul>
                </div>
                <div class="item" v-if="resdata.products.fixed.length || 0">
                    <h2>固收类产品：</h2>
                    <ul>
                        <li v-for="(item,index) in resdata.products.fixed" :key="index">
                            <h3>{{item.product_name}}</h3>
                            <p>{{item.suggest}}</p>
                        </li>
                    </ul>
                </div>
                <div class="item" v-if="resdata.products.insurance.length || 0">
                    <h2>保险类产品：</h2>
                    <ul>
                        <li v-for="(item,index) in resdata.products.insurance" :key="index">
                            <h3>{{item.product_name}}</h3>
                            <p>{{item.suggest}}</p>
                        </li>
                    </ul>
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
                resdata:{
                    products:{
                        stock:[],
                        insurance:[],
                        fixed:[]
                    }
                }
            }
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                let _this = this;
                let id = _this.$route.params.id;
                if( isNaN(id) ){
                    var url = '/asset/template';
                }else{
                    var url = '/asset/detail';
                }
                
				var data = this.qs.stringify({
                    token:localStorage.token,
                    asset_id:_this.$route.params.id
                });
                this.axios.post(url, data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                        _this.resdata.products.stock = res.data.data.products.stock || [];
                        _this.resdata.products.insurance = res.data.data.products.insurance || [];
                        _this.resdata.products.fixed = res.data.data.products.fixed || [];
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
        padding:15px;
    }
    .container{
        background-color: #fff;
    }
    .zengjia{
        position: absolute;
        top:0;
        right:0;
        line-height: 48px;
        padding-right: 15px;
        padding-left: 20px;
        font-size: 16px;
    }
    .com_title{
        padding:0 50px;
    }
    .product{
        padding:10px 15px;
        border-bottom: 5px solid #f2f2f2;
        li{
            width: 50%;
            float: left;
            font-size: 16px;
            color: #333;
            line-height: 2;
        }
    }
    .confdetail{
        padding-top: 20px;
        h1{
            font-size: 17px;
            font-weight: normal;
            text-align: center;
            span{
                padding-bottom: 4px;
                border-bottom: 2px solid #FF6666;
            }
        }
        .item{
            margin-top: 20px;
            padding:0 0 0 15px;
            border-bottom: 1px solid #ddd;
            &:last-child{
                border-bottom:0;
                padding-bottom: 30px;
            }
            h2{
                color: #333;
                font-size: 16px;
            }
            ul{
                li{
                    color: #666;
                    font-size: 15px;
                    padding:20px 15px 20px 0;
                    position: relative;
                    &::after{
                        content: "";
                        position: absolute;
                        left: 0;
                        width: 100%;
                        height: 1px;
                        bottom: 0;
                        border-bottom: 1px solid #d9d9d9;
                        -webkit-transform-origin: 0 100%;
                        transform-origin: 0 100%;
                        -webkit-transform: scaleY(.5);
                        transform: scaleY(.5)
                    }
                    &:last-child{
                        &::after{
                            border-bottom: 0;
                        }
                    }
                    h3{
                        font-weight: normal;
                        padding-bottom: 10px;
                        font-size: 15px;
                        color: #333;
                    }
                    p{
                        line-height: 1.6;
                    }
                }
            }
        }
    }
</style>