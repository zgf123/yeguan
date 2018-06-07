<template>
    <div>
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">{{isEdit?'编辑资产配置报告':'添加资产配置报告'}}</div>
        </component>
        <div class="container Page" v-if="resdata">
            <ul class="product cr">
                <li class="flex flex_align">
                    <div>股权类：</div>
                    <div class="flex_1 ipt"><input type="tel" placeholder="请输入配置比例" maxlength="3" v-model="resdata.stock.percent">&nbsp;%</div>
                </li>
                <li class="flex flex_align">
                    <div>固收类：</div>
                    <div class="flex_1 ipt"><input type="tel" placeholder="请输入配置比例" maxlength="3" v-model="resdata.fixed.percent">&nbsp;%</div>
                </li>
                <li class="flex flex_align">
                    <div>保险类：</div>
                    <div class="flex_1 ipt"><input type="tel" placeholder="请输入配置比例" maxlength="3" v-model="resdata.insurance.percent">&nbsp;%</div>
                </li>
                <li class="suggest">
                    <div class="title">投资建议：</div>
                    <div class="text">
                        <textarea v-model="resdata.suggest" placeholder="请输入投资建议"></textarea>
                    </div>
                </li>
            </ul>
            <div class="confdetail">
                <h1><span>资产配置详情</span></h1>
                <p class="noinfo">暂无资产配置详情</p>
                <div class="item">
                    <h2>股权类产品：</h2>
                    <ul>
                        <li>
                            <h3>标题</h3>
                            <p>文字文字</p>
                            <div class="btns cr">
                                <div class="btn">删除</div>
                                <router-link class="btn" :to="''">重新编辑</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="item">
                    <h2>固收类产品：</h2>
                    <ul>
                        <li>
                            <h3>标题</h3>
                            <p>文字文字</p>
                            <div class="btns cr">
                                <div class="btn">删除</div>
                                <router-link class="btn" :to="''">重新编辑</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="item">
                    <h2>保险类产品：</h2>
                    <ul>
                        <li>
                            <h3>标题</h3>
                            <p>文字文字</p>
                            <div class="btns cr">
                                <div class="btn">删除</div>
                                <router-link class="btn" :to="''">重新编辑</router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="savebtn cr">
            <div class="btn save" style="width:80%;float:none;margin:0 auto;">保存</div>
        </div>
        <div class="savebtn cr">
            <div class="btn save">保存</div>
            <div class="btn send">完成，选择发送客户</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                resdata:''
            }
        },
        computed:{
            isEdit(){
                if( this.$route.path.indexOf('/add') == -1 ){
                    return true;;
                }else{
                    return false;
                }
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
                this.axios.post('/asset/create', data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            addProduct(indexPath){
                
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
                            token:localStorage.token,
                            asset_product_id:product_id,
                        }
                        data = _this.qs.stringify(data);

                        _this.axios.post('/asset/deleteproduct',data).then(function(res){
                            if(res.data.code == 1){
                                _this.$store.commit('msg','删除成功');
                                _this.fetchData();
                            }else{
                                _this.$store.commit('msg','请求错误，请重试');
                            }
                        });
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
        .suggest{
            .text{
                padding-bottom: 16px;
                textarea{
                    width: 100%;
                    height: 110px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    font-size: 15px;
                    color: #666;
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
                        color: #333;
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