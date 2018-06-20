<template>
    <div class="body_cunqu">
        <div class="result">
            <div class="success bor_b">
                <img src="/public/img/wallet/success_icon.png" alt="">
                <p>充值成功</p>
            </div>
            <div class="info">
                <div class="list flex_align">
                    <div class="left flex_1">充值金额</div>
                    <div class="right">￥{{$route.query.money}}</div>
                </div>
                <div class="list flex_align">
                    <div class="left flex_1">充值项目</div>
                    <div class="right">周周宝</div>
                </div>
            </div>
            <router-link tag="div" :to="'/wallet'" class="com_btn"><div class="btn">完成</div></router-link>
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
