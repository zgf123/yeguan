<template>
<div>
	<component :is="'Header'"><router-link :to="'/custom/edit/'+resdata.cid" tag="div" slot="search" class="edit">编辑</router-link></component>
	<div class="content Page">
		<div class="row flex_align">
			<div class="left flex_1">客户姓名</div>
			<div class="right flex_1 text_r">{{resdata.real_name}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">客户分组</div>
			<div class="right flex_1 text_r">{{resdata.is_vip == 1 ? '已成交客户' : '未成交客户'}}</div>
		</div>
		<div class="row flex_align" v-if="resdata.is_vip == 1 ? false : true">
			<div class="left flex_1">客户状态</div>
			<div class="right flex_1 text_r">{{resdata.tag}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">手机号码</div>
			<div class="right flex_1 text_r">{{resdata.mobile}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">身份证号</div>
			<div class="right flex_1 text_r">{{resdata.idcard}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">住址</div>
			<div class="right flex_1 text_r">{{resdata.idcard_address}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">民族</div>
			<div class="right flex_1 text_r" :class="resdata.nation ? '' : 'notxt'">{{resdata.nation || '未输入所属民族'}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">身份证有效截止日期</div>
			<div class="right text_r" :class="resdata.idcard_expiry_date ? '' : 'notxt'">{{resdata.idcard_expiry_date || '未输入有效时间'}}</div>
		</div>
		<div class="row flex_align">
			<div class="left">邮寄地址</div>
			<div class="right flex_1 text_r" :class="resdata.current_address ? '' : 'notxt'">{{resdata.current_address || '未输入邮寄地址'}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">邮箱</div>
			<div class="right flex_1 text_r" :class="resdata.email ? '' : 'notxt'">{{resdata.email || '未输入邮箱账号'}}</div>
		</div>

		<div class="card">身份证头像面</div>
		<div class="cardpic">
			<img :src="resdata.idcard_img ? resdata.idcard_img : '/public/img/default_pic.jpg'" alt="">
		</div>
		<div class="card">身份证国徽面</div>
		<div class="cardpic">
			<img :src="resdata.idcardback_img ? resdata.idcardback_img : '/public/img/default_pic.jpg'" alt="">
		</div>
		<div class="afterline"></div>
		<div class="card">备注</div>
		<div class="marks" :class="resdata.email ? '' : 'notxt'">
			{{resdata.remark  || '未输入备注信息'}}
		</div>
	</div>
</div>
</template>
<script>
	export default{
		data(){
			return{
				cid:'',
				resdata:{}
			}
        },
        created(){
            this.cid = this.$route.params.id;
			this.fetchData();
        },
		methods:{
			fetchData(){
				let data = this.qs.stringify({
					token:localStorage.token,
					cid:this.cid
				});
				this.axios.post('/customer/edit',data).then(function(res){
					if(res.data.code == 1){
						this.resdata =res.data.data;
					}
                }.bind(this))
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
	.notxt{
		color: #b5b5b5;
	}
	.content{
        background-color: #fff;
	}
	.row{
		font-size: 17px;
		color: #333;
		padding:10px 15px;
		line-height: 1.4;
		position: relative;
		min-height: 50px;
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
			transform: scaleY(.5)
		}
		.left{
			padding-right: 5px;
		}
		.right{
			padding-left: 5px;
		}
	}
	.card{
		font-size: 17px;
		color: #333;
		height: 50px;
		line-height: 50px;
		padding-left:15px;
	}
	.cardpic{
		padding:0 15px;
		img{
			width: 100%;
		}
	}
	.afterline{
		position: relative;
		margin-top:15px;
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
			transform: scaleY(.5)
		}
	}
	.marks{
		padding:0 15px 40px;
	}
	.edit{
		font-size: 16px;
		line-height: 48px;
		color: #fff;
		position: absolute;
		z-index: 99999;
		top:0;
		right: 0;
		width: 60px;
		text-align: right;
		padding-right: 15px;
	}
</style>
