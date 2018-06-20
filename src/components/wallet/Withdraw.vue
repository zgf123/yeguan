<template>
    <div class="body_cunqu">
        <div class="content">
            <div class="card">
                <div class="top flex_align bor_b">
                    <div class="left c_999">提现银行卡</div>
                    <div class="right flex_1" @click="dialogShow">{{updata.bank_name}}</div>
                </div>
                <div class="middle bor_b">
                    <div class="title">提现金额</div>
                    <div class="row flex_align">
                        <div>￥</div>
                        <div class="ipt flex_1"><input type="tel" placeholder="请输入提现金额" v-model="updata.money"></div>
                    </div>
                </div>
                <div class="bottom flex_align">
                    <div class="left flex_1">可提现余额￥{{resdata.usable_money || 0}}</div>
                    <div class="right c_light_red" @click="updata.money = resdata.usable_money">全部提现</div>
                </div>
            </div>
            <div class="notice c_light_red">每周一可提现一次</div>
            <div class="com_btn" v-if="Number.isInteger(Number(updata.money)) && updata.money>=1000 && updata.money<=Number(resdata.usable_money)"><div class="btn" @click="submit">周三到帐,确认提现</div></div>
            <div class="com_btn" v-else><div class="btn off">周三到帐,确认提现</div></div>
        </div>
        <!-- 动画效果 -->
        <transition name="wallet_fade">
            <div class="wallet_dialog" v-show="dialog.mask">
                <div class="mask"></div>
                <div class="table">
                    <div class="td">
                        <transition name="wallet_bounce">
                            <div class="container" v-show="dialog.con">
                                <div class="listcon">
                                    <div class="title">确认银行卡<div class="close" @click="dialogHide"></div></div>
                                    <ul>
                                        <li class="flex_align bor_b" v-for="item in bankList" :key="item.bank_id" @click="selectBank(item.bank_id, item.bank_number)">
                                            <!-- <div class="left"><img src="/public/img/wallet/jianshe_bank.png" alt=""></div> -->
                                            <div class="flex_1">{{item.bank_name}}</div>
                                            <div class="right" :class="item.bank_id == updata.bank_id ? 'on' : ''"></div>
                                        </li>
                                    </ul>
                                    <router-link tag="div" :to="'/wallet/addcard'" class="add_bank flex_align">
                                        <div class="left"><img src="/public/img/wallet/add_bank.png" alt=""></div>
                                        <div class="flex_1">添加银行卡</div>
                                    </router-link>
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
            switch: true,
            dialog:{
                mask:false,
                con:false,
            },
            resdata:'',
            bankList:[],
            updata:{
                bank_id:'',
                bank_name:'请选择银行卡',
                money:''
            }
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

            //获取银行卡列表
            _this.axios.post(_this.$store.state.walleturl+'/banks/index',data).then(function(res){
                if(res.data.code==1){
                    _this.bankList = res.data.data || '';
                }else{
                    _this.$store.commit('msg', '获取信息失败');
                }
            });
        },
        selectBank(bank_id, bank_name){
            let _this = this;
            _this.updata.bank_id = bank_id;
            _this.updata.bank_name = bank_name;
            _this.dialogHide();
        },
        submit(){
            let _this = this;

            if( _this.updata.bank_id == '' ){
                _this.$store.commit('msg', '请选择提现银行卡');
                return false;
            }
            if(!_this.switch) return false;
            _this.switch = false;

            var data = this.qs.stringify({
                token:localStorage.token,
                money: _this.updata.money,
                bank_id: _this.updata.bank_id
            });
            _this.axios.post(_this.$store.state.walleturl+'/orders/withdraw',data).then(function(res){
                setTimeout(()=>{
                    _this.switch = true;
                },1500);
                if(res.data.code==1){
                    setTimeout(()=>{
                        _this.$router.push({
                            path:'/wallet/withdrawresult?money=' + _this.updata.money + '&name=' + _this.updata.bank_name
                        });
                    },1500);
                    _this.$store.commit('msg', '提现成功');
                }else{
                    _this.$store.commit('msg', res.data.message);
                }
            });
        },
        //弹窗
        dialogShow(){
            let _this = this;
            _this.dialog.mask = true;
            setTimeout(() => {
                _this.dialog.con = true;
            }, 10);
        },
        dialogHide(){
            let _this = this;
            _this.dialog.con = false;
            setTimeout(() => {
                _this.dialog.mask = false;
            }, 10);
        }
    }
}
</script>
