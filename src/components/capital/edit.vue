<template>
    <div class="editContainer">
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">{{resdata.customer_real_name}}的资产配置报告</div>
            <div slot="search" class="baocuo" v-if="Number(resdata.is_buy)"><span>报错</span></div>
        </component>
        <div class="Page thiscontent adr_input_box adr_input_show" style="top:0;" :style="'transform:translate3d('+ (isSelectFoundShow-1)*10 +'rem,0,0);'">
            <div class="container Page" v-if="resdata">
                <ul class="product cr" v-if="suggest_show">
                    <li class="suggest">
                        <div class="title">投资建议：</div>
                        <div class="text">
                            <div class="textarea">{{resdata.suggest}}</div>
                            <textarea v-model="resdata.suggest" placeholder="请输入投资建议"></textarea>
                        </div>
                    </li>
                </ul>
                <div class="confdetail">
                    <h1><span>产品推荐</span></h1>
                    <div class="item bor_b" v-for="(item,index) in resdata.products" :key="item.id">
                        <div class="title product_name_search">
                            <div class="show_product_list"><span @click="showSelectFound(index)">选择产品</span></div>
                            <input type="text" placeholder="请输入产品标题" v-model="item.product_name">
                        </div>

                        <div class="text">
                            <textarea placeholder="请输入产品描述" v-model="item.suggest"></textarea>
                        </div>
                        <div class="btns cr">
                            <div class="btn fl_l delete" @click="deleteProduct(index)" v-if="resdata.products.length > 1">删除</div>
                            <div class="btn fl_r use" v-if="index == resdata.products.length-1" @click="addProduct()">新增</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="savebtn cr">
                <div class="btn save" @click="submit()">保存并预览</div>
            </div>
        </div>

        <!-- 选择基金项目 -->
        <component :is="'Products'" @selectProductEmit="selectProductFn" :style="'transform:translate3d('+ (isSelectFoundShow*10) +'rem,0,0);'"></component>
    </div>
</template>

<script>
    import Products from './temp/products.vue'
    export default {
        name:'rules',
        data(){
            return {
                switch:true,    //提交按钮开关
                suggest_show:false, //未进行风险评测不显示投资建议
                isSelectFoundShow:1, //滑动显示隐藏产品列表
                product_index:0, //正在修改的产品位置
                onoff:{

                },
                resdata:'', //核心数据
                productData:[],//提示产品名字
                productIndex:-1, //控制显示相应的产品提示悬浮框
                productStr:'', //控制显示相应的产品提示悬浮框
            }
        },
        computed:{
            isEdit(){
                if( this.$route.path.indexOf('/add') == -1 ){
                    return true;
                }else{
                    return false;
                }
            }
        },
        components:{
            Products
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                let _this = this,
                    url = '',
                    data = '';
                //判断编辑页面
                if(this.$route.params.assetid){
                    url = '/asset/detail';
                    data = {
                        token:localStorage.token,
                        asset_id: _this.$route.params.assetid
                    }
                }else{
                    url = '/asset/create';
                    data = {
                        token:localStorage.token,
                        customer_id: _this.$route.params.id
                    }
                }
                data = this.qs.stringify(data);
                //获取数据
                this.axios.post(url, data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                        if(_this.resdata.suggest){   //未进行风险评测不显示投资建议
                            _this.suggest_show = true;
                        }
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            addProduct(){
                this.resdata.products.push({
                    product_name:'',
                    suggest:''
                });
            },
            //删除产品
            deleteProduct(index){
                let _this = this;
                layer.open({
                    content:'确定要删除该产品吗？',
                    btn:['确定','取消'],
                    yes:function(){
                        layer.closeAll();
                        _this.resdata.products.splice(index, 1);
                    }
                });
            },
            //产品选择
            selectProductFn(pro){
                this.isSelectFoundShow = 1;
                if(!pro) return false;
                this.resdata.products[this.product_index].product_name = pro.product_name;
                this.resdata.products[this.product_index].suggest = pro.product_point;
            },
            showSelectFound(index){
                this.isSelectFoundShow = 0;
                this.product_index = index;
            },
            submit(){
                let _this = this;

                let arr = _this.resdata.products;
                for(var i = 0; i<arr.length; i++){
                    if(arr[i].product_name == ''){
                        _this.$store.commit('msg', '请输入产品名称');
                        return false;
                    }else if(arr[i].suggest == ''){
                        _this.$store.commit('msg', '请输入产品描述');
                        return false;
                    }
                }
                if(!_this.switch) return false;
                _this.switch = false;

                //提交表单
                let url = '',data = '';
                
				if(this.$route.params.assetid){
                    url = '/asset/update';
                    data = {
                        token:localStorage.token,
                        asset_id: _this.$route.params.assetid,
                        data: _this.resdata
                    }
                }else{
                    url = '/asset/store';
                    data = {
                        token: localStorage.token,
                        data: _this.resdata
                    }
                }
                data = this.qs.stringify(data);
                this.axios.post(url, data).then(function(res){
                    // _this.switch = true;
                    if(res.data.code == 1){
                        _this.$store.commit('msg','保存成功');
                        
                        var push_asset_id = '';
                        if(res.data.data){
                            push_asset_id = res.data.data;
                            if(res.data.data.length == 0){
                                push_asset_id = _this.$route.params.assetid;
                            }
                        }else{
                            push_asset_id = _this.$route.params.assetid;
                        }

                        setTimeout(()=>{
                            _this.$router.push({
                                path:'/capital/'+_this.$route.params.id+'/detail/'+push_asset_id
                            });
                        },1500);
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .editContainer{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        top:0;
        left:0;
    }
    .thiscontent{
        background-color: #fff;
        transition: .3s;
    }
    .show_product_list{
        text-align: right;
        padding-bottom: 10px;
        span{
            padding:6px 12px;
            background-color: #5CACEE;
            color: #fff;
            font-size: 14px;
            border-radius: 3px;
        }
    }
    .baocuo{
        position: absolute;
        top:0;
        right: 0;
        height: 48px;
        padding:0 5px;
        span{
            border:1px solid #fff;
            padding: 4px 5px;
            margin:0 5px;
            font-weight: normal;
            font-size: 14px;
            border-radius: 3px;
        }
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
                position: relative;
                .textarea{
                    width: 100%;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    font-size: 15px;
                    color: #666;
                    line-height: 1.4;
                    min-height: 100px;
                    overflow: hidden;
                }
                textarea{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left:0;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    font-size: 15px;
                    line-height: 1.4;
                    color: #666;
                }
            }
        }
    }
    .confdetail{
        padding: 0 15px;
        padding-top: 20px;
        padding-bottom: 100px;
        h1{
            font-size: 17px;
            font-weight: normal;
            text-align: center;
            padding-bottom: 8px;
            span{
                padding-bottom: 4px;
                border-bottom: 2px solid #FF6666;
            }
        }
        .item{
            padding: 15px 0 20px;
            .title{
                margin-top: 20px;
                input{
                    width: 100%;
                    border:1px solid #ddd;
                    font-size: 16px;
                    padding:8px 5px;
                    line-height: 1;
                    color: #333;
                }
            }
            .text{
                padding-bottom: 16px;
                margin-top:10px;
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
        .btns{
            .btn{
                padding: 5px 20px;
                color: #fff;
                font-size: 16px;
                display: inline-block;
                border-radius: 3px;
                &.delete{
                    background-color: #FF6A6A;
                }
                &.use{
                    background-color: #ff8b03;
                }
            }
            &.first{
                text-align: right;
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
            width: 100%;
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
    .product_name_search{
        position: relative;
        .search_result{
            position: absolute;
            top:35px;
            left:0;
            width: 100%;
            height: 200px;
            background-color: #fff;
            border: 1px solid #ddd;
            overflow: hidden;
            z-index: 99;
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