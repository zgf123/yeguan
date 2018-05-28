<template>
	<div class="Home Page">
		<!-- <div class="xiazai" style="position:fixed;left:10px;top:10px;z-index:999999;"><button style="width:60px;height:30px;color:#fff;background-color:#ff5555;" @click="downApp">下载</button></div> -->
		<div class="notice" @click="toNotice">
			<img src="/public/img/msg_icon.png" alt="">
			<div class="message" v-show="resdata.message_total == 0 ? false : true">{{resdata.message_total}}</div>
		</div>
		<div class="wavebox">
			<div class="userbox">
				<div class="user_info">
					<div class="name">{{real_name}}</div>
					<div class="task cr">
						<div class="left" @click="showDaoqi">
							<p>{{resdata.due}}&nbsp;万</p>
							<small>本月到期</small>
						</div>
						<div class="right" @click="showJz">
							<p>{{resdata.income}}&nbsp;万</p>
							<small>本月签单</small>
						</div>
					</div>
				</div>
			</div>
			<canvas id="wave" style="background: transparent;position:absolute;bottom:-2px;left:0;"></canvas>
		</div>

		<div class="home_items cr">
			<router-link v-for="(item,index) in itemList" :to="item.link" :key="index" tag="div" :class="'home_item flex_align lyui_tap_active '+item.class">
				<div class="home_item_con">
					<img :src="item.imgSrc" alt="">
					<p>{{item.title}}</p>
				</div>
				<div class="sign" v-show="index == (resdata.order_read > 0 ? 2 : 100)"></div>
				<div class="sign" v-show="index == (resdata.birtiday_read > 0 ? 4 : 100)"></div>
				<div class="sign" v-show="index == (resdata.product_log_total > 0 ? 7 : 100)"></div>
			</router-link>
		</div>
		<div class="getout btn_active" @click="clearStorage">退出</div>
		<div class="homebg" style="height:10px;"></div>
	</div>
</template>
<script>
	import wave from '../../plugin/wave/wave.js'
	export default{
		name: 'home',
		data(){
			return{
				real_name:JSON.parse(localStorage.info).real_name,
				resdata:{
					end_money:'',
					jz:0,
					message_total:0
				},
				itemList:[
					{
						link:'/prosale',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic1.png?v-0.1',
						title:'产品列表',
						signShow:false
					},
					{
						link:'/custom/list',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic2.png?v-0.1',
						title:'客户（录单）',
						signShow:false
					},
					{
						link:'/order',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic3.png?v-0.1',
						title:'成交进度',
						signShow:false
					},
					{
						link:'/report',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic4.png?v-0.1',
						title:'业绩明细',
						signShow:false
					},
					{
						link:'/birthday',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic6.png?v-0.1',
						title:'客户生日',
						signShow:false
					},
					{
						link:'/system',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic5.png?v-0.1',
						title:'个人设置',
						signShow:false
					},
					{
						link:'/rules',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic7.png?v-0.1',
						title:'公司制度',
						signShow:false
					},
					{
						link:'/statis',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic8.png?v-0.1',
						title:'财富会统计',
						signShow:false
					},
					{
						link:'/statis',
						class:'noafter nobefore',
						imgSrc:'/public/img/home_pic3.png?v-0.1',
						title:'资产配置',
						signShow:false
					}
				]
			}
		},
		computed:{
            loading(){
                return this.$store.state.loading;
            }
		},
		created(){
			this.fetchData();
		},
		mounted(){
			$('.nav_back').hide();
			wave({
	   			id:'wave'
	   			,height:140
		   		,colorBefore:'#fff'
		   		,colorAfter:'rgba(255,255,255,0.3)'
		   		,waterTop:14
				,waterline:100
				,angleChange:0.013
				,speedChange:0.03
		   	});
		},
		methods:{
			fetchData(){
				let _this = this;
				var data = this.qs.stringify({
					token:localStorage.token,
					device_token:localStorage.devicetoken,
					device_type:localStorage.devicetype
				});
                this.axios.post('/index/home',data).then(function(res){
                	if(res.data.code==1){
						this.resdata = res.data.data;
					}
                }.bind(this)).catch(function(err){
                    //code..
                })
            },
            clearStorage(){
            	var _this = this;
            	var data = {
            		token:localStorage.token
            	};
            	$.ajax({
		            type: 'POST',
		            url: _this.$store.state.baseurl+'/user/logout',
		            data,
		            beforeSend:function(res){
		            	layer.open({
		            		type: 2,
		            		content: '正在退出...',
		            		shadeClose:false
		            	});
		            },
		            success: function(res){
						layer.closeAll();
						localStorage.removeItem('info');
						localStorage.removeItem('token');
						_this.$router.replace({
							path:'/login'
						})
		            }
		        });
            },
            showDaoqi(){
            	this.$router.push({
            		path: '/report',
            		query: {
            			isJz: 'daoqi'
            		}
            	})
            },
            showJz(){
            	this.$router.push({
            		path: '/report',
            		query: {
            			isJz: 'jz'
            		}
            	})
            },
			//查看通知
			toNotice(){
				this.$router.push({
            		path: '/notice'
            	})
			},
			//下载app
			downApp(){
				var _this = this;
				this.axios.post('/fdsafdsaievd/dfasf','').then(function(res){
					console.log(res);
					window.location.href='http://www.fminxiang.com/yeguan/download';
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.nobefore{
		border-radius: 3px;
	}
	.nobefore:before {
		width: 0 !important;
	}
	.sign{
		position: absolute;
		top: 23px;
		right: 23px;
		background-color: #f74c31;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.notice{
		background-color:#ffa043;
		position: absolute;
		width:22px;
		height: 18px;
		right:15px;
		top:15px;
		z-index: 999;
		img{
			width:100%;
		}
		.message{
			position:absolute;
			width:20px;
			line-height:14px;
			height:14px;
			top: -6px;
			right: -11px;
			background-color: #fff;
			color: #ffa043;
			text-align: center;
			font-size:11px;
			border-radius: 10px;
			padding: 0 4px;
		}
	}
</style>
