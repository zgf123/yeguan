<template>
    <div class="body_blankcard">
        <router-link tag="div" class="add_bank" :to="'/wallet/addcard'"></router-link>
        <div class="no_bank_card hide">
            <img src="/public/img/wallet/no_bank_card.png" alt="">
            <p>一张卡都没有呢</p>
        </div>
        <div class="bank_card_box">
            <ul>
                <li>
                    <h1>建设银行</h1>
                    <h2>储蓄卡</h2>
                    <p><span>**** **** ****</span> 1100</p>
                </li>
                <li>
                    <h1>建设银行</h1>
                    <h2>储蓄卡</h2>
                    <p><span>**** **** ****</span> 1100</p>
                </li>
                <li>
                    <h1>建设银行</h1>
                    <h2>储蓄卡</h2>
                    <p><span>**** **** ****</span> 1100</p>
                </li>
                <li>
                    <h1>建设银行</h1>
                    <h2>储蓄卡</h2>
                    <p><span>**** **** ****</span> 1100</p>
                </li>
                <li>
                    <h1>建设银行</h1>
                    <h2>储蓄卡</h2>
                    <p><span>**** **** ****</span> 1100</p>
                </li>
            </ul>
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

