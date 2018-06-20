<template>
    <div class="body_fab">
        <div class="questionbox">
            <p v-if="!questions.length" style="color:#999;font-size:14px;text-align:center;margin-top: 20px;">暂无消息</p>
            <ul>
                <router-link tag="li" :to="'/wallet/answer/'+item.id" class="flex_align bor_b" v-for="item in questions" :key="item.id">
                    <div class="flex_1">{{item.title}}</div>
                    <div><img src="/public/img/wallet/arrow_right.png" alt=""></div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import Questions from './questions.js'
export default {
    data(){
        return{
            questions:Questions,
        }
    },
    mounted(){
        
    }
}
</script>

