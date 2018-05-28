<template>
<div>
	<component :is="'Header'"></component>
	<div class="Report Birthday Page">
		<Loadingf v-show="loading"></Loadingf>
		<div class="content">
			<div v-if="showdata.length ? false : true" class="com_noinfo">
				<p><img src="/src/assets/images/no_info.png" alt=""></p>
			</div>
			<scroller ref="scroller" :on-infinite="infinite">
				<ul id="laypageCon" class="report_ul">
					<li v-for="(item,index) in showdata" :key="index">
						<div class="pro_col_head flex_align bor_b">
							<!-- <div class="pro_col_title nowrap">客户姓名</div> -->
							<div class="pro_col_name flex_1 text_o">{{item.customer_real_name}}</div>
							<div class="pro_col_ft text_o"><span @click="link_detail(item.customer_real_name)">投资详情</span></div>
						</div>
						<div class="pro_col_con cr">
							<div class="left">
								<p class="text_o"><span>客户生日</span>{{item.customer_birthday}}</p>
								<p class="term text_o"><span>在投金额</span>{{item.money}}万元</p>
								<!-- <p class="term text_o"><span>固收在保</span>{{item.fixed_zaibao_str}}万</p> -->
							</div>
							<div class="right">
								<div class="telphone">
									<a :href="'tel:'+item.customer_mobile" class="imgbox" v-show="!androidCall"><img src="/src/assets/images/birth_tel.png" alt=""></a>
									<a href="javascript:;" class="imgbox" v-show="androidCall" @click="appCall(item.customer_mobile)"><img src="/src/assets/images/birth_tel.png" alt=""></a>
									<!-- <p>客户电话</p> -->
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div style="height:1px;"></div>
				<!-- custom infinite spinner -->
			</scroller>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'Alive_birthday',
		data(){
			return{
				androidCall:false, //是否是安卓app打开
				hasInfo:false,
				resdata:[],
				showdata:[]
			}
		},
		computed:{
            loading(){
                return this.$store.state.loading;
            }
		},
		created(){
			
		},
		activated(){
			var _this = this;
			setTimeout(() => {
				_this.$store.state.isFetchData && _this.fetchData();
			}, 0);
			// 如果是安卓app
			if (cusAndroid) {
                this.androidCall = true;
            }
		},
		methods:{
			fetchData(){
                var data = this.qs.stringify({
					'token':localStorage.token
				});
                this.axios.post('/customer/birthday',data).then(function(res){
                	// console.log(res);
                	if(res.data.code == 1){
						if(res.data.data == ''){
							this.hasInfo = true;
						}
						this.resdata = res.data.data;
						this.showdata = [];
						//加载数据
						this.loadData(5);
					}else{
						this.$store.commit('toLogin',this);
					}
                }.bind(this));
            }
            //加载数据
            ,loadData(nums = 10){
				var _this = this;
				var data = this.resdata;
				var dataLength = this.resdata.length;
				if(dataLength == 0){
					return true;
				}else if(nums > dataLength ){
					nums = dataLength;
				};
				var addArr = data.splice(0,nums);
				_this.showdata = [..._this.showdata, ...addArr];
				return false;
            }
            ,link_detail(name){
            	this.$router.push({
            		path: '/report',
            		query:{
            			keyword:name,
						time:'all'
            		}
            	})
			},
			//上拉加载
			infinite(done){
				var _this = this;
				setTimeout(() => {
					var isTrue = _this.loadData();
					done(isTrue);
				}, 1000);
			},
			appCall(number){
                window.android.call(number);
            }
		}
	}
</script>
<style lang="less" scoped>
	.laypage_main{
		text-align: center;
	}
	.laypage_main a{
		margin: 0 !important;
	}
	.content{
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>