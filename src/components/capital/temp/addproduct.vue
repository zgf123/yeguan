<template>
    <div class="addproduct_page hide">
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题自定义标题</div>
            <div slot="back" class="nav_back btn_active" @click="navBack"></div>
            <router-link slot="search" tag="div" class="zengjia" :to="''">保存</router-link>
        </component>
        <div class="container Page">
            <div class="types bor_b">
                <ul class="flex flex_align">
                    <li class="flex_1"><span class="on"><img src="/public/img/icon_duihao.png" alt=""></span>股权类</li>
                    <li class="flex_1"><span><img src="/public/img/icon_duihao.png" alt=""></span>固收类</li>
                    <li class="flex_1"><span><img src="/public/img/icon_duihao.png" alt=""></span>保险类</li>
                </ul>
            </div>
            <div class="form">
                <div><input type="text" placeholder="请输入产品标题"></div>
                <div><textarea placeholder="请输入推荐建议"></textarea></div>
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
                    id : "1",
                    product_id : "772",
                    product_name : "优渥小思",
                    suggest : "测试建议"
                }
            }
        },
        mounted(){
            // this.fetchData();
            this.typeActive();
        },
        methods:{
            fetchData(){
                let _this = this;
				var data = this.qs.stringify({
                    token:localStorage.token,
                    asset_product_id:_this.$route.params.id
				});
                this.axios.post('/asset/productdetail',data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            navBack(){
                $('.addproduct_page').hide();
            },
            typeActive(){
                $('.types li').click(function(){
                    $('.types li span').removeClass('on');
                    $(this).find('span').addClass('on');
                    let index = $(this).index();
                    console.log(index);
                })
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
</style>