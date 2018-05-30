<template>
    <div>
        <component :is="'Header'">
            <!-- <div slot="title" class="com_title text_o">自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题</div> -->
            <div class="zengjia" slot="search" @click="addProduct">添加产品</div>
        </component>
        <div class="container Page">
            <ul class="product cr">
                <li class="flex flex_align">
                    <div style="text-indent:1em;">标题：</div>
                    <div class="flex_1"><input type="text" placeholder="请输入配置报告标题" v-model="resdata.title"></div>
                </li>
                <li class="flex flex_align">
                    <div>股权类：</div>
                    <div class="flex_1 ipt"><input type="tel" placeholder="请输入配置比例" maxlength="3" v-model="resdata.stock_fund_percent">&nbsp;%</div>
                </li>
                <li class="flex flex_align">
                    <div>保险类：</div>
                    <div class="flex_1 ipt"><input type="tel" placeholder="请输入配置比例" maxlength="3" v-model="resdata.insurance_fund_percent">&nbsp;%</div>
                </li>
                <li class="flex flex_align">
                    <div>固守类：</div>
                    <div class="flex_1 ipt"><input type="tel" placeholder="请输入配置比例" maxlength="3" v-model="resdata.fixed_fund_percent">&nbsp;%</div>
                </li>
            </ul>
            <div class="confdetail">
                <h1><span>资产配置详情</span></h1>
                <p class="noinfo" v-if="!resdata.products.stock.length && !resdata.products.fixed.length && !resdata.products.insurance.length">暂无资产配置详情</p>
                <div class="item" v-if="resdata.products.stock.length || 0">
                    <h2>股权类产品：</h2>
                    <ul>
                        <li v-for="(item,index) in resdata.products.stock" :key="index">
                            <h3>{{item.product_name}}</h3>
                            <p>{{item.suggest}}</p>
                            <div class="btns cr">
                                <div class="btn" @click="deleteProduct(item.product_id)">删除</div>
                                <router-link class="btn" :to="'/capital/addproduct/'+params_id+'?product_id='+item.product_id">重新编辑</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="item" v-if="resdata.products.fixed.length || 0">
                    <h2>固收类产品：</h2>
                    <ul>
                        <li v-for="(item,index) in resdata.products.fixed" :key="index">
                            <h3>{{item.product_name}}</h3>
                            <p>{{item.suggest}}</p>
                            <div class="btns cr">
                                <div class="btn" @click="deleteProduct(item.product_id)">删除</div>
                                <div class="btn">重新编辑</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="item" v-if="resdata.products.insurance.length || 0">
                    <h2>保险类产品：</h2>
                    <ul>
                        <li v-for="(item,index) in resdata.products.insurance" :key="index">
                            <h3>{{item.product_name}}</h3>
                            <p>{{item.suggest}}</p>
                            <div class="btns cr">
                                <div class="btn" @click="deleteProduct(item.product_id)">删除</div>
                                <div class="btn">重新编辑</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="confdetail">
                <h1><span>资产配置详情</span></h1>
                <div class="item">
                    <h2>股权类产品：</h2>
                    <ul>
                        <li>
                            <h3>明德教育基金劣后级</h3>
                            <p>这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍。</p>
                            <div class="btns cr">
                                <div class="btn">删除</div>
                                <div class="btn">重新编辑</div>
                            </div>
                        </li>
                        <li>
                            <h3>明德教育基金劣后级</h3>
                            <p>这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍，这里是详情介绍。</p>
                        </li>
                    </ul>
                </div>
            </div> -->
        </div>
        <div class="savebtn cr">
            <div class="btn save" @click="saveAll()">保存</div>
            <div class="btn send" @click="sendClient()">完成，选择发送客户</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                isAdd:false,
                params_id:'',
                resdata:{
                    title:'',
                    stock_fund_percent:'',
                    fixed_fund_percent:'',
                    insurance_fund_percent:'',
                    products:{
                        stock:[],
                        insurance:[],
                        fixed:[]
                    }
                }
            }
        },
        mounted(){
            this.params_id = this.$route.params.id || '';
            if( this.$route.params.id===undefined ){
                this.isAdd = true;
            }else{
                this.isAdd = false;
                this.fetchData();
            }
        },
        methods:{
            fetchData(){
                let _this = this;
				var data = this.qs.stringify({
                    token:'78d475112bd4ba5b359570440b862b94',
                    asset_id:_this.$route.params.id
				});
                this.axios.post('http://manager.yeguan.com/asset/detail',data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                        _this.resdata.products.stock = res.data.data.products.stock || [];
                        _this.resdata.products.insurance = res.data.data.products.insurance || [];
                        _this.resdata.products.fixed = res.data.data.products.fixed || [];
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            addProduct(indexPath){
                let _this = this;
                var url='';
                var data = $.extend({},this.resdata);
                if(this.isAdd){
                    url = 'http://manager.yeguan.com/asset/add';
                }else{
                    url = 'http://manager.yeguan.com/asset/save';
                    data.asset_id = data.id;
                }

                delete data.products;
                //验证
                if(data.title == ''){
                    this.$store.commit('msg', '请输入配置报告标题');
                    return false;
                }
                data.token = '78d475112bd4ba5b359570440b862b94';
                data = this.qs.stringify(data);

                this.axios.post(url,data).then(function(res){
                    if(res.data.code == 1){
                        if(_this.isAdd){
                            var params = res.data.data;
                        }else{
                            var params = _this.$route.params.id;
                        }
                        //跳转到其他页
                        if(indexPath == 'index'){
                            var toPath = '/capital'
                        }else if(indexPath == 'client'){
                            var toPath = '/capital/client/'+params
                        }else{
                            var toPath = '/capital/addproduct/'+params
                        }
                        _this.$router.push({
                            path:toPath
                        });
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            //删除产品
            deleteProduct(product_id){
                let _this = this;
                layer.open({
                    content:'确定要删除该配置吗？',
                    btn:['确定','取消'],
                    yes:function(index){
                        layer.close(index);
                        var data = {
                            token:'78d475112bd4ba5b359570440b862b94',
                            asset_product_id:product_id,
                        }
                        data = _this.qs.stringify(data);

                        _this.axios.post('http://manager.yeguan.com/asset/deleteproduct',data).then(function(res){
                            if(res.data.code == 1){
                                _this.$store.commit('msg','删除成功');
                                _this.fetchData();
                            }else{
                                _this.$store.commit('msg','请求错误，请重试');
                            }
                        });
                    }
                });
            },
            saveAll(){
                this.addProduct('index');
            },
            sendClient(){
                this.addProduct('client');
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
        padding:10px 20px;
        border-bottom: 5px solid #f2f2f2;
        li{
            font-size: 16px;
            line-height: 50px;
            input{
                width: 100%;
                border:1px solid #ddd;
                font-size: 16px;
                padding:8px 5px;
                line-height: 1;
                color: #333;
            }
            .ipt{
                width: 120px;
                input{
                    width: 140px;
                }
            }
        }
    }
    .confdetail{
        padding-top: 20px;
        padding-bottom: 60px;
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
                    }
                    p{
                        line-height: 1.6;
                    }
                    .btns{
                        margin-top: 10px;
                        .btn{
                            width: 44%;
                            float: left;
                            text-align: center;
                            background-color: #FF6A6A;
                            color: #fff;
                            font-size: 16px;
                            line-height: 2;
                            border-radius: 4px;
                            &:last-child{
                                float: right;
                                background-color: #5CACEE;
                            }
                        }
                    }
                }
            }
        }
    }
    .savebtn{
        position: absolute;
        bottom:0;
        z-index: 999;
        background-color: #fff;
        padding: 10px 15px;
        width: 100%;
        text-align: center;
        border-top:1px solid #ddd;
        box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
        .btn{
            width: 48%;
            float: left;
            border-radius: 4px;
            padding: 10px 0;
            font-size: 14px;
            background-color: #ffa043;
            color: #fff;
            &:last-child{
                float: right;
            }
        }
    }
</style>