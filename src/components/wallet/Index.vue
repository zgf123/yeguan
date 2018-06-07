<template>
    <div class="body_index">
        <div class="banner">
            <div class="header">
                <div class="back"></div>
                <span>我的钱包</span>
            </div>
            <div class="content">
                <div class="title">我的总资产(元)</div>
                <h1>3000200</h1>
                <div class="box cr">
                    <div class="left fl_l">
                        <h2><span class="b">10</span>万元</h2>
                        <p>审核中</p>
                    </div>
                    <div class="right fl_r">
                        <h2><span class="b">2000</span>元</h2>
                        <p>收入</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="itembox">
            <ul>
                <router-link :to="'/wallet/account'" tag="li" class="flex_align">
                    <div class="left"><img src="/public/img/wallet/zhangdan.png" alt=""></div>
                    <div class="center flex_1">账单明细</div>
                    <div class="right"><div class="img"><img src="/public/img/wallet/arrow.png" alt=""></div></div>
                </router-link>
                <router-link :to="'/wallet/blankcard'" tag="li" class="flex_align">
                    <div class="left"><img src="/public/img/wallet/bank.png" alt=""></div>
                    <div class="center flex_1">我的银行卡</div>
                    <div class="right"><div class="img"><img src="/public/img/wallet/arrow.png" alt=""></div></div>
                </router-link>
            </ul>
        </div>
        <div class="btns bor_t cr">
            <div class="btn">提现</div>
            <div class="btn on">充值</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg:'aaa1'
        }
    }
}
</script>
