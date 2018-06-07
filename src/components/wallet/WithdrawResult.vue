<template>
    <div class="body_cunqu">
        <div class="result">
            <div class="success bor_b">
                <img src="/public/img/wallet/success_icon.png" alt="">
                <p>提现申请成功，等待财务处理</p>
                <div class="msg">预计周三到账</div>
            </div>
            <div class="info">
                <div class="list flex_align">
                    <div class="left flex_1">提现金额</div>
                    <div class="right">￥1000</div>
                </div>
                <div class="list flex_align">
                    <div class="left flex_1">提现方式</div>
                    <div class="right">中国建设银行储蓄卡(1100)</div>
                </div>
            </div>
            <div class="com_btn"><div class="btn">完成</div></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:'常见问题'
        }
    }
}
</script>
