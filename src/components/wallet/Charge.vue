<template>
    <div class="body_cunqu">
        <div class="content">
            <div class="card">
                <!-- <div class="top flex_align bor_b">
                    <div class="left">充值项目</div>
                    <div class="right flex_1">周周宝</div>
                </div> -->
                <div class="middle bor_b">
                    <div class="title">充值金额</div>
                    <div class="row flex_align">
                        <div>￥</div>
                        <div class="ipt flex_1"><input type="tel" placeholder="请输入金额" v-model="money"></div>
                    </div>
                </div>
                <div class="bottom">起投：￥10000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;递增：￥1000</div>
            </div>
            <div class="com_btn" v-if="money%1000 == 0 && money>=10000"><div class="btn" @click="submit">确认充值</div></div>
            <div class="com_btn" v-else><div class="btn off">确认充值</div></div>
        </div>
        <!-- 动画效果 -->
        <transition name="wallet_fade">
            <div class="wallet_dialog" v-show="dialog.mask">
                <div class="mask"></div>
                <div class="table">
                    <div class="td">
                        <transition name="wallet_bounce">
                            <div class="container" v-show="dialog.con">
                                <div class="comfirm">
                                    <div class="text">请先向账户转款，然后进行充值</div>
                                    <div class="btns flex_align bor_t">
                                        <div class="btn no_btn flex_1">取消</div>
                                        <div class="btn yes_btn flex_1 bor_l">确认</div>
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
            switch:true,
            dialog:{
                mask:false,
                con:false
            },
            money:''
        }
    },
    mounted(){
        
    },
    methods:{
        submit(){
            let _this = this;

            if(!_this.switch) return false;
            _this.switch = false;

            var data = this.qs.stringify({
                token:localStorage.token,
                money: _this.money
            });
            _this.axios.post(_this.$store.state.walleturl+'/orders/buy',data).then(function(res){
                setTimeout(()=>{
                    _this.switch = true;
                },1500);
                if(res.data.code==1){
                    _this.$store.commit('msg', '充值成功');
                    setTimeout(()=>{
                        _this.$router.push({
                            path:'/wallet/chargeresult?money='+_this.money+'&name=周周宝'
                        })
                    },1500);
                }else{
                    _this.$store.commit('msg', '充值失败');
                }
            });
        },
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
