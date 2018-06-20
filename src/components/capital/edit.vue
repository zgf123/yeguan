<template>
    <div>
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">{{resdata.customer_real_name}}的资产配置报告</div>
            <div slot="search" class="baocuo" v-if="Number(resdata.is_buy)"><span>报错</span></div>
        </component>
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
                <div class="item bor_b" v-for="(item,index) in resdata.insurance.products" :key="item.id">
                    <!-- 搜索 -->
                    <div class="title product_name_search">
                        <input type="text" placeholder="请输入产品标题" v-model="item.product_name" v-on:input ="searchProduct('insurance', index)">
                        <div class="search_result" v-show="productData.length && index==productIndex && productStr=='insurance'">
                            <ul>
                                <li class="bor_b" v-for="(v,i) in productData" :key="i" @click="selectProduct('insurance', index,v.product_name,v.product_point)">{{v.product_name}}</li>
                            </ul>
                            <div class="close" @click="productData = []">关闭</div>
                        </div>
                    </div>

                    <div class="text">
                        <textarea placeholder="请输入产品描述" v-model="item.suggest"></textarea>
                    </div>
                    <div class="btns cr">
                        <div class="btn fl_l delete" @click="deleteProduct('insurance',index)" v-if="onoff.showDelete">删除</div>
                        <div class="btn fl_r use" v-if="onoff.showAddClass == 'insurance' && index == resdata.insurance.products.length-1" @click="addProduct()">新增</div>
                    </div>
                </div>

                <div class="item bor_b" v-for="(item,index) in resdata.fixed.products" :key="item.id">
                    <!-- 搜索 -->
                    <div class="title product_name_search">
                        <input type="text" placeholder="请输入产品标题" v-model="item.product_name" v-on:input ="searchProduct('fixed', index)">
                        <div class="search_result" v-show="productData.length && index==productIndex && productStr=='fixed'">
                            <ul>
                                <li class="bor_b" v-for="(v,i) in productData" :key="i" @click="selectProduct('fixed', index,v.product_name,v.product_point)">{{v.product_name}}</li>
                            </ul>
                            <div class="close" @click="productData = []">关闭</div>
                        </div>
                    </div>
                    
                    <div class="text">
                        <textarea placeholder="请输入产品描述" v-model="item.suggest"></textarea>
                    </div>
                    <div class="btns cr">
                        <div class="btn fl_l delete" @click="deleteProduct('fixed',index)" v-if="onoff.showDelete">删除</div>
                        <div class="btn fl_r use" v-if="onoff.showAddClass == 'fixed' && index == resdata.fixed.products.length-1" @click="addProduct()">新增</div>
                    </div>
                </div>

                <div class="item bor_b" v-for="(item,index) in resdata.stock.products" :key="item.id">
                    <!-- 搜索 -->
                    <div class="title product_name_search">
                        <input type="text" placeholder="请输入产品标题" v-model="item.product_name" v-on:input ="searchProduct('stock', index)">
                        <div class="search_result" v-show="productData.length && index==productIndex && productStr=='stock'">
                            <ul>
                                <li class="bor_b" v-for="(v,i) in productData" :key="i" @click="selectProduct('stock', index,v.product_name, v.product_point)">{{v.product_name}}</li>
                            </ul>
                            <div class="close" @click="productData = []">关闭</div>
                        </div>
                    </div>
                    
                    <div class="text">
                        <textarea placeholder="请输入产品描述" v-model="item.suggest"></textarea>
                    </div>
                    <div class="btns cr">
                        <div class="btn fl_l delete" @click="deleteProduct('stock',index)" v-if="onoff.showDelete">删除</div>
                        <div class="btn fl_r use" v-if="onoff.showAddClass == 'stock' && index == resdata.stock.products.length-1" @click="addProduct()">新增</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="savebtn cr">
            <div class="btn save" @click="submit()">保存并预览</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                switch:true,    //提交按钮开关
                suggest_show:false, //未进行风险评测不显示投资建议
                onoff:{
                    showDelete:true, //是否显示产品删除按钮
                    showAddClass: 'stock',//是否显示产品添加按钮
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
                        _this.resdata.stock = {products : res.data.data.products};
                        _this.resdata.fixed = {products : []};
                        _this.resdata.insurance = {products : []};

                        _this.btnShow();
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            addProduct(){
                this.resdata.stock.products.push({
                    product_name:'',
                    suggest:''
                });
                this.btnShow();//显示相关按钮
            },
            //提示产品名字
            searchProduct(str, index){
                let _this = this;
                _this.productIndex = index;
                _this.productStr = str;

                
                var data = {
                    token:localStorage.token,
                    product_name:_this.resdata[str].products[index].product_name
                }
                data = this.qs.stringify(data);
                this.axios.post('/asset/getproduct',data).then(function(res){
                    if(res.data.code == 1){
                        _this.productData = res.data.data || [];
                    }
                });
            },
            selectProduct(str, index, product_name, product_point){
                this.resdata[str].products[index].product_name = product_name;
                this.resdata[str].products[index].suggest = product_point;
                this.productData = [];
            },
            //删除产品
            deleteProduct(item, index){
                let _this = this;
                layer.open({
                    content:'确定要删除该产品吗？',
                    btn:['确定','取消'],
                    yes:function(){
                        layer.closeAll();
                        _this.resdata[item].products.splice(index, 1);
                        _this.btnShow();//显示相关按钮
                    }
                });
            },
            //添加删除按钮显示开关
            btnShow(){
                let _this = this,
                    stock = _this.resdata.stock.products.length || 0,
                    fixed = _this.resdata.fixed.products.length || 0,
                    insurance = _this.resdata.insurance.products.length || 0;
                _this.onoff.showDelete = stock+fixed+insurance-1;
                
                switch(true){
                    case stock != 0 :
                    _this.onoff.showAddClass = 'stock';
                    break;

                    case fixed != 0 :
                    _this.onoff.showAddClass = 'fixed';
                    break;

                    case insurance != 0 :
                    _this.onoff.showAddClass = 'insurance';
                    break;

                    default:
                    _this.onoff.showAddClass = 'stock';
                }
            },
            submit(){
                let _this = this;

                let arr = [].concat(_this.resdata.insurance.products, _this.resdata.fixed.products, _this.resdata.stock.products);
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

                //把数据整理成提交格式
                _this.resdata.products = _this.resdata.stock.products;

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
                        
                        setTimeout(()=>{
                            _this.$router.push({
                                path:'/capital/'+_this.$route.params.id+'/detail/'+(res.data.data || _this.$route.params.assetid)
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