<template>
    <div>
        <component :is="'Header'">
            <div slot="back" class="nav_back btn_active" @click="navBack"></div>
            <div class="client_search" slot="search">
                <div class="client_ipt">
                    <div class="input_box">
                        <input ref="searchIpt" type="text" placeholder="输入客户姓名" v-model="search.keyword">
                    </div>
                </div>
            </div>
        </component>
        <div class="container Page">
            <div class="client">
                <ul>
                    <li class="flex flex_align bor_b" :class="item.is_send == 1 ? 'gray':''" v-for="(item,index) in searchList" :key="index" @click="selectMen($event,item.id,item.is_send)">
                        <div class="flex_1">{{item.name}}</div>
                        <div class="img"><img src="/public/img/icon_duihao.png" alt=""></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sendbox">
            <span class="btn" :class="member_ids.length ? 'on':''" @click="sendMsg()">{{member_ids.length ? '选择'+member_ids.length+'位客户，确认发送' : '请选择客户'}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                resdata:[],
                search:{
					keyword:''
                },
                member_ids:[]
            }
        },
        mounted(){
            this.fetchData();
        },
        computed:{
			searchList(){
				let keyword = this.search.keyword;
				if(!keyword){
					return this.resdata;
				}
				let cusList = this.resdata;
				let newList = [];
				cusList.forEach((c,i) => {
					if(c.name.indexOf(keyword) != -1){
						newList.push(c);
					}
				});
				return newList;
			}
		},
        methods:{
            fetchData(){
                let _this = this;
				var data = this.qs.stringify({
                    token:'78d475112bd4ba5b359570440b862b94',
                    asset_id:_this.$route.params.id
				});
                this.axios.post('http://manager.yeguan.com/asset/getmember',data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            navBack(){
                this.$router.back();
            },
            selectMen(event, id, is_send){
                //判断不能发送
                if(is_send === 1){
                    return false;
                };
                
                let _this = this;
                var el =  event.currentTarget;
                if( $(el).hasClass('on') ){
                    $(el).removeClass('on');
                    let index = _this.member_ids.indexOf(id);
                    if(index == -1) return false;
                    _this.member_ids.splice(index, 1);
                }else{
                    $(el).addClass('on');
                    _this.member_ids.push(id);
                }
            },
            sendMsg(){
                let _this = this;
                if(_this.member_ids.length == 0) return false;
				var data = this.qs.stringify({
                    token:'78d475112bd4ba5b359570440b862b94',
                    asset_id:_this.$route.params.id,
                    member_ids:_this.member_ids
				});
                this.axios.post('http://manager.yeguan.com/asset/addsend',data).then(function(res){
                    if(res.data.code == 1){
                        _this.$store.commit('msg','发送成功');
                        _this.$router.push({
                            path:'/capital'
                        });
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            navBack(){
                this.$router.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        background-color: #fff;
    }
    .zengjia{
        position: absolute;
        top:0;
        right:0;
        line-height: 48px;
        padding-right: 15px;
        padding-left: 20px;
        font-size: 16px;
    }
    .com_title{
        padding:0 50px;
    }

    .client_search {
        height: 100%;
        position: absolute;
        top: 0;
        left: 50px;
        right: 0;
        z-index: 9999;
        .client_ipt {
            width: 90%;
            float: left;
            padding-top: 10px;
            .input_box {
                background-color: #fff;
                height: 30px;
                border-radius: 15px;
                overflow: hidden;
                position: relative;
                z-index: 1;
                input {
                    background-color: transparent;
                    width: 100%;
                    height: 100%;
                    font-size: 16px;
                    line-height: 18px;
                    color: #333;
                    position: absolute;
                    top: 0;
                    padding-left: 27px;
                    padding-right: 10px;
                    background: #fff url(/public/img/search_icon.png) no-repeat 7px center;
                    background-size: 15px 15px;
                    -webkit-transition: 0.2s;
                    transition: 0.2s;
                }
            }
        }
    }

    .client{
        padding: 16px 0 16px 20px;
        li{
            padding-right: 20px;
            text-align:left;
            color: #333;
            height: 45px;
            &.gray{
                color: #aaa;
            }
            .img{
                img{
                    width:22px;
                    height: 22px;
                    opacity: 0;
                }
            }
            &.on{
                .img{
                    img{
                        opacity: 1;
                    }
                }
            }
        }
    }
    .sendbox{
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        text-align: center;
        padding: 10px 0;
        span{
            background-color: #ddd;
            color: #999;
            display: inline-block;
            width: 80%;
            line-height: 36px;
            border-radius: 18px;
            font-size: 15px;
            &.on{
                background-color: #ff8b03;
                color: #fff;
            }
        }
    }
</style>