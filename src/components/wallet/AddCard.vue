<template>
    <div class="body_addcard">
        <div class="cardinfo" v-if="preview">
            <div class="tips">为保证您的资金安全，请绑定账户本人的银行卡</div>
            <div class="form">
                <div class="row flex_align bor_b">
                    <div class="label">持卡人</div>
                    <div class="flex_1"><input type="text" :value="updata.bank_user" readonly></div>
                </div>
                <div class="row flex_align bor_b">
                    <div class="label">开户行</div>
                    <div class="flex_1"><input type="tel" :value="updata.bank_name" readonly></div>
                </div>
                <div class="row flex_align">
                    <div class="label">卡号</div>
                    <div class="flex_1"><input type="tel" :value="updata.bank_number" readonly></div>
                </div>
            </div>
            <!-- <div class="message"><img src="/public/img/wallet/yinhang_icon.png" alt="">{{updata.bank_name}}</div> -->
            <div class="btnbox"><div class="btn" @click="submit">下一步</div></div>
        </div>
        <div class="cardinfo" v-else>
            <div class="tips">提醒：此银行卡作为提现卡</div>
            <div class="form on">
                <div class="row flex_align bor_b">
                    <div class="label">持卡人</div>
                    <div class="flex_1"><input type="text" v-model="updata.bank_user"></div>
                </div>
                <div class="row flex_align bor_b">
                    <div class="label">开户行</div>
                    <div class="flex_1"><input type="text" v-model="updata.bank_name"></div>
                </div>
                <div class="row flex_align">
                    <div class="label">卡&nbsp;&nbsp;&nbsp;号</div>
                    <div class="flex_1"><input type="tel" v-model="updata.bank_number"></div>
                </div>
            </div>
            <div class="btnbox"><div class="btn" @click="sureInfo">确认信息</div></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            switch:true,
            preview:false,
            updata:{
                bank_user:'',
                bank_name:'',
                bank_number:''
            }
        }
    },
    watch:{
        $route(to, from) {
            let _this = this;
            if(from.query.pre){
                _this.preview = false;
            }
        }
    },
    mounted(){

    },
    methods:{
        sureInfo(){
            let _this = this,
                data = _this.updata;
            if(data.bank_user == ''){ 
                _this.$store.commit('msg', '持卡人名字不能为空');
                return false;
            }else if(data.bank_name == ''){
                _this.$store.commit('msg', '请输入开户行名称');
                return false;
            }else if(data.bank_number == ''){
                _this.$store.commit('msg', '请输入银行卡卡号');
                return false;
            }
            _this.preview = true;
            _this.$router.push({
                path:'/wallet/addcard?pre=1'
            });
        },
        submit(){
            let _this = this;
            if(!_this.switch) return false;
            _this.switch = false;
            let data = {
                token:localStorage.token
            }
            $.extend(data,_this.updata);
            _this.axios.post(_this.$store.state.walleturl+'/banks/add', _this.qs.stringify(data)).then((res)=>{
                setTimeout(()=>{
                    _this.switch = true;
                },1500);
                
                if(res.data.message == '银行卡号已存在'){
                    _this.$store.commit('msg', '银行卡号已存在');
                }else if(res.data.message == '最多保存10张银行卡'){
                    _this.$store.commit('msg', '最多保存10张银行卡');
                }else{
                    _this.$store.commit('msg', '添加银行卡成功');
                    setTimeout(() => {
                        _this.$router.go(-2);
                    }, 1500);
                }
            });
        }
    }
}
</script>

