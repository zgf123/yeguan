<template>
    <div class="products">
        <div class="searchbox flex_align">
            <div class="search flex_1"><input type="text" v-model="keyword" placeholder="请输入理财产品名称或类型"></div>
            <div class="btn" @click="select()">取消</div>
        </div>
        <div class="itembox">
            <div class="found_row flex_align lyui_tap_active" v-for="item in searchData" :key="item.product_id" @click="select(item)">
                <div class="flex_1 text_o">{{item.product_name}}</div>
                <!-- <div class="right">
                    <span class="guquan" v-if="item.fund_type == '股权'">{{item.fund_type}}</span>
                    <span class="gushou" v-else-if="item.fund_type == '固收'">{{item.fund_type}}</span>
                </div> -->
            </div>
        </div>
     </div>
</template>
<script>
    export default{
        data(){
            return {
                resdata:[],
                keyword:''
            }
        },
        computed:{
            searchData(){
                let _this = this,
                    list = this.resdata,
                    newList = [];
                list.forEach((c,i) => {
                    if(c.product_name.indexOf(_this.keyword) != -1){
                        newList.push(c);
                    }
                });
                return newList;
            }
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                var _this = this;
                let data = this.qs.stringify({
                    token: localStorage.token,
                    product_name:''
                });
                this.axios.post('/asset/getproduct', data).then(function(res){
                    if(res.data.code == 1){
                        this.resdata = res.data.data;
                    }
                }.bind(this));
            },
            select(product){
                this.keyword = '';
                this.$emit('selectProductEmit',product);
            }
        }
    }
</script>
<style lang="less" scoped>
    .products{
        position: absolute;
        top:48px;
        left: 0;
        right: 0;
        bottom:0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #f4f4f4;
        z-index: 999;
        transition: .3s;
    }
    .searchbox{
        height: 50px;
        background-color: #f4f4f4;
        padding:0 0 0 10px;
        .search{
            input{
                height: 36px;
                width: 100%;
                border-radius: 18px;
                padding:0 18px 0 30px;
                font-size: 16px;
                color: #666;
                line-height: 18px;
                background: #fff url('/public/img/search_icon.png') no-repeat 10px center;
                background-size: 15px;
            }
        }
        .btn{
            padding:0 10px;
            font-size: 16px;
            color: #ff8b03;
            line-height: 40px;
        }
    }
    .itembox{
        position: absolute;
        left: 0;
        top:50px;
        width: 100%;
        bottom:0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #fff;
    }
    .found_row{
        height: 50px;
        position: relative;
        padding: 0 15px;
        font-size: 17px;
        color: #323232;
        .right{
            padding-left:20px;
            span{
                font-size: 12px;
                padding:4px 5px;
                border-radius: 3px;
                &.guquan{
                    background-color: #fff0d3;
                    color: #ffa800;
                }
                &.gushou{
                    background-color: #e4dfff;
                    color: #9d8df0;
                }
            }
        }
        &:after{
            content: "";
            position: absolute;
            left: 15px;
            right: 0;
            height: 1px;
            bottom: 0;
            border-bottom: 1px solid #ddd;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
    }
</style>
