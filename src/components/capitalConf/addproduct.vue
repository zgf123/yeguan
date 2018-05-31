<template>
    <div>
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">{{product_id?'编辑产品配置':'添加产品配置'}}</div>
            <div slot="back" class="nav_back btn_active" @click="navBack"></div>
            <div slot="search" class="zengjia" @click="submitData">保存</div>
        </component>
        <div class="container Page">
            <div class="types bor_b">
                <ul class="flex flex_align">
                    <li class="flex_1"><span :class="data.type=='stoke' ? 'on' : ''"><img src="/public/img/icon_duihao.png" alt=""></span>股权类</li>
                    <li class="flex_1"><span :class="data.type=='fixed' ? 'on' : ''"><img src="/public/img/icon_duihao.png" alt=""></span>固收类</li>
                    <li class="flex_1"><span :class="data.type=='insurance' ? 'on' : ''"><img src="/public/img/icon_duihao.png" alt=""></span>保险类</li>
                </ul>
            </div>
            <div class="form">
                <div class="product_name">
                    <input type="text" placeholder="请输入产品标题" v-model="data.product_name" v-on:input ="searchProduct">
                    <div class="result hide">
                        <ul>
                            <li class="bor_b" v-for="(item,index) in productData" :key="index" @click="selectProduct(item.product_id, item.product_name)">{{item.product_name}}</li>
                        </ul>
                        <div class="close" @click="searchClose">关闭</div>
                    </div>
                </div>
                <div><textarea placeholder="请输入推荐建议" v-model="data.suggest"></textarea></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                id:null,
                product_id:'',
                data:{
                    product_name:'',
                    product_id:'',
                    suggest:'',
                    type:'stock'
                },
                productData:[]
            }
        },
        mounted(){
            this.id = this.$route.params.id;
            this.product_id = this.$route.query.product_id;
            this.typeActive();
            if(this.product_id){
                this.fetchData();
            }

            //调整悬浮框高度
            var height = $('.container').height();
            $('.result').height((height-150)*0.88);
        },
        methods:{
            fetchData(){
                let _this = this;
                var data = {
                    token:localStorage.token,
                    asset_product_id:_this.product_id
                }

				data = this.qs.stringify(data);
                this.axios.post('/asset/productdetail',data).then(function(res){
                    if(res.data.code == 1){
                        _this.data = $.extend({},res.data.data);
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            submitData(){
                let _this = this, url='';
                var data = {
                    token:localStorage.token,
                    product_id:_this.data.product_id,
                    product_name:_this.data.product_name,
                    suggest:_this.data.suggest,
                    type:_this.data.type
                }
                //判断是新增还是编辑
                if(_this.product_id){
                    $.extend(data,{asset_product_id:_this.product_id});
                    url = '/asset/saveproduct';
                }else{
                    url = '/asset/addproduct';
                    $.extend(data,{asset_id:_this.id});
                }
                
                //验证
                if(data.product_name == ''){
                    _this.$store.commit('msg','请输入产品标题');
                    return false;
                }else if(data.suggest == ''){
                    _this.$store.commit('msg','请输入推荐建议');
                    return false;
                }

				data = this.qs.stringify(data);
                this.axios.post(url,data).then(function(res){
                    if(res.data.code == 1){
                        _this.$store.commit('msg','保存成功');
                        setTimeout(function(){
                            _this.$router.push({
                                path:'/capital/edit/'+_this.id
                            });
                        },1500);
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            navBack(){
                let _this = this;
                _this.$router.push({
                    path:'/capital/edit/'+_this.id
                });
            },
            typeActive(){
                let _this = this;
                $('.types li').click(function(){
                    $('.types li span').removeClass('on');
                    $(this).find('span').addClass('on');
                    let index = $(this).index();
                    switch(index){
                        case 0:
                        _this.data.type = 'stock';
                        return false;
                        case 1:
                        _this.data.type = 'fixed';
                        return false;
                        case 2:
                        _this.data.type = 'insurance';
                        return false;
                    }
                })
            },
            //搜索产品
            searchProduct(){
                let _this = this;
                if(_this.productData.length>0){
                    $('.result').show();
                }else{
                    $('.result').hide();
                }
                var data = {
                    token:localStorage.token,
                    product_name:this.data.product_name
                }
                data = this.qs.stringify(data);
                this.axios.post('/asset/getproduct',data).then(function(res){
                    if(res.data.code == 1){
                        _this.productData = res.data.data || [];
                    }
                });
            },
            searchClose(){
                $('.result').hide();
            },
            selectProduct(product_id,product_name){
                this.data.product_name = product_name;
                this.data.product_id = product_id;
                $('.result').hide();
            }
        }
    }
</script>

<style lang="less" scoped>
    .addproduct_page{
        position:fixed;
        top:0;
        width:100%;
        height:100%;
        z-index:9999;
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
    .types{
        padding:0 15px;
        ul{
            li{
                text-align: center;
                line-height: 50px;
                padding-right: 20px;
                span{
                    margin-right: 5px;
                    img{
                        width: 22px;
                        height: 22px;
                        display: inline-block;
                        opacity: 0;
                    }
                    &.on{
                        img{
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
    .form{
        padding:15px 20px;
        input{
            width: 100%;
            border:1px solid #ddd;
            height: 40px;
            padding: 8px;
            font-size: 15px;
            color: #333;
        }
        textarea{
            width: 100%;
            height: 200px;
            line-height: 1.6;
            border:1px solid #ddd;
            padding: 8px;
            font-size: 15px;
            color: #333;
            margin-top:10px;
        }
    }
    .product_name{
        position: relative;
        .result{
            position: absolute;
            top:42px;
            left:0;
            width: 100%;
            background-color: #fff;
            border: 1px solid #ddd;
            overflow: hidden;
            padding-bottom: 30px;
            ul{
                position: absolute;
                top:0;
                left:0;
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                padding-bottom: 30px;
            }
            li{
                padding: 10px 5px;
                font-size: 14px;
            }
            .close{
                text-align: center;
                background-color: #f2f2f2;
                font-size: 14px;
                line-height: 30px;
                border-top: 1px solid #eee;
                position: absolute;
                bottom: 0;
                left:0;
                width:100%;
                color: #999;
            }
        }
    }
</style>