<template>
    <div class="body_addcard">
        <div class="cardinfo hide">
            <div class="tips">为保证您的资金安全，请绑定账户本人的银行卡为保证您的资金安全，请绑定账户本人的银行卡</div>
            <div class="form">
                <div class="row flex_align bor_b">
                    <div class="label">持卡人</div>
                    <div class="flex_1"><input type="text" value=""></div>
                </div>
                <div class="row flex_align">
                    <div class="label">卡号</div>
                    <div class="flex_1"><input type="tel"></div>
                </div>
            </div>
            <div class="message"><img src="/public/img/wallet/yinhang_icon.png" alt="">中国建设银行储蓄卡（1100）</div>
            <div class="btnbox"><div class="btn">下一步</div></div>
        </div>
        <div class="cardinfo">
            <div class="tips">提醒：此银行卡作为提现卡</div>
            <div class="form on">
                <div class="row flex_align bor_b">
                    <div class="label">持卡人</div>
                    <div class="flex_1"><input type="text" value=""></div>
                </div>
                <div class="row flex_align bor_b">
                    <div class="label">银&nbsp;&nbsp;&nbsp;行</div>
                    <div class="flex_1"><input type="tel"></div>
                </div>
                <div class="row flex_align">
                    <div class="label">卡&nbsp;&nbsp;&nbsp;号</div>
                    <div class="flex_1"><input type="tel"></div>
                </div>
            </div>
            <div class="btnbox"><div class="btn">确认信息</div></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg:'我的银行卡'
        }
    }
}
</script>

