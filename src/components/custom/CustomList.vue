<template>
<div>
	<component :is="'Header'">
		<div slot="title"></div>
		<div class="searchbox" slot="search">
            <div class="ipt">
				<div class="input_box">
					<input ref="searchIpt" :style="'transform: translate3d('+search.ipt_trans+'px, 0, 0);'" type="text" placeholder="输入客户姓名" v-model="search.keyword" @focus="startSearch">
				</div>
			</div>
            <div class="btn" v-show="search.show_btn" @click="startSearch"><span>搜索</span></div>
            <div class="btn" v-show="!search.show_btn" @click="endSearch"><span>取消</span></div>
        </div>
	</component>
	<div class="Page">
		<!-- 搜索前 -->
		<transition enter-active-class="animated animateSearch fadeInUpSmall" leave-active-class="animated animateSearch fadeOutDownSmall">
			<div class="start_searchbox" v-show="search.show_btn">
				<div class="tabbar bor_b flex_align">
					<div class="tab left flex_1" :class="tabActive==0 ? 'on' : ''" @click="toggleTab(0)">未成交</div>
					<div class="tab right flex_1" :class="tabActive==1 ? 'on' : ''" @click="toggleTab(1)">已成交</div>
					<div class="subline" :style="'transform:translate3D('+(5*tabActive)+'rem,0,0)'"></div>
				</div>
				<transition enter-active-class="animated animatedPage fadeInUpSmall" leave-active-class="animated animatedPage fadeOutDownSmall">
					<component :is="'CuslistNotvip'" :cusListProp="cusList" v-show="isVip == 0"></component>
				</transition>
				<transition enter-active-class="animated animatedPage fadeInUpSmall" leave-active-class="animated animatedPage fadeOutDownSmall">
					<component :is="'CuslistVip'" :cusListProp="cusList" v-show="isVip == 1"></component>
				</transition>
				<router-link class="addcus btn_active" tag="div" :to="'/custom/add?'+'is_vip='+isVip">添加客户</router-link>
			</div>
		</transition>
		<!-- 搜索后 -->
		<transition enter-active-class="animated animateSearch fadeInUpSmall" leave-active-class="animated animateSearch fadeOutDownSmall">
			<component :is="'Cuslist'" :cusListProp="searchList" v-show="!search.show_btn"></component>
		</transition>
	</div>
</div>
</template>
<script>
	import CuslistNotvip from './temp/CuslistNotvip.vue';
	import CuslistVip from './temp/CuslistVip.vue';
	import Cuslist from './temp/cuslist.vue';
	
	export default{
		name: 'customelist',
		data(){
			return{
				tabActive:1,	//改变下标线位置
				cusList:[],		//获取的客户列表
				//是否显示已成交客户
				isVip:1,
				//搜索相关数据修改
				search:{
					ipt_trans: -68,
					show_btn:true,
					keyword:''
				}
			}
		},
		components:{
			CuslistNotvip,
			CuslistVip,
			Cuslist
		},
		computed:{
			searchList(){
				let keyword = this.search.keyword;
				if(!keyword){
					return [];
				}
				let cusList = this.cusList;
				let newList = [];
				cusList.forEach((c,i) => {
					if(c.name.indexOf(keyword) != -1){
						newList.push(c);
					}
				});
				return newList;
			}
		},
		mounted(){
			this.fetchData();
			if(this.$route.query.is_vip !== undefined){
				this.tabActive = this.isVip = this.$route.query.is_vip;
			}
		},
		methods:{
			fetchData(){
				//请求会员客户
				var postData1 = this.qs.stringify({
					token:localStorage.token,
					is_vip:1
				});
				this.axios.post('/customer/index',postData1).then(function(res){
					if(res.data.code==1){
						if(res.data.data){
							this.cusList = this.cusList.concat(res.data.data);
						}
					}
                }.bind(this));

				//请求不是会员客户
				var postData = this.qs.stringify({
					token:localStorage.token,
					is_vip:0
				});
                this.axios.post('/customer/index',postData).then(function(res){
					if(res.data.code==1){
						if(res.data.data){
							this.cusList = this.cusList.concat(res.data.data);
						}
					}
                }.bind(this));
            },
			toggleTab(curIndex){
				this.tabActive = curIndex;
				this.isVip = curIndex;
			},
			//搜索框获取焦点时
			startSearch(){
				this.search.ipt_trans = -126;
				this.$refs.searchIpt.focus();
				this.search.show_btn = false;
			},
			endSearch(){
				this.search.ipt_trans = -68;
				this.search.show_btn = true;
				this.search.keyword = '';
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
	.tabbar{
		background-color: #fff;
		position: absolute;
		top:0;
		width: 100%;
		height: 50px;
		z-index: 99;
		.tab{
			text-align: center;
			font-size: 17px;
			line-height: 40px;
			color:#b5b5b5;
			&.on{
				color: #ffa800;
			}
		}
		.subline{
			position: absolute;
			width: 50%;
			left: 0;
			bottom: 0;
			-webkit-transition: all 0.2s;
			transition: all 0.2s;
			&:after{
				content: "";
				display: block;
				width: 54px;
				height: 4px;
				border-radius: 2px;
				background-color: #ffa800;
				margin:0 auto;
			}
		}
	}
	.addcus{
		position: absolute;
		width: 100%;
		height: 50px;
		left: 0;
		bottom:0;
		background-color: #ff8b03;
		color: #fff;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
	}
	.start_searchbox{
		position: absolute;
		top:0;
		left: 0;
		bottom:0;
		right:0;
	}

	//动画样式
	.animatedPage {
		-webkit-animation-duration: .4s;
		animation-duration: .4s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		position: absolute;
		top:48px;
		width: 100%;
		left:0;
	}

	.animateSearch {
		-webkit-animation-duration: .4s;
		animation-duration: .4s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		position: absolute;
		top:0;
		width: 100%;
		left:0;
	}
</style>
