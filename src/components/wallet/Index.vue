<template>
    <div class="body_index">
        <div class="header" :style="'background-color:rgba(253,132,109,'+opacity+');'">
            <div class="back" @click="back()"></div>
            <span>我的钱包</span>
            <router-link :to="'/wallet/question'" tag="div" class="ques"><span>常见问题</span></router-link>
        </div>
        <div class="container" ref="container" @scroll="conScroll()">
            <div class="banner">
                <div class="content">
                    <div class="title">我的总资产(元)</div>
                    <h1>{{resdata.account_money}}</h1>
                    <div class="box cr">
                        <div class="left fl_l">
                            <h2><span class="b">{{resdata.checking_money}}</span>万元</h2>
                            <p>审核中</p>
                        </div>
                        <div class="right fl_r">
                            <h2><span class="b">{{resdata.interest_money}}</span>元</h2>
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
        </div>
        <div class="btns cr">
            <router-link tag="div" :to="'/wallet/withdraw'" class="btn">提现</router-link>
            <router-link tag="div" :to="'/wallet/charge'" class="btn on">充值</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            opacity:0, //控制header的透明度
            resdata:''
        }
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            let _this = this;
            var data = this.qs.stringify({
                token:localStorage.token
            });
            _this.axios.post(_this.$store.state.walleturl+'/index/index',data).then(function(res){
                if(res.data.code==1){
                    _this.resdata = res.data.data || '';
                }else{
                    _this.$store.commit('msg', '获取信息失败');
                }
            });
        },
        conScroll(){
            let top = this.$refs.container.scrollTop;
            if(top > 44){
                this.opacity = 1;
            }
            this.opacity = top/44;
        },
        back(){
            this.$router.push({
                path:'/home'
            });
        }
    }
}
</script>
