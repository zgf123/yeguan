<template>
<div>
	<component :is="'Header'"></component>
	<div class="Order Page">
		<div class="content">
			<div v-if="resdata.length ? false : true" class="com_noinfo">
				<p><img src="/src/assets/images/no_info.png" alt=""></p>
			</div>
			
			<div class="item lyui_tap_active" v-for="(item,index) in resdata" :key="index">
				<div class="fail flex_align" v-if="item.huiqian_status == 2 ? true : (item.huiqian_status == 4 ? true : (item.huiqian_status < 0 ? true : false))">
					<div class="fail_icon"><img src="/public/img/fail_result_icon.png"></div>
					<div class="cause text_o">&nbsp;审核失败：{{item.huiqian_msg}}</div>
				</div>
				<div class="item_info">
					<div @click="linkFn(item)">
						<div class="row"><span>客户姓名</span>{{item.customer_name}}</div>
						<div class="row text_o"><span>产品名称</span>{{item.product_name}}</div>
						<div class="row"><span>投资金额</span>{{item.huiqian_money}} 万元</div>
					</div>
					<div class="delete_order" @click="deletItem(item.huiqian_id)" v-if="item.huiqian_status < 1 && item.jz_status != 1">删除订单</div>
				</div>
				<!-- product_fund_type 为2是固收基金 -->
				<div class="process" v-if="item.product_fund_type == 2">
					<div class="box">
						<div class="linebox">
							<!-- 0审核中 1财务审核成功 2会前审核失败 3会签审核成功 5签合同成功-->
							<div class="line" v-if="item.huiqian_status >= 5" style="width:100%"></div>
							<div class="line" v-else-if="item.huiqian_status >= 3" style="width:75%"></div>
							<div class="line" v-else-if="item.huiqian_status >= 1" style="width:50%"></div>
							<div class="line" v-else style="width:25%"></div>
						</div>
						<ul class="cr">
							<li :class="item.huiqian_status>=1 ? 'on' : ''">
								<span></span>
								<p>财务审核</p>
								<!-- <small class="text_o">2012.12.06&nbsp;15:30</small> -->
							</li>
							<li :class="item.huiqian_status>=3 ? 'on' : ''">
								<span></span>
								<p>会签审核</p>
								<!-- <small class="text_o">2012.12.06&nbsp;15:30</small> -->
							</li>
							<li :class="item.huiqian_status>=5 ? 'on' : ''">
								<span></span>
								<p>变更完成</p>
							</li>
							<li :class="item.huiqian_status>=5 ? 'on' : ''">
								<span></span>
								<p>签合同</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="process2" v-else>
					<div class="box">
						<div class="linebox">
							<!-- 0审核中 1财务审核成功 2会前审核失败 3会签审核成功 5签合同成功-->
							<div class="line" v-if="item.huiqian_status >= 3" style="width:100%"></div>
							<div class="line" v-else-if="item.huiqian_status >= 1" style="width:66.66%"></div>
							<div class="line" v-else style="width:33.33%"></div>
						</div>
						<ul class="cr">
							<li :class="item.huiqian_status>=1 ? 'on' : ''">
								<span></span>
								<p>财务审核</p>
								<!-- <small class="text_o">2012.12.06&nbsp;15:30</small> -->
							</li>
							<li :class="item.huiqian_status>=3 ? 'on' : ''">
								<span></span>
								<p>会签审核</p>
								<!-- <small class="text_o">2012.12.06&nbsp;15:30</small> -->
							</li>
							<li :class="item.huiqian_status>=5 ? 'on' : ''">
								<span></span>
								<p>签合同</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="btnbox cr">
					<router-link :to="'/order/entry/' + item.huiqian_id" class="btn addbtn btn_active" tag="div" v-if="item.huiqian_status == 0 && item.huiqian_is_sub == 0">追加进账</router-link>
					<div class="btn compbtn btn_active" @click="compjz(item.huiqian_id)" v-if="item.huiqian_status == 0 && item.huiqian_is_sub == 0">完成进账</div>
					<router-link :to="'/order/info/' + item.huiqian_id" class="btn btn_active" tag="div" v-if="item.huiqian_status < 0 || item.huiqian_status == 2">重新提交</router-link>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'order',
		data(){
			return{
				resdata:[]
			}
		},
		created(){
			this.fetchData();
		},
		methods:{
			fetchData(){
				var data = this.qs.stringify({
					token:localStorage.token
				});
                this.axios.post('/huiqian/index',data).then(function(res){
					if(res.data.code == 1){
						this.resdata = res.data.data || [];
					}else{
						this.$store.commit('toLogin', this);
					}
                }.bind(this));
            },
            deletItem(huiqian_id){
            	var _this = this;
            	layer.open({
				    content: '确定要删除么?'
				    ,btn: ['确定','取消']
				    ,shadeClose:false
				    ,yes:function(index){
				    	layer.close(index);
				    	var data = _this.qs.stringify({
							token:localStorage.token,
							hqid:huiqian_id
						});
		                _this.axios.post('/huiqian/del',data).then(function(res){
							// console.log(res);
		                    if(res.data.code == 1){
								_this.$store.commit('msg', '删除成功');
								_this.fetchData();
							}
		                });
				    }
				});
            },
			linkFn(item){
				if(item.huiqian_status>=3){
					this.$router.push({
						path:'/order/pass/' + item.huiqian_id
					})
				}else{
					this.$router.push({
						path:'/order/info/' + item.huiqian_id
					})
				}
			},
			//完成进账
			compjz(hq_id){
				let _this = this;
				layer.open({
				    content: '确定完成进账不再追加?'
				    ,btn: ['确定','取消']
				    ,shadeClose:false
				    ,yes:function(index){
				    	layer.close(index);
				    	var data = _this.qs.stringify({
							token:localStorage.token,
							hqid:hq_id
						});
						_this.axios.post('/huiqian/complete',data).then(function(res){
							// console.log(res);
							if(res.data.code == 1){
								_this.$store.commit('msg', '已完成进账');
								_this.fetchData();
							}
						});
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.item{
		background-color: #fff;
		padding-bottom: 15px;
		margin-bottom: 10px;
	}
	.fail_icon{
		img{
			width: 25px;
		}
	}
	.fail{
		padding-left: 15px;
		height: 50px;
		position: relative;
		color: #ff8b03;
		&:after{
			content: "";
			position: absolute;
			left: 15px;
			right: 0;
			height: 1px;
			bottom: 0;
			border-bottom: 1px solid #ddd;
			-webkit-transform-origin: 0 100%;
			transform-origin: 0 100%;
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
		}
	}
	.item_info{
		padding: 15px;
		font-size: 16px;
		color: #323232;
		position: relative;
		.row{
			height: 38px;
			line-height: 38px;
			span{
				color: #999;
				padding-right: 12px;
			}
		}
	}
	.delete_order{
		font-size: 15px;
		color: #ff8b03;
		border: 1px solid #ff8b03;
		line-height: 32px;
		height: 32px;
		position: absolute;
		padding:0 7px;
		border-radius: 4px;
		top:15px;
		right: 15px;
	}
	.btnbox{
		padding: 10px 15px 0;
		.btn{
			font-size: 17px;
			color: #fff;
			height: 50px;
			line-height: 50px;
			background-color: #ff8b03;
			text-align: center;
			border-radius: 6px;
		}
		.addbtn{
			width: 46%;
			float: left;
		}
		.compbtn{
			width: 46%;
			float: right;
		}
	}
	.process{
		padding:0 15px 10px;
		.box,ul{position: relative;overflow: hidden;}
		li{
			float: left;
			width: 25%;
			span{
				display: block;
				width: 20px;
				height: 20px;
				background-color: #f5f5f5;
				margin:0 auto;
				border-radius: 50%;
			}
			p{
				font-size: 15px;
				color: #999999;
				text-align: center;
				margin-top: 9px;
			}
			small{
				font-size: 10px;
				color: #ff8b03;
				text-align: center;
				margin-top: 5px; 
			}
			&.on{
				span{
					background: url(/public/img/pass_icon.png) no-repeat;
					background-size: 100% 100%;
				}
				p{
					color: #ff8b03;
				}
			}
		}
		.linebox{
			position: absolute;
			left: -12.5%;
			right: percentage(1/8);
			background-color: #f5f5f5;
			height: 5px;
			top:8px;
			.line{
				width: 0;
				height: 5px;
				background:-webkit-gradient(linear, 0 100%, 100% 100%, from(#ffc539), to(#ff783a));  
			}
		}
	}
	.process2{
		padding:0 15px 10px;
		.box,ul{position: relative;overflow: hidden;}
		li{
			float: left;
			width: 33.33%;
			span{
				display: block;
				width: 20px;
				height: 20px;
				background-color: #f5f5f5;
				margin:0 auto;
				border-radius: 50%;
			}
			p{
				font-size: 15px;
				color: #999999;
				text-align: center;
				margin-top: 9px;
			}
			small{
				font-size: 10px;
				color: #ff8b03;
				text-align: center;
				margin-top: 5px; 
			}
			&.on{
				span{
					background: url(/public/img/pass_icon.png) no-repeat;
					background-size: 100% 100%;
				}
				p{
					color: #ff8b03;
				}
			}
		}
		.linebox{
			position: absolute;
			left: -16.66%;
			right: percentage(1/6);
			background-color: #f5f5f5;
			height: 5px;
			top:8px;
			.line{
				width: 0;
				height: 5px;
				background:-webkit-gradient(linear, 0 100%, 100% 100%, from(#ffc539), to(#ff783a));  
			}
		}
	}
</style>
