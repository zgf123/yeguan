<template>
<div>
	<component :is="'Header'"><div class="searchbtn" slot="search" @click="showCondition">{{shaixuan ? '取消' : '筛选'}}</div></component>
	<div class="Report Page">
		<div class="shaixuanbox">
			<h1>筛选结果</h1>
			<div class="shaixuancon">
				<span v-show="searchCondition.start_time || searchCondition.end_time">{{searchCondition.start_time}}至{{searchCondition.end_time}}</span>
				<span>{{searchCondition.isJz == 'jz' ? '进账' : '到期'}}</span>
				<span v-show="searchCondition.fund_type == 0 ? false : true">{{searchCondition.fund_type == 1 ? '固收' : '股权'}}</span>
				<span v-show="searchCondition.keyword">{{searchCondition.keyword}}</span>
			</div>
		</div>
		<div class="has_report com_noinfo" v-if="hasReport"><p><img src="/src/assets/images/no_info.png" alt=""></p></div>
		<div class="content">
			<div v-if="!hasReport"><p class="pro_total"><b class="total_txt">总计</b>投资：<span>{{resdata.count}}</span>笔，金额：<span>{{resdata.sum}}</span>万</p></div>
		    <ul id="laypageCon" class="report_ul">
		    	<li v-for="(item,index) in resdata.jzs" :key="index">
		    		<div class="pro_col_head flex_align bor_b">
						<div class="pro_col_title nowrap"><span @click="changeTxt(item.customer_name)">{{item.customer_name}}</span></div>
						<div class="pro_col_name flex_1 text_o">
							<!-- <router-link :to="'custom/detail/' + item.customer_id" tag="div" class="toinfo_btn">查看资料</router-link> -->
						</div>
						<div class="cr" v-if="item.product_fund_type">
							<div class="is_guquan fl_l" v-if="item.product_fund_type == '固收'">{{item.product_fund_type}}</div>
							<div class="is_zaibao fl_l" v-else>{{item.product_fund_type}}</div>
						</div>
					</div>
					
					<div class="pro_col_con cr">
						<div class="left">
							<p class="text_o">{{item.product_name}}</p>
							<p class="term text_o">{{item.huiqian_start_time}}-{{item.huiqian_end_time}}</p>
						</div>
						<div class="right">
							<div class="right_con cr">
								<p class="money">{{item.huiqian_money}}万</p>
								<p class="money_t">投资金额</p>
							</div>
						</div>
					</div>
		    	</li>
		    </ul>
		</div>
	</div>
	<component :is="'ReportSearch'" :searchProp="searchCondition"  @searchEmit="searchEmitFn" ref="searchRef"></component>
</div>
</template>
<script>
	import ReportSearch from './temp/ReportSearch.vue'
	export default{
		name:'report',
		data(){
			return{
				searchCondition:{
					keyword:'',
					isJz:'jz',
					fund_type:'0',
					start_time:'',
					end_time:''
				},
				shaixuan:false,  //筛选显示文字
				hasReport:true,
				total:{
					num:0,
					sum:0
				},
				resdata:[]
			}
		},
		components:{
			ReportSearch
		},
		mounted(){
			this.searchCondition.keyword = this.$route.query.keyword || '';
			this.searchCondition.isJz = this.$route.query.isJz || 'jz';
			//时间格式化
			let start_time = this.formatTime( new Date(), 'start' ),
				end_time = this.formatTime( new Date(), 'end' );
			this.searchCondition.start_time = start_time;
			this.searchCondition.end_time = end_time;
			
			if(this.$route.query.time == 'all'){
				this.searchCondition.start_time = '';
				this.searchCondition.end_time = '';
			}
			this.$router.replace({
				path:'/report'
			});
			this.fetchData();
		},
		methods:{
			fetchData(){
				var _this = this,
					isJz = _this.searchCondition.isJz,
					postUrl = '';
				if(isJz == 'jz'){
					postUrl = '/bi/income';
				}else if(isJz == 'daoqi'){
					postUrl = '/bi/due';
				}else if(isJz == 'zaitou'){
					postUrl = '/bi/zaitou';
				}
				let data = $.extend({},this.searchCondition,{token:localStorage.token});
				delete data.isJz;
				data = this.qs.stringify(data);

                this.axios.post(postUrl,data).then(function(res){
					if(res.data.code == 1){
						this.resdata = res.data.data || [];
						if(postUrl == '/bi/income'){
							
						}else if(postUrl == '/bi/due'){
							this.resdata.jzs = res.data.data.dues || [];
						}else if(postUrl == '/bi/zaitou'){
							this.resdata.jzs = res.data.data.huiqians || [];
						}
						this.hasReport = !this.resdata.jzs.length;
					}
                }.bind(this))
            },
			//时间格式化
			formatTime(date, term){
				let y = date.getFullYear(),
					m = date.getMonth()+1,
					d = date.getDate();
				let time;
				switch (term) {
					case 'start':
						time = y+'-'+ (m < 10 ? ('0'+m) : m ) +'-'+ '01';
						break;
					case 'today':
						time = y+'-'+ (m < 10 ? ('0'+m) : m ) +'-'+ (d < 10 ? ('0'+d) : d );
						break;
					case 'end':
						m++;
						var timestamp = new Date( y+'-'+ (m < 10 ? ('0'+m) : m ) +'-'+ '01' ).getTime() - 1000*60*60*24;
						var end_date = new Date(timestamp);
						let end_y = end_date.getFullYear(),
							end_m = end_date.getMonth()+1,
							end_d = end_date.getDate();
						time = end_y+'-'+ (end_m < 10 ? ('0'+end_m) : end_m ) +'-'+ (end_d < 10 ? ('0'+end_d) : end_d );
						break;
					default:
						break;
				}
				return time;
			},
			//点击遮罩上的按钮触发
			searchEmitFn(data){
				this.showCondition();
				if(data == '确定'){
					this.fetchData();
				}
			},
			//显示搜索条件遮罩
			showCondition(){
				this.shaixuan = !this.shaixuan;
				this.$refs.searchRef.showCondition(this.shaixuan);
			}
		}
	}
</script>
<style lang="less" scoped>
	.searchbtn{
		position: absolute;
		top:0;
		right:0;
		line-height: 48px;
		padding-right: 15px;
		font-size: 15px;
	}
	.shaixuanbox{
		padding:0 0 5px 15px;
		background-color: #fff;
		h1{
			line-height: 50px;
			color: #323232;
			font-weight: bold;
			font-size: 15px;
		}
		.shaixuancon{
			span{
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 10px;
				background-color: #f4f4f4;
				font-size: 15px;
				color: #ffa043;
				border-radius: 6px;
				padding: 10px 15px;
			}
		}
	}
	.pro_total{
		margin-top:0;
	}
</style>
