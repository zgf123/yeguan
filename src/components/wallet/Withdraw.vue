<template>
    <div class="body_cunqu">
        <div class="content">
            <div class="card">
                <div class="top flex_align bor_b">
                    <div class="left c_999">提现方式</div>
                    <div class="right flex_1">中国建设银行储蓄卡(1100)</div>
                </div>
                <div class="middle bor_b">
                    <div class="title">提现金额</div>
                    <div class="row flex_align">
                        <div>￥</div>
                        <div class="ipt flex_1"><input type="tel" placeholder="请输入提现金额"></div>
                    </div>
                </div>
                <div class="bottom flex_align">
                    <div class="left flex_1">可提现余额￥1000</div>
                    <div class="right c_light_red">全部提现</div>
                </div>
            </div>
            <div class="notice c_light_red">每周一可提现一次</div>
            <div class="com_btn"><div class="btn">周三到帐,确认提现</div></div>
            <div class="com_btn"><div class="btn off">周三到帐,确认提现</div></div>
        </div>
        <!-- 动画效果 -->
        <transition name="wallet_fade">
            <div class="wallet_dialog" v-show="dialog.mask">
                <div class="mask"></div>
                <div class="table">
                    <div class="td">
                        <transition name="wallet_bounce">
                            <div class="container" v-show="dialog.con">
                                <div class="listcon">
                                    <div class="title">确认银行卡<div class="close" @click="dislogHide"></div></div>
                                    <ul>
                                        <li class="flex_align bor_b">
                                            <div class="left"><img src="/public/img/wallet/jianshe_bank.png" alt=""></div>
                                            <div class="flex_1">中国建设银行卡</div>
                                            <div class="right on"></div>
                                        </li>
                                        <li class="flex_align bor_b">
                                            <div class="left"><img src="/public/img/wallet/jianshe_bank.png" alt=""></div>
                                            <div class="flex_1">中国建设银行卡中国建设银行卡中国建设银行卡中国建设银行卡中国建设银行卡中国建设银行卡中国建设银行卡</div>
                                            <div class="right"></div>
                                        </li>
                                    </ul>
                                    <div class="add_bank flex_align">
                                        <div class="left"><img src="/public/img/wallet/add_bank.png" alt=""></div>
                                        <div class="flex_1">添加银行卡</div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dialog:{
                mask:false,
                con:false,
            }
        }
    },
    mounted(){
        
    },
    methods:{
        //弹窗
        dislogShow(){
            let _this = this;
            _this.dialog.mask = true;
            setTimeout(() => {
                _this.dialog.con = true;
            }, 10);
        },
        dislogHide(){
            let _this = this;
            _this.dialog.con = false;
            setTimeout(() => {
                _this.dialog.mask = false;
            }, 10);
        }
    }
}
</script>
