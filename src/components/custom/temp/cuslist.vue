<template>
    <div class="cus_list Page">
        <div v-if="cusList ? false : true" class="com_noinfo">
            <p><img src="/src/assets/images/no_info.png" alt=""></p>
        </div>
        <div v-for="(item,index) in cusList" :key="index" class="cus_row flex_align">
            <router-link tag="div" class="name flex_1 lyui_tap_active" :to="'/custom/detail/'+item.cid +'?is_vip='+item.is_vip">
                {{item.name}}<br>
                <span class="green" v-show="item.is_club">财富会</span>
            </router-link>

            <router-link tag="div" class="more on lyui_tap_active" :to="'/capital/'+item.cid" v-if="item.is_club">
                <div class="img"></div>
                <p>资产报告</p>
            </router-link>
            
            <template v-if="item.mobile == ''? false : true">
                <a class="phone on lyui_tap_active" :href="'tel:'+item.mobile" v-show="androidCall">
                    <div class="img"></div>
                    <p>拨号</p>
                </a>
                <a class="phone on lyui_tap_active" v-show="!androidCall" @click="appCall(item.mobile)">
                    <div class="img"></div>
                    <p>拨号</p>
                </a>
            </template>
            <template v-else>
                <a class="phone lyui_tap_active" href="javascript:;">
                    <div class="img"></div>
                    <p>拨号</p>
                </a>
            </template>
            <router-link tag="div" class="more lyui_tap_active" :to="'/order/add/'+item.cid +'?is_vip='+item.is_vip">
                <div class="img"></div>
                <p>录单</p>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'cuslistvip',
        data(){
            return {
                androidCall:true
            }
        },
        mounted(){
            if (cusAndroid) {
                this.androidCall = false;
            }
		},
        props:['cusListProp'],
        computed:{
            cusList(){
                return this.cusListProp;
            }
        },
		methods:{
            appCall(number){
                window.android.call(number);
            }
		}
    }
</script>
<style lang="less" scoped="scoped">
    .cus_list{
        bottom: 0;
        top:0;
    }
    .cus_row{
        background-color: #fff;
        min-height: 90px;
        padding-right: 15px;
        position: relative;
        &:after{
            content: "";
            position: absolute;
            left: 15px;
            right:0;
            height: 1px;
            bottom: 0;
            border-bottom: 1px solid #eee;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
        .pic{
            background-color: #e9e9e9;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .name{
            font-size:17px;
            color: #333;
            padding: 13px 15px;
            span{
                font-size: 12px;
                color: #ffa800;
                padding: 3px 6px;
                background-color: #fff0d3;
                border-radius: 4px;
                margin-right: 5px; 
                margin-top: 6px;
                display: inline-block;
                &.green{
                    color: #e24d45;
                    background-color: #ffd9cc;
                }
            }
        }
        .phone,.more{
            width: 65px;
            height: 88px;
            padding: 15px 0 0;
            display: block;
        }
        .phone{
            .img{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: url(/public/img/phone_icon.png) center center no-repeat;
                background-size: 20px 20px;
                background-color: #b5b5b5;
                margin: 0 auto;
                box-shadow: 0 3px 10px rgba(0, 0, 0, .2);
            }
            p{
                font-size: 14px;
                color: #b5b5b5;
                text-align: center;
                margin-top: 8px;
            }
            &.on{
                .img{
                    background-color: #ffa800;
                    box-shadow: 0 3px 10px rgba(255, 168, 0, .5);
                }
                p{
                    color: #ffa800;
                }
            }
        }
        .more{
            .img{
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: url(/public/img/ludan_icon.png) center center no-repeat;
                background-size: 20px 20px;
                background-color: #ffa800;
                margin: 0 auto;
                box-shadow: 0 3px 10px rgba(255, 168, 0, .5);
            }
            p{
                font-size: 14px;
                color: #ffa800;
                text-align: center;
                margin-top: 8px;
            }
        }
    }
</style>