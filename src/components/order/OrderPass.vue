<template>
<div>
	<component :is="'Header'"></component>
	<div class="content Page">
		<!-- 基本信息 -->
		<div class="row flex_align">
			<div class="left flex_1">客户姓名</div>
			<div class="flex_1 text_r">{{formData.customer_name || '未输入客户姓名'}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">手机号码</div>
			<div class="flex_1 text_r">{{formData.customer_mobile || '未输入手机号码'}}</div>
		</div>
		<div class="row flex_align">
			<div class="left">邮箱</div>
			<div class="flex_1 text_r">{{formData.customer_email || '未输入邮箱账号'}}</div>
		</div>
        <div class="row flex_align">
			<div class="left">邮寄地址</div>
			<div class="flex_1 text_r">{{formData.customer_current_address || '未输入邮寄地址'}}</div>
		</div>
        <div class="row flex_align pos_r">
            <div class="left">结算银行开户行</div>
            <div class="flex_1 text_r">{{formData.bank_subbranch || '未输入'}}</div>
        </div>
        <div class="row flex_align">
            <div class="left">结算银行卡号</div>
            <div class="flex_1 text_r">{{formData.bank_number || '未输入'}}</div>
        </div>
        <div class="row flex_align">
            <div class="left">结算账户名称(卡主姓名)</div>
            <div class="flex_1 text_r">{{formData.bank_account || '未输入'}}</div>
        </div>

		<!-- 录单开始 -->
		<div style="background-color:#eeeeee;height:12px;"></div>
		<div class="row flex_align">
			<div class="left">购买产品</div>
			<div class="flex_1 text_r">{{formData.product_name || '未输入'}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">总金额</div>
			<div class="text_r"><input type="text" v-model="formData.huiqian_money" readonly></div>
			<div>万元</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">合同编号</div>
			<div class="flex_1 text_r"><input type="text" v-model="formData.huiqian_contract" readonly></div>
		</div>
        <div class="row flex_align">
			<div class="left">投资周期</div>
			<div class="flex_1 text_r">{{formData.huiqian_start_time | normalTime}} 至 {{formData.huiqian_end_time | normalTime}}</div>
		</div>
        <div class="entrybox">
            <div class="entry_info" v-for="(item,index) in formData.jzData" :key="index">
                <div class="entry_row flex_align">
                    <div class="left">{{ index == 0 ? '进账金额' : '追加金额' }}</div>
                    <div class="right flex_1 text_o arrow" v-if="item.jz_status == 1">{{item.jz_money}}</div>
                    <div class="right flex_1 text_o arrow ipt" v-else><input type="text" v-model="item.jz_money" readonly></div>
                    <span style="color:#323232;">万元</span>
                </div>
                <div class="jz_time" v-if="item.jz_time">进账时间 : {{item.jz_time}}</div>
                <div class="fail" v-if="item.jz_status == 3">审核失败 : {{item.jz_msg}}</div>
                <!-- <div class="delete" v-if="item.jz_status == 2 || item.jz_status == 3" @click="deleteJz(item.jz_id)"></div> -->
            </div>
        </div>
		
		
		<div style="background-color:#eeeeee;height:12px;"></div>
		<div class="card_face">
            <div class="title">转账凭证照片</div>
            <div class="cardbox cr">
                <div class="cardpic">
                    <img :src="formData.files_voucher ? formData.files_voucher : '/public/img/default_pic.jpg'" alt="">
                </div>
            </div>
        </div>
		<div class="cut_line"></div>
		<div class="card_face">
            <div class="title">银行卡照片</div>
            <div class="cardbox cr">
                <div class="cardpic">
                    <img :src="formData.files_bankcard ? formData.files_bankcard : '/public/img/default_pic.jpg'" alt="">
                </div>
            </div>
        </div>
		<div class="cut_line"></div>
		<div class="card_face">
            <div class="title">身份证头像面</div>
            <div class="cardbox">
                <div class="cardpic">
                    <img :src="formData.files_idcard ? formData.files_idcard : '/public/img/default_pic.jpg'" alt="">
                </div>
            </div>
            <div class="row flex_align">
                <div class="left">身份证号</div>
                <div class="flex_1 text_r">{{formData.idcard_number}}</div>
            </div>
        </div>
        <div class="card_face">
            <div class="title">身份证国徽面</div>
            <div class="cardbox">
                <div class="cardpic">
                    <img :src="formData.files_idcardback ? formData.files_idcardback : '/public/img/default_pic.jpg'" alt="">
                </div>
            </div>
            <div class="row flex_align">
                <div class="left flex_1">身份证有效截止时间</div>
                <div class="flex_1 text_r">
                    {{formData.idcard_expiry_date || '未输入'}}
                </div>
            </div>
        </div>
        <div class="row1 flex_align">
            <div class="left flex_1">是否完成进账</div>
            <div class="flex_1 text_r">
                <span class="complate">
                    <b :class="formData.huiqian_is_sub == 1 ? 'on' : ''"></b>
                </span>
            </div>
        </div>
        <div class="marks">
            <div class="title">备注</div>
            <textarea style="background-color:#fff;" v-model="formData.huiqian_remark" placeholder="没有备注信息" readonly></textarea>
        </div>
	</div>
</div>
</template>
<script>
	export default{
        name:'orderInfo',
		data(){
			return{
                canSubmit:true,
                hqid:'',
                formData:{
                    is_sub:1
                },
                showBanks:false //银行卡信息是否显示
			}
        },
        mounted(){
            this.hqid = this.$route.params.id
            this.fetchData();
        },
        methods:{
            fetchData(){
                var _this = this;
                var data = this.qs.stringify({
					token:localStorage.token,
                    hqid:this.hqid
				});
                this.axios.post('/huiqian/edit',data).then(function(res){
                    if(res.data.code == 1){
                        if(!res.data.data.jzData){
                            res.data.data.jzData = [];
                        }
                        this.formData = Object.assign({}, this.formData, res.data.data);
                    }
                }.bind(this));
            }
        }
	}
</script>


<style lang="less" scoped="scoped">
    .cardpic{
		padding:0 15px;
		img{
			width: 100%;
		}
	}
    .complate{
        display: inline-block;
        width: 26px;
        height: 26px;
        border: 1px solid #ff8b03;
        border-radius: 50%;
        padding:4px;
        b{
            display: block;
            background-color: #fff;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            &.on{
                background-color: #ff8b03;
            }
        }
    }
	.content{
		background-color: #fff;
	}
	.notxt{
		color: #b5b5b5;
	}
    .row1{
        font-size: 17px;
		color: #333;
		padding:0 15px;
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
    }
	.row{
		font-size: 17px;
		color: #333;
		padding:0 15px;
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
            padding: 10px 0;
            padding-right: 5px;
		}
        input{
            width: 100%;
            height: 50px;
            font-size: 17px;
            color: #888888;
            text-align: right;
            background-color: transparent;
            line-height: 20px;
        }
		.right{
            padding-left: 5px;
            padding-right: 17px;
            background: url(/public/img/arrow_icon.png) no-repeat center right;
            background-size: 10px 15px;
            color: #888;
		}
    }
    .card_face .title{
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
    }
    .cardbox{
        padding:0 15px;
        .example{
            width: 50%;
            float: left;
            padding-right: 10px;
            img{
                width: 100%;
            }
        }
        .card{
            width: 50%;
            float: right;
            padding-left: 10px;
            position: relative;
            img{
                margin:0 auto;
                width: 100%;
            }
        }
    }
    .marks{
        padding: 0 15px;
        .title{
            font-size: 17px;
            color: #333;
            line-height: 50px;
            height: 50px;
        }
        textarea{
            background-color: #f4f4f4;
            resize: none;
            width: 100%;
            padding:0;
            border-radius: 4px;
            height: 100px;
            padding:12px;
            font-size: 17px;
            color: #888888;
            line-height: 1.4;
        }
    }
    .upload_pic{
        position: relative;
	}
	.submitbox{
        padding:15px;
        .submit{
            font-size: 17px;
            color: #fff;
            background-color: #ff8b03;
            height: 50px;
            width: 100%;
            line-height: 50px;
            text-align: center;
            border-radius: 5px;
        }
	}
	.cut_line{
		position: relative;
		height: 20px;
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
    .entrybox{
        padding:0 15px;
        .ipt{
            input{
                width:100%;
            }
        }
        .entry_info{
            background-color: #f4f4f4;
            margin: 15px auto;
            font-size: 17px;
            color: #323232;
            padding:0 15px;
            border-radius: 5px;
            position: relative;
            .delete{
                position: absolute;
                width: 30px;
                height: 30px;
                background: url('/public/img/up_pic_delete.png') no-repeat;
                background-size: 100%;
                top:-12px;
                right:-12px;
            }
            .entry_row{
                height: 48px;
                .left{
                    padding-right: 30px;
                }
                .right{
                    text-align: right;
                    color: #888888;
                    input{
                        background-color: transparent;
                        font-size: 16px;
                        color: #888;
                        text-align: right;
                        height: 45px;
                    }
                }
            }
            .fail{
                color: #ff8b03;
                font-size: 15px;
                line-height: 1.6;
                padding: 5px 0 10px;
            }
            .jz_time{
                color: #666;
                font-size: 15px;
                line-height: 1.6;
                padding: 5px 0 10px;
            }
        }
    }
    .text_r{
        color: #888;
        line-height: 1.4;
        padding: 5px 0 5px 10px;
    }
    .banksbox{
        position: absolute;
        width: 100%;
        left: 0;
        top:50px;
        background-color: #fff;
        z-index: 99;
        border: 1px solid #ddd;
        ul{
            li{
                height: 40px;
                line-height: 40px;
                padding:0 10px;
                font-size: 14px;
                color: #666;
            }
        }
        .close{
            height: 40px;
            line-height: 40px;
            background-color: #f4f4f4;
            span{
                text-align: center;
                font-size: 15px;
                color: #333;
                float: right;
                width: 80px;
                height: 40px;
                border-left: 1px solid #ddd;
            }
        }
    }
</style>
