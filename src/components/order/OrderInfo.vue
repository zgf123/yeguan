<template>
<div>
	<component :is="'Header'"></component>
	<div class="content adr_input_box adr_input_show Page">
		<!-- 基本信息 -->
		<div class="row flex_align require">
			<div class="left flex_1">客户姓名(必填)</div>
			<div class="flex_1 text_r"><input type="text" v-model="formData.customer_name" placeholder="请输入客户姓名"></div>
		</div>
		<div class="row flex_align require">
			<div class="left flex_1">手机号码(必填)</div>
			<div class="flex_1 text_r"><input type="tel" v-model="formData.customer_mobile" placeholder="请输入客户电话"></div>
		</div>
		<div class="row flex_align">
			<div class="left">邮箱</div>
			<div class="flex_1 text_r"><input type="text" v-model="formData.customer_email" placeholder="请输入邮箱账号"></div>
		</div>
        <div class="row flex_align">
			<div class="left">邮寄地址</div>
			<div class="flex_1 text_r"><input v-model="formData.customer_current_address" type="text" placeholder="请输入邮寄地址"></div>
		</div>
        <div class="row flex_align pos_r">
            <div class="left">结算银行开户行</div>
            <div class="flex_1 text_r"><input type="text" v-model="formData.bank_subbranch" @focus="selBank($event)" placeholder="请填写结算银行开户行"></div>
            <div class="banksbox" v-show="showBanks">
                <ul>
                    <li class="bor_b text_o" v-for="(item,index) in formData.banks" :key="index" @click="bankInfo(item)">{{item.card_number}} {{item.subbranch_name}}</li>
                </ul>
                <div class="close cr"><span @click="showBanks = false">关闭</span></div>
            </div>
        </div>
        <div class="row flex_align">
            <div class="left">结算银行卡号</div>
            <div class="flex_1 text_r"><input type="tel" v-model="formData.bank_number" placeholder="请填写结算银行卡号"></div>
        </div>
        <div class="row flex_align">
            <div class="left">结算账户名称(卡主姓名)</div>
            <div class="flex_1 text_r"><input type="text" v-model="formData.bank_account" placeholder="请填写卡主姓名"></div>
        </div>

		<!-- 录单开始 -->
		<div style="background-color:#eeeeee;height:12px;"></div>
		<div class="row flex_align">
			<div class="left">购买产品</div>
			<div class="flex_1 text_r">{{formData.product_name}}</div>
		</div>
		<div class="row flex_align">
			<div class="left flex_1">总金额</div>
			<div class="text_r">{{formData.huiqian_money}}</div>
			<div>万元</div>
		</div>
		<div class="row flex_align">
			<div class="left">合同编号</div>
			<div class="flex_1 text_r">{{formData.huiqian_contract}}</div>
		</div>
        <div class="row flex_align">
			<div class="left">投资周期</div>
			<div class="flex_1 text_r"><input type="tel" v-model="formData.huiqian_cycle" placeholder="请输入投资周期"></div>
            <div style="color:#888;">&nbsp;月期</div>
		</div>
        <div class="entrybox">
            <div class="entry_info" v-for="(item,index) in formData.jzData" :key="index">
                <div class="entry_row flex_align">
                    <div class="left" v-if="index == 0">① 进账金额</div>
                    <div class="left" v-else>{{index | numFilter}} 追加金额</div>
                    <div class="right flex_1 text_o arrow" v-if="item.jz_status == 1">{{item.jz_money}}</div>
                    <div class="right flex_1 text_o arrow ipt" v-else><input type="number" v-model="item.jz_money"></div>
                    <span style="color:#323232;">万元</span>
                </div>
                <div class="jz_time" v-if="item.jz_time">进账时间 : {{item.jz_time}}</div>
                <div class="fail" v-if="item.jz_status == 3">审核失败 : {{item.jz_msg}}</div>
                <div class="delete" v-if="item.jz_status == 2 || item.jz_status == 3" @click="deleteJz(item.jz_id)"></div>
            </div>
        </div>
		
        <!-- swiper start -->
        <div style="background-color:#eeeeee;height:12px;"></div>
		<div class="card_face">
            <div class="title">请上传转账凭证照片</div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in formData.jzData" :key="index">
                        <component class="upload_pic" :is="'UploadPic'" :id="'zhuanzhang'+index" :ref="'zhuanzhangRef'" :uploadProp="item.jz_voucher_img" @uploadEmit="zhuanzhangFn">
                        </component>
                        <div style="text-align:center;color:#333;margin-top: 10px;font-size:15px;">{{index | numFilter}} {{index == 0 ? '进账':'追加'}}金额凭证</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- swiper end -->

		<div style="height:20px;"></div>
		<div class="card_face">
            <div class="title">请上传银行卡照片</div>
            <div class="cardbox cr">
                <div class="example">
                    <img src="/public/img/bank_ka_ex.jpg" alt="">
                </div>
                <div class="card">
                    <component class="upload_pic" :is="'UploadPic'" id="bankpic" ref="bankpicRef" :uploadProp="formData.files_bankcard" @uploadEmit="bankpicFn"></component>
                </div>
            </div>
        </div>
		<div class="cut_line"></div>
		<div class="card_face">
            <div class="title">身份证头像面</div>
            <div class="cardbox cr">
                <div class="example">
                    <img src="/public/img/card_face_example.jpg" alt="">
                </div>
                <div class="card">
                    <component :is="'UploadPic'" ref="touxiangmianRef" :uploadProp="formData.files_idcard" @uploadEmit="touxiangmianFn" class="upload_pic" id="touxiangmian"></component>
                </div>
            </div>
        </div>
        <div class="shibie" v-show="shibieTip">{{shibieTip}}</div>
        <div class="row flex_align">
            <div class="left">身份证号</div>
            <div class="flex_1 text_r">
                <input type="tel" v-model="formData.idcard_number" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="tel" v-model="formData.idcard_number" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()">
            </div>
            
        </div>
        <div class="row flex_align">
            <div class="left">住址</div>
            <div class="flex_1 text_r">
                <input type="text" v-model="formData.idcard_address" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="text" v-model="formData.idcard_address" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()">
            </div>
        </div>
        <div class="row flex_align">
            <div class="left">民族</div>
            <div class="flex_1 text_r">
                <input type="text" v-model="formData.customer_nation" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="text" v-model="formData.customer_nation" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()">
            </div>
        </div>
        <div class="card_face">
            <div class="title">身份证国徽面</div>
            <div class="cardbox cr">
                <div class="example">
                    <img src="/public/img/card_back_example.jpg" alt="">
                </div>
                <div class="card">
                    <component class="upload_pic" :is="'UploadPic'" id="guohuimian" ref="guohuimianRef" :uploadProp="formData.files_idcardback" @uploadEmit="guohuimianFn"></component>
                </div>
            </div>
        </div>
        <div class="shibie" v-show="shibieDateTip">{{shibieDateTip}}</div>
        <div class="row flex_align">
            <div class="left flex_1">身份证有效期限</div>
            <div class="right flex_1 text_r">
                <component :is="'PickTime'" :PickTimeProp="formData.idcard_expiry_date" @PickTimeEmit="daoqiTimeFn"><input type="text" v-model="formData.idcard_expiry_date" placeholder="上传后系统自动识别" readonly></component>
            </div>
        </div>
        <div class="row1 flex_align">
            <div class="left flex_1">完成进账(不再追加)</div>
            <div class="text_r" v-if="formData.huiqian_status < 1">
                <span class="complate" @click="formData.huiqian_is_sub = formData.huiqian_is_sub == 1 ? 0 : 1">
                    <b :class="formData.huiqian_is_sub == 1 ? 'on' : ''"></b>
                </span>
            </div>
            <div class="flex_1 text_r" v-else>
                <span class="complate">
                    <b :class="formData.huiqian_is_sub == 1 ? 'on' : ''"></b>
                </span>
            </div>
        </div>
        <div class="marks">
            <div class="title">备注</div>
            <textarea v-model="formData.huiqian_remark" placeholder="请输入备注信息"></textarea>
        </div>
		<div class="submitbox"><div class="submit btn_active" @click="submit">提交</div></div>
	</div>
</div>
</template>
<script>
	export default{
        name:'orderInfo',
		data(){
			return{
                canSubmit:true, //限制双次提交
                shibieTip:'', //身份证号，识别状态提示信息
                shibieDateTip:'',  //身份证截止日期，识别状态提示信息
                canIptNum:true, //身份证号识别中，是否能输入
                canIptDate:true, //身份证截止日期识别中，是否能输入
                touxiangmianFailNum:2,//头像面识别失败次数
                guohuimianFailNum:2,//头像面识别失败次数
                hqid:'',
                formData:{
                    is_sub:1
                },
                showBanks:false //银行卡信息是否显示
			}
        },
        filters:{
            numFilter(index){
                switch (index) {
                    case 0:
                        return '①';
                        break;
                    case 1:
                        return '②';
                        break;
                    case 2:
                        return '③';
                        break;
                    case 3:
                        return '④';
                        break;
                    case 4:
                        return '⑤';
                        break;
                    case 5:
                        return '⑥';
                        break;
                    case 6:
                        return '⑦';
                        break;
                    case 7:
                        return '⑧';
                        break;
                    case 8:
                        return '⑨';
                        break;
                    default:
                        return index;
                        break;
                }
            }
        },
        mounted(){
            adrShowInput();
            //获取参数
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
                        this.formData = $.extend({}, this.formData, res.data.data);
                        this.formData.idcard_address = this.formData.customer_idcard_address;
                        //初始化上传插件
                        this.uploadInit();
                    }
                }.bind(this));
            },
            uploadInit(){
                var _this = this;
                setTimeout(() => {
                    _this.$refs.touxiangmianRef.uploadInit('#touxiangmian',{type:'idcard'});
                    _this.$refs.guohuimianRef.uploadInit('#guohuimian',{type:'idcard_back'});
                    _this.$refs.bankpicRef.uploadInit('#bankpic',{type:'bankcard_img'});
                    //初始化转账凭证上传
                    _this.formData.jzData.forEach((c,i) => {
                        //如果财务审核通过，则不允许修改
                        /* if(c.jz_status == 1){
                            if(c.jz_voucher_img){
                                $('#zhuanzhang'+i).append(`
                                    <img src="${c.jz_voucher_img}" style="width:100%;height:100%;position:absolute;left:0;top:0;">
                                `);
                            }else{
                                $('#zhuanzhang'+i).append(`
                                    <div style="
                                        font-size:14px;
                                        color:#ff6666;
                                        text-align:center;
                                        line-height: 1.6;
                                        position:absolute;
                                        top:0;left:0;
                                        width:100%;
                                        height:100%;
                                        background-color:#fff;
                                        border: 1px solid #ddd;
                                        padding-top:22%;
                                    ">
                                        转账凭证未上传
                                    </div>
                                `);
                            }
                        }else{
                            _this.$refs.zhuanzhangRef[i].uploadInit('#zhuanzhang'+i,{type:'voucher_img'});
                        } */
                        _this.$refs.zhuanzhangRef[i].uploadInit('#zhuanzhang'+i,{type:'voucher_img'});
                    });
                    //初始化swiper
                    window.mySwiper = new Swiper('.swiper-container', {
                        slidesPerView: 2,
                        spaceBetween: 20
                    });
                }, 0);
            },
            touxiangmianFn(url){  //身份证正面链接以及内容识别
                var _this = this;
                this.formData.files_idcard = url;
                if(!url){
                    return false;
                }
                this.shibieTip = '正在识别身份证信息...';
                this.canIptNum = false;    //识别中禁止输入身份证号
                let data = this.qs.stringify({
                    token:localStorage.token,
					isFront: 1,
                    image:url
				});
                this.axios.post('/customer/idcardcheck',data).then(function(res){
                    this.canIptNum = true;    //识别完成后恢复可以输入身份证号
                    if(res.data.code == 1){
                        this.formData.idcard_number = res.data.data.idcard;
                        this.formData.idcard_address = res.data.data.idcard_address;
                        _this.formData.customer_nation = res.data.data.native_address;
                        _this.shibieTip = '识别成功！';
                    }else{
                        _this.shibieTip = '识别失败，请手动输入身份证信息';
                        $('#IdcardNum').attr('placeholder', '请手动输入身份证号');
                        $('#IdcardAddress').attr('placeholder', '请手动输入住址');
                        //重新识别
                        shibieAgain();
                    }
                }.bind(this)).catch(function(err){
                    _this.$store.commit('msg',err);
                    $('#IdcardNum').attr('placeholder', '请手动输入身份证号');
                    $('#IdcardAddress').attr('placeholder', '请手动输入住址');
                    _this.shibieTip = '识别失败，请手动输入身份证信息';
                    _this.canIptNum = true;    //识别完成后恢复可以输入身份证号
                });
                //识别失败，重新识别
                function shibieAgain(){
                    if(!_this.touxiangmianFailNum){
                        return false;
                    }
                    _this.touxiangmianFailNum--;
                    _this.$refs.touxiangmianRef.shibieAgain('身份证信息识别失败，请重新上传图片');
                }
            },
            guohuimianFn(url){  //身份证背面图片链接以及内容识别
                var _this = this;
                this.formData.files_idcardback = url;
                if(!url){
                    return false;
                }
                this.shibieDateTip = '正在识别身份证有效截止时间...';
                this.canIptDate = false;
                let data = this.qs.stringify({
                    token:localStorage.token,
					isFront: 0,
                    image:url
				});
                this.axios.post('/customer/idcardcheck',data).then(function(res){
                    this.canIptDate = true;
                    if(res.data.code == 1){
                        let t = res.data.data.idcard_expiry_date + '';
                        let y = t.substr(0,4);
                        let m = t.substr(4,2);
                        let d = t.substr(6,2);
                        this.formData.idcard_expiry_date = y + '-' + m + '-' + d;
                        this.shibieDateTip = '身份证有效截止时间识别成功！';
                    }else{
                        $('#IdcardDate').attr('placeholder', '请手动输入身份证截止时间');
                        this.shibieDateTip = '身份证有效截止时间识别失败，请手动输入';
                        //重新识别
                        shibieAgain();
                    }
                }.bind(this)).catch(function(err){
                    _this.$store.commit('msg',err);
                    $('#IdcardDate').attr('placeholder', '请手动输入身份证截止时间');
                    _this.shibieDateTip = '身份证有效截止时间识别失败，请手动输入';
                    _this.canIptDate = true;    //识别完成后恢复可以输入身份证号
                });
                //识别失败，重新识别
                function shibieAgain(){
                    if(!_this.guohuimianFailNum){
                        return false;
                    }
                    _this.guohuimianFailNum--;
                    _this.$refs.guohuimianRef.shibieAgain('身份证有效期限识别失败，请重新上传图片');
                }
            },
            //身份证到期时间
            daoqiTimeFn(res){
                this.formData.idcard_expiry_date = res;
			},
            //转账凭证
			zhuanzhangFn(res, pickel){
                let index = pickel.substr(-2);
                if(isNaN(index)){
                    index = pickel.substr(-1);
                }
                this.formData.jzData[index].jz_voucher_img = res;
			},
            //银行卡照片
			bankpicFn(res){
				this.formData.files_bankcard = res;
			},
            //选择输入银行开户行
            selBank(e){
                let top = $(e.target).offset().top;
                $('body').scrollTop(parseInt(top)-45);
                if(this.formData.banks.length){
                    this.showBanks = true;
                }
            },
            //选择银行卡信息
            bankInfo(item){
                this.formData.bank_subbranch = item.subbranch_name;
                this.formData.bank_account = item.account_name;
                this.formData.bank_number = item.card_number;
                this.showBanks = false;
            },
            //删除进账信息
            deleteJz(jz_id){
                var _this = this;
                layer.open({
                    content:'确定要删除进账信息吗？',
                    btn:['确定','取消'],
                    yes:function(index){
                        layer.close(index);
                        let data = _this.qs.stringify({
                            token:localStorage.token,
                            jzid:jz_id
                        })
                        _this.axios.post('/huiqian/jzdel',data).then(function(res){
                            if(res.data.code == 1){
                                _this.$store.commit('msg', '删除成功');
                                window.mySwiper.destroy();
                                _this.fetchData();
                            }
                        });
                    }
                })
            },
            submit(){
                var _this = this;
                if(!this.canSubmit){
                    return false;
                }
                //验证开始 
                let d = this.formData;
                let data = {
                    token:localStorage.token,
                    cid: d.cid,
                    pid: d.product_id,
                    hqid: _this.hqid,
                    is_sub: d.huiqian_is_sub,
                    customer_name: d.customer_name,
                    customer_mobile: d.customer_mobile,
                    customer_email: d.customer_email,
                    customer_address: d.customer_current_address,
                    customer_idcard: d.idcard_number,
                    customer_idcard_address: d.idcard_address,
                    customer_nation: d.customer_nation,
                    customer_idcard_expiry_date: d.idcard_expiry_date,
                    huiqian_money: d.huiqian_money,
                    remark: d.huiqian_remark,
                    bank_subbranch: d.bank_subbranch,
                    bank_account_name: d.bank_account,
                    bank_card_number: d.bank_number,
                    voucher_img: d.files_voucher,
                    bankcard_img: d.files_bankcard,
                    idcard_img: d.files_idcard,
                    idcard_back_img: d.files_idcardback,
                    jzData:d.jzData,
                    huiqian_cycle:d.huiqian_cycle
                };
                //表单验证
                if(data.customer_name == ''){
                    this.$store.commit('msg','请输入客户姓名');
                    return false;
                }else if(data.customer_mobile == ''){
                    this.$store.commit('msg','请输入客户电话');
                    return false;
                }else if(!data.pid){
                    this.$store.commit('msg','请选择购买产品');
                    return false;
                }
                /* else if(!data.huiqian_money){
                    this.$store.commit('msg','请填写进账金额');
                    return false;
                } */
                _this.canSubmit = false;
                data = this.qs.stringify(data);
                this.axios.post('/huiqian/editsave',data).then(function(res){
                    if(res.data.code == 1){
                        _this.$store.commit('msg', '提交成功');
                        setTimeout(() => {
                           _this.$router.push({
                                path:'/order'
                            }) 
                        }, 2000);
                    }else{
                        _this.canSubmit = true;
                    }
                });
            }
        }
	}
</script>


<style lang="less" scoped="scoped">
    .swiper-container{
        padding: 0 15px;
        overflow:visible;
    }
    .shibie{
        padding:0 15px;color:#fe6e6e;font-size:12px;padding-top:10px;
        text-align: right;
    }
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
        line-height: 23px;
        padding: 0 0 0 10px;
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
