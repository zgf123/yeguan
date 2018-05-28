<template>
<div>
	<component :is="'Header'"></component>
	<div class="Page">
        <div class="content">
            <div class="row flex_align">
                <div class="left">追加进账</div>
                <div class="flex_1 text_r"><input type="number" v-model="formData.jz_money" placeholder="请填写追加进账金额"></div>
                <span>&nbsp;万元</span>
            </div>
            <div class="card_face">
                <div class="title">请上传转账凭证照片</div>
                <div class="cardbox cr">
                    <div class="example">
                        <img src="/public/img/zhuanzhang_ex.jpg" alt="">
                    </div>
                    <div class="card">
                        <component class="upload_pic" :is="'UploadPic'" id="zhuanzhang" ref="zhuanzhangRef" :uploadProp="''" @uploadEmit="zhuanzhangFn"></component>
                    </div>
                </div>
            </div>
            <div class="cut_line"></div>
            <div class="row flex_align">
                <div class="left flex_1">完成进账(不再追加)</div>
                <div class="flex_1 text_r">
                    <span class="complate" @click="formData.is_sub = formData.is_sub == 1 ? 0 : 1">
                        <b :class="formData.is_sub == 1 ? 'on' : ''"></b>
                    </span>
                </div>
            </div>
        </div>
        <div class="submitbox"><div class="submit btn_active" @click="submit">保存</div></div>
    </div>
</div>
</template>
<script>
	export default{
        name:'orderEntry',
		data(){
			return{
                canSubmit:true, //限制双次提交
                formData:{
                    hqid:'',
                    jz_money:'',
                    jz_voucher_img:'',
                    is_sub: '0'
                }
			}
        },
        mounted(){
            this.formData.hqid = this.$route.params.id;
            this.uploadInit();
        },
        methods:{
            uploadInit(){
                var _this = this;
                setTimeout(() => {
                    _this.$refs.zhuanzhangRef.uploadInit('#zhuanzhang',{type:'voucher_img'});
                }, 0);
            },
            //转账凭证
			zhuanzhangFn(res){
                this.formData.jz_voucher_img = res;
			},
            submit(){
                var _this = this;
                if(!this.canSubmit){
                    return false;
                }
                //验证开始
                let data = $.extend({}, this.formData);
                if(data.jz_money == ''){
                    this.$store.commit('msg','请输入追加进账金额');
                    return false;
                }else if(data.jz_money == 0){
                    this.$store.commit('msg','进账金额不能为0');
                    return false;
                }

                this.canSubmit = false;
                data.token = localStorage.token;
                data = this.qs.stringify(data);
                this.axios.post('/huiqian/jzsave',data).then(function(res){
                    if(res.data.code ==1 ){
                        _this.$store.commit('msg','追加进账成功');
                        setTimeout(() => {
                            _this.$router.push({
                                path:'/order'
                            })
                        }, 2000);
                    }else{
                        this.$store.commit('msg', res.data.message);
                        _this.canSubmit = true;
                    }
                }.bind(this));
            }
        }
	}
</script>


<style lang="less" scoped="scoped">
    .complate{
        display: inline-block;
        margin-top: 5px;
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
	.row{
		font-size: 17px;
		color: #333;
		padding:0 15px;
		line-height: 1.4;
		position: relative;
        min-height: 50px;
        input{
            font-size: 17px;
            text-align: right;
            color: #333;
        }
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
		.right{
            padding-left: 5px;
            padding-right: 17px;
            background: url(/public/img/arrow_icon.png) no-repeat center right;
            background-size: 10px 15px;
            color: #888;
            input{
                width: 100%;
                height: 50px;
                font-size: 17px;
                color: #888888;
                text-align: right;
                background-color: transparent;
                line-height: 20px;
            }
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
</style>
