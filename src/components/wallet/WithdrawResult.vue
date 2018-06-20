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
                    <div class="right">￥{{$route.query.money || 0}}</div>
                </div>
                <div class="list flex_align">
                    <div class="left flex_1">提现方式</div>
                    <div class="right">{{$route.query.name}}</div>
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
