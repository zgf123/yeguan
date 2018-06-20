<template>
    <div class="body_fab">
        <div class="answerbox">
            <div class="title bor_b">{{item.title}}</div>
            <div class="content" v-html="item.con"></div>
        </div>
    </div>
</template>
<script>
import Questions from './questions.js'
export default {
    data(){
        return{
            questions:Questions,
            item:{}
        }
    },
    mounted(){
        let _this = this;
        this.item = this.questions.map((c,i)=>{
            if(c.id == _this.$route.params.id){
                _this.item = c;
            }
        });
        this.questions.forEach(item => {
            if(item.id == _this.$route.params.id){
                _this.item = item;
            }
        });
    }
}
</script>

