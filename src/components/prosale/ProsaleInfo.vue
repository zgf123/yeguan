<template>
<div>
	<component :is="'Header'"></component>
	<div class="Prosale Page">
		<!-- 产品详情 -->
		<div class="pub_title">基本信息</div>
		<div class="detail">
			<div class="lyui_cells nopseudo">
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">产品简称</div>
					<div class="lyui_cell_ft">{{proInfo.product_name}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">产品全称</div>
					<div class="lyui_cell_ft">{{proInfo.fund_name}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">基金管理人</div>
					<div class="lyui_cell_ft">{{proInfo.manager}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">投资方向</div>
					<div class="lyui_cell_ft">{{proInfo.invest_dir}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">基金期限</div>
					<div class="lyui_cell_ft">{{proInfo.time_limit}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">组织形式</div>
					<div class="lyui_cell_ft">{{proInfo.type}}</div>
				</div>
			</div>
		</div>
		<div class="pub_title">销售宝典</div>
		<div v-for="(item,index) in proFiles" :key="index">
			<div class="detail">
				<div class="lyui_cells nopseudo">
					<div class="lyui_cell prosale_item lyui_tap_active" v-if="item.product_files_pitch_message" @click="lookFile(proInfo.product_name+'销售话术',item.product_files_pitch_message)">
						<div class="lyui_cell_bd lyui_cell_primary">销售话术</div>
						<div class="lyui_cell_ft"><img class="more_arrow" src="/src/assets/images/more_arrow.png" alt=""></div>
					</div>
					<div class="lyui_cell prosale_item lyui_tap_active" v-if="item.product_files_pitch_sale" @click="lookTxt(item.product_files_pitch_sale)">
						<div class="lyui_cell_bd lyui_cell_primary">微信/短信话术</div>
						<div class="lyui_cell_ft"><img class="more_arrow" src="/src/assets/images/more_arrow.png" alt=""></div>
					</div>
					<div class="lyui_cell prosale_item lyui_tap_active" v-if="item.product_files_pitch_fab" @click="lookFile(proInfo.product_name+'FAB',item.product_files_pitch_fab)">
						<div class="lyui_cell_bd lyui_cell_primary">FAB</div>
						<div class="lyui_cell_ft"><img class="more_arrow" src="/src/assets/images/more_arrow.png" alt=""></div>
					</div>
					<div class="lyui_cell prosale_item lyui_tap_active" v-if="item.product_files_pitch_prospectus" @click="lookFile(proInfo.product_name+'募集说明书',item.product_files_pitch_prospectus)">
						<div class="lyui_cell_bd lyui_cell_primary">募集说明书</div>
						<div class="lyui_cell_ft"><img class="more_arrow" src="/src/assets/images/more_arrow.png" alt=""></div>
					</div>
				</div>
			</div>
		</div>
		<div class="pub_title">购买信息</div>
		<div class="detail">
			<div class="lyui_cells nopseudo">
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">基金规模</div>
					<div class="lyui_cell_ft">{{proInfo.collect_range}}万</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">起投金额</div>
					<div class="lyui_cell_ft">{{proInfo.invest_min}}万</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">管理费</div>
					<div class="lyui_cell_ft">{{proInfo.manager_fee}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">认购费</div>
					<div class="lyui_cell_ft">{{proInfo.manager_fee}}</div>
				</div>
			</div>
		</div>
		<div class="pub_title">打款信息</div>
		<div class="detail">
			<div class="lyui_cells nopseudo">
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">银行名称</div>
					<div class="lyui_cell_ft">{{proInfo.pay_bankname}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">账户名称</div>
					<div class="lyui_cell_ft">{{proInfo.pay_username}}</div>
				</div>
				<div class="lyui_cell prosale_item">
					<div class="lyui_cell_bd lyui_cell_primary">银行卡号</div>
					<div class="lyui_cell_ft">{{proInfo.pay_number}}</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'prosaleInfo',
		data(){
			return{
				proInfo:'',
				proFiles:''
			}
		},
		computed:{
            loading(){
                return this.$store.state.loading;
            }
        },
		mounted(){
		   	this.fetchData();
		},
		methods:{
			fetchData(pid){
				let _this = this;
				var data = this.qs.stringify({
					token:localStorage.token,
					pid:this.$route.params.id
				});
                this.axios.post('/product/detail',data).then(function(res){
					if(res.data.code == 1){
						this.proInfo = res.data.data;
                    	this.proFiles = res.data.data.files;
					}
                }.bind(this));
            },
            lookFile(name,link){
            	// window.location.href=link;
				// link = link.split('\\').join('').split('[\"').join('').split('\"]').join('');
				// console.log(name,link);
				// return false;
				try {
                    if(cusAndroid){
                        window.android.readPDF(name,link);
                    }else{
                        window.webkit.messageHandlers.readPDF.postMessage({pdfName:name,pdfUrl:link});
                    }
                } catch (error) {
                    window.location.href=link;
                }
            },
            lookTxt(txt){
            	layer.open({
            		content:'<div id="copyTxt" class="copyTxt text_l">'+txt+'</div>',
            		btn:['复制文字'],
            		yes:function(ly){
						var clipboard = new Clipboard('.layer_btn_yes', {
					        target: function() {
					            return document.querySelector('.copyTxt');
					        }
					    });

					    clipboard.on('success', function(e) {
					    	// console.log(e);
					        layer.open({
	            				content:'复制成功',
	            				skin:'msg',
	            				time:2
	            			});
	            			clipboard.destroy();
					    });
            		}
            	})
            }
		}
	}
</script>
<style>
	.layui-m-layercont{
		padding: 15px 20px;
	}
	.layui-m-layerbtn span[yes]{
		color: #ff7e00;
	}
</style>