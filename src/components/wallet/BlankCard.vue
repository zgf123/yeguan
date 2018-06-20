<template>
    <div class="body_blankcard">
        <router-link tag="div" class="add_bank" :to="'/wallet/addcard'"></router-link>
        <div class="no_bank_card" v-if="!resdata.length">
            <img src="/public/img/wallet/no_bank_card.png" alt="">
            <p>一张卡都没有呢</p>
        </div>
        <div class="bank_card_box">
            <ul>
                <li v-for="item in resdata" :key="item.bank_id">
                    <h1>{{item.bank_name}}</h1>
                    <h2>{{item.bank_user}}</h2>
                    <p>{{item.bank_number}}</p>
                    <div class="delete_icon" @click="deleteBank(item.bank_id)"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            resdata:[]
        }
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            let _this = this;
            var data = {
                token:localStorage.token
            }
            _this.axios.post(_this.$store.state.walleturl+'/banks/index', _this.qs.stringify(data)).then((res)=>{
                this.resdata = res.data.data || [];
            });
        },
        deleteBank(id){
            let _this = this;
            var data = {
                token:localStorage.token,
                bank_id:id
            }
            layer.open({
                content:'确定要删出该银行卡吗？',
                btn:['确定','取消'],
                yes:function(){
                    layer.closeAll();
                    _this.axios.post(_this.$store.state.walleturl+'/banks/del', _this.qs.stringify(data)).then((res)=>{
                        if(res.data.code == 1){
                            _this.$store.commit('msg', '删除成功!');
                            _this.fetchData();
                        }else{
                            _this.$store.commit('msg', res.data.message);
                        }
                    });
                }
            });
        }
    }
}
</script>

