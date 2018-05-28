<template>
<div class="orderContainer">
	<component :is="'Header'"></component>
    <div class="Page content adr_input_box adr_input_show" :style="'transform:translate3d('+ (isSelectFoundShow-1)*10 +'rem,0,0);'">
        <!-- 基本信息 -->
        <div class="row flex_align require">
            <div class="left flex_1">客户姓名(必填)</div>
            <div class="right flex_1 text_r"><input type="text" v-model="formData.real_name" placeholder="请输入客户姓名"></div>
        </div>
        <div class="row flex_align require">
            <div class="left flex_1">手机号码(必填)</div>
            <div class="right flex_1 text_r"><input type="tel" v-model="formData.mobile" placeholder="请输入客户电话"></div>
        </div>
        <div class="card_face">
            <div class="title flex_align">
                <div class="flex_1">身份证头像面</div>
                <div class="not_mainland" @click="isMainland"><span><b v-show="is_mainland"><img src="/public/img/check_yes.png" alt=""></b></span>非中国大陆身份证</div>
            </div>
            <div class="cardbox cr">
                <div class="example">
                    <img src="/public/img/card_face_example.jpg" alt="">
                </div>
                <div class="card">
                    <component :is="'UploadPic'" ref="touxiangmianRef" :uploadProp="formData.idcard_img" @uploadEmit="touxiangmianFn" class="upload_pic" id="touxiangmian"></component>
                </div>
            </div>
        </div>
        <div class="shibie" v-show="shibieTip">{{shibieTip}}</div>
        <div class="row flex_align">
            <div class="left">身份证号</div>
            <div class="right flex_1 text_r">
                <input type="tel" class="idcard_ipt" v-model="formData.idcard" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="tel" class="idcard_ipt" v-model="formData.idcard" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()">
            </div>
        </div>
        <div class="row flex_align">
            <div class="left">住址</div>
            <div class="right flex_1 text_r">
                <input type="text" class="idcard_address_ipt" v-model="formData.idcard_address" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="text" class="idcard_address_ipt" v-model="formData.idcard_address" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()">
            </div>
        </div>
        <div class="row flex_align">
            <div class="left">民族</div>
            <div class="right flex_1 text_r">
                <input type="text" class="nation_ipt" v-model="formData.nation" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="text" class="nation_ipt" v-model="formData.nation" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()">
            </div>
        </div>
        <div class="card_face">
            <div class="title">身份证国徽面</div>
            <div class="cardbox cr">
                <div class="example">
                    <img src="/public/img/card_back_example.jpg" alt="">
                </div>
                <div class="card">
                    <component class="upload_pic" :is="'UploadPic'" id="guohuimian" ref="guohuimianRef" :uploadProp="formData.idcardback_img" @uploadEmit="guohuimianFn"></component>
                </div>
            </div>
        </div>
        <div class="shibie" v-show="shibieDateTip">{{shibieDateTip}}</div>
        <div class="row flex_align">
            <div class="left flex_1">身份证有效期限</div>
            <div class="right flex_1 text_r">
                <component :is="'PickTime'" :PickTimeProp="formData.idcard_expiry_date" @PickTimeEmit="daoqiTimeFn" v-show="canIptDate"><input type="text" class="idcard_expiry_date_ipt" v-model="formData.idcard_expiry_date" placeholder="上传后系统自动识别" readonly></component>
                <input type="text" class="idcard_expiry_date_ipt" v-model="formData.idcard_expiry_date" v-show="!canIptDate" placeholder="上传后系统自动识别" readonly unselectable="on" onfocus="this.blur()">
            </div>
        </div>
        <div class="row flex_align">
            <div class="left">邮寄地址</div>
            <div class="right flex_1 text_r"><input v-model="formData.current_address" type="text" placeholder="请输入邮寄地址"></div>
        </div>
        <div class="row flex_align">
            <div class="left flex_1">邮箱</div>
            <div class="right flex_1 text_r"><input type="text" v-model="formData.email" placeholder="请输入邮箱账号"></div>
        </div>

        <!-- 录单开始 -->
        <div style="background-color:#eeeeee;height:12px;"></div>
        <div class="row flex_align require">
            <div class="left">购买产品(必填)</div>
            <div class="right flex_1 text_r arrow" @click="showSelectFound">{{product_name}}</div>
        </div>
        <div class="row flex_align require">
            <div class="left flex_1">进账金额(必填)</div>
            <div class="flex_1 text_r ipt"><input type="number" v-model="formData.summoney" placeholder="请填写进账金额"></div>
            <div style="color:#888;">&nbsp;万元</div>
        </div>
        <div class="row flex_align">
            <div class="left">投资周期</div>
            <div class="flex_1 text_r ipt"><input type="tel" v-model="formData.huiqian_cycle" placeholder="请输入投资周期"></div>
            <div style="color:#888;">&nbsp;月期</div>
        </div>
        <div class="row flex_align pos_r">
            <div class="left">结算银行开户行</div>
            <div class="right flex_1 text_r"><input type="text" v-model="formData.bank_subbranch" @focus="selBank($event)" placeholder="请填写结算银行开户行"></div>
            <div class="banksbox" v-show="showBanks">
                <ul>
                    <li class="bor_b text_o" v-for="(item,index) in formData.banks" :key="index" @click="bankInfo(item)">{{item.card_number}} {{item.subbranch_name}}</li>
                </ul>
                <div class="close cr"><span @click="showBanks = false">关闭</span></div>
            </div>
        </div>
        <div class="row flex_align">
            <div class="left">结算银行卡号</div>
            <div class="right flex_1 text_r"><input type="tel" v-model="formData.bank_card_number" placeholder="请填写结算银行卡号"></div>
        </div>
        <div class="row flex_align">
            <div class="left">结算账户名称(卡主姓名)</div>
            <div class="right flex_1 text_r"><input type="text" v-model="formData.bank_account_name" placeholder="请填写卡主姓名"></div>
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
        <div class="card_face">
            <div class="title">请上传银行卡照片</div>
            <div class="cardbox cr">
                <div class="example">
                    <img src="/public/img/bank_ka_ex.jpg" alt="">
                </div>
                <div class="card">
                    <component class="upload_pic" :is="'UploadPic'" id="bankpic" ref="bankpicRef" :uploadProp="''" @uploadEmit="bankpicFn"></component>
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
        <div class="marks">
            <div class="title">备注</div>
            <textarea v-model="formData.remark" placeholder="请输入备注信息"></textarea>
        </div>
        <div class="submitbox"><div class="submit btn_active" @click="submit">提交</div></div>
    </div>
    
    <!-- 选择基金项目 -->
    <component :is="'Products'" @selectProductEmit="selectProductFn" :style="'transform:translate3d('+ (isSelectFoundShow*10) +'rem,0,0);'"></component>
</div>
</template>
<script>
    import Products from './temp/Products.vue'
	export default{
        name:'orderAdd',
		data(){
			return{
                shibieTip:'', //身份证号，识别状态提示信息
                shibieDateTip:'',  //身份证截止日期，识别状态提示信息
                canIptNum:true, //身份证号识别中，是否能输入
                canIptDate:true, //身份证截止日期识别中，是否能输入
                touxiangmianFailNum:2,//头像面识别失败次数
                guohuimianFailNum:2,//头像面识别失败次数
                is_mainland:false, //是否是中国大陆身份证
                cid:'',
                canSubmit:true, //限制双次提交
                product_name:'请选择基金',
                isSelectFoundShow:1,
                formData:{
                    cid:'',
                    pid:'',
                    customer_name:'',
                    summoney:'',
                    is_sub: '0',
                    remark:'测试',
                    bank_subbranch:'',
                    bank_account_name:'',
                    bank_card_number:'',
                    voucher_img:'',
                    bankcard_img:''
                },
                showBanks:false //银行卡信息是否显示
			}
        },
        components:{
            Products
        },
        mounted(){
            adrShowInput();
            //获取参数
            this.cid = this.$route.params.id;
            this.fetchData();
        },
        methods:{
            fetchData(){
                var _this = this;
                var data = this.qs.stringify({
                    token:localStorage.token,
					cid:_this.cid
				});
                this.axios.post('/huiqian/add',data).then(function(res){
                    if(res.data.code == 1){
                        this.formData = $.extend({}, this.formData, res.data.data);
                        //优化杂质信息
                        this.formData.remark = '';
                        
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
                    _this.$refs.zhuanzhangRef.uploadInit('#zhuanzhang',{type:'voucher_img'});
                    _this.$refs.bankpicRef.uploadInit('#bankpic',{type:'bankcard_img'});
                }, 0);
            },
            showSelectFound(){
                this.isSelectFoundShow = 0;
            },
            //产品选择
            selectProductFn(pro){
                this.isSelectFoundShow = 1;
                if(!pro) return false;
                this.formData.pid = pro.product_id;
                this.product_name = pro.product_name;
            },
            //是否是中国大陆身份证
            isMainland(){
                this.is_mainland = !this.is_mainland;
                if(this.is_mainland){
                    this.touxiangmianFailNum = 0;
                    this.guohuimianFailNum = 0;
                    $('.idcard_ipt').attr('placeholder', '请输入身份证号');
                    $('.idcard_address_ipt').attr('placeholder', '请输入住址');
                    $('.nation_ipt').attr('placeholder', '请输入所属民族');
                    $('.idcard_expiry_date_ipt').attr('placeholder', '请选择身份证到期时间');
                }else{
                    this.touxiangmianFailNum = 2;
                    this.guohuimianFailNum = 2;
                    $('.idcard_ipt').attr('placeholder', '上传后自动识别');
                    $('.idcard_address_ipt').attr('placeholder', '上传后自动识别');
                    $('.nation_ipt').attr('placeholder', '上传后自动识别');
                    $('.idcard_expiry_date_ipt').attr('placeholder', '上传后自动识别');
                }
            },
            touxiangmianFn(url){  //身份证正面链接以及内容识别
                //如果非大陆身份证，不识别
                if(this.is_mainland){
                    return false;
                }
                //如果是，识别
                var _this = this;
                this.formData.idcard_img = url;
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
                        this.formData.idcard = res.data.data.idcard;
                        this.formData.idcard_address = res.data.data.idcard_address;
                        _this.formData.nation = res.data.data.native_address;
                        _this.shibieTip = '识别成功！';
                    }else{
                        _this.shibieTip = '识别失败，请手动输入身份证信息';
                        $('#IdcardNum').attr('placeholder', '请手动输入身份证号');
                        $('#IdcardAddress').attr('placeholder', '请手动输入住址');
                        _this.$store.commit('msg','身份证信息识别失败');
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
                //如果非大陆身份证，不识别
                if(this.is_mainland){
                    return false;
                }
                //如果是，识别
                var _this = this;
                this.formData.idcardback_img = url;
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
                        this.shibieDateTip = '身份证有效截止时间识别失败，请手动输入';
                        $('#IdcardDate').attr('placeholder', '请手动输入身份证截止时间');
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
			zhuanzhangFn(res){
                this.formData.voucher_img = res;
			},
            //银行卡照片
			bankpicFn(res){
				this.formData.bankcard_img = res;
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
                this.formData.bank_account_name = item.account_name;
                this.formData.bank_card_number = item.card_number;
                this.showBanks = false;
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
                    pid: d.pid,
                    customer_name: d.real_name,
                    customer_mobile: d.mobile,
                    customer_email: d.email,
                    customer_address: d.current_address,
                    customer_idcard: d.idcard,
                    customer_idcard_expiry_date: d.idcard_expiry_date,
                    huiqian_money: d.summoney,
                    is_sub:d.is_sub,
                    remark: d.remark,
                    bank_subbranch: d.bank_subbranch,
                    bank_account_name: d.bank_account_name,
                    bank_card_number: d.bank_card_number,
                    voucher_img: d.voucher_img,
                    bankcard_img: d.bankcard_img,
                    idcard_img: d.idcard_img,
                    customer_idcard_address: d.idcard_address,
                    customer_nation:d.nation,
                    idcard_back_img: d.idcardback_img,
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
                }else if(!data.huiqian_money){
                    this.$store.commit('msg','请填写进账金额');
                    return false;
                }else if(data.huiqian_money<0){
                    this.$store.commit('msg','进账金额不能小于零');
                    return false;
                }

                //录单完成后，提示：请确认是否完成进账
                /* if(data.is_sub == 0){
                    layer.open({
                        content:'请确认是否完成进账',
                        shadeClose:false,
                        btn:['是', '否'],
                        yes:function(index){
                            layer.close(index);
                            _this.formData.is_sub = 1;
                            data.is_sub = 1;
                            tijiao();
                        },
                        no:function(){
                            tijiao();
                        }
                    })
                }else{
                    tijiao();
                } */
                tijiao();
                function tijiao(){
                    _this.canSubmit = false;
                    data = _this.qs.stringify(data);
                    _this.axios.post('/huiqian/addsave',data).then(function(res){
                        if(res.data.code == 1){
                            _this.$store.commit('msg', res.data.message);
                            setTimeout(() => {
                                _this.$router.push({
                                    path:'/order'
                                })
                            }, 2000);
                        }else{
                            _this.$store.commit('msg', '提交时发生错误，请重新提交');
                            _this.canSubmit = true;
                        }
                    });
                }
            }
        }
	}
</script>


<style lang="less" scoped="scoped">
    .shibie{
        padding:0 15px;color:#fe6e6e;font-size:12px;padding-top:10px;
        text-align: right;
    }
    .orderContainer{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        top:0;
        left:0;
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
	.moveOutT {
	  animation-name: moveOutT;
	}
	
	.content{
		background-color: #fff;
        transition: .3s;
	}
	.notxt{
		color: #b5b5b5;
	}
	.row{
		font-size: 17px;
		color: #333;
		padding:5px 15px;
		line-height: 1.4;
		position: relative;
        min-height: 50px;
        input{
            font-size: 17px;
            text-align: right;
            color: #333;
        }
        .ipt{
            input{
                width: 100%;
                color: #888;
            }
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
        .arrow{
            padding-right: 17px;
            background: url(/public/img/arrow_icon.png) no-repeat center right;
            background-size: 10px 15px;
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
    .right_c{
        color: #888;
        font-size: 17px;
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
    .not_mainland{
        color:#666;
        span{
            vertical-align: middle;
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 1px solid #ff8b03;
            border-radius: 50%;
            margin-top: -3px;
            margin-right: 5px;
            position:relative;
            b{
                display: block;
                background-color: #ff8b03;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }
    }
</style>
