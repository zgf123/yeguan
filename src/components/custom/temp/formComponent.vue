<template>
	<div class="adr_input_show">
		<div class="row flex_align require">
			<div class="left flex_1">客户姓名(必填)</div>
			<div class="right flex_1 text_r"><input type="text" v-model="formData.real_name" placeholder="请输入客户姓名"></div>
		</div>
		<div class="row flex_align require">
			<div class="left flex_1">客户分组(必填)</div>
			<div class="right flex_1 text_r arrow">
                <component :is="'PickSelect'" :pickSelectData="customTeam" @pickSelectVal="customTeamVal">{{customTeam.def.text}}</component>
            </div>
		</div>
		<div class="row flex_align" v-show="customTeam.def.id == 1? true : false">
			<div class="left flex_1">客户状态</div>
			<div class="right flex_1 text_r arrow"><component :is="'PickSelect'" :pickSelectData="customState" @pickSelectVal="customStateVal">{{customState.def.text}}</component></div>
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
                <input type="tel" class="idcard_ipt" v-model="formData.idcard" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()" >
            </div>
        </div>
        <div class="row flex_align">
			<div class="left">住址</div>
			<div class="right flex_1 text_r">
                <input type="text" class="idcard_address_ipt" v-model="formData.idcard_address" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="text" class="idcard_address_ipt" v-model="formData.idcard_address" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()"  >
            </div>
		</div>
        <div class="row flex_align">
			<div class="left">民族</div>
			<div class="right flex_1 text_r">
                <input type="text" class="nation_ipt" v-model="formData.nation" placeholder="上传后系统自动识别" v-show="canIptNum">
                <input type="text" class="nation_ipt" v-model="formData.nation" placeholder="上传后系统自动识别" v-show="!canIptNum" readonly unselectable="on" onfocus="this.blur()"  >
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
                <component :is="'PickTime'" :PickTimeProp="formData.idcard_expiry_date" @PickTimeEmit="pickTimeFn" v-show="canIptDate"><input type="text" class="idcard_expiry_date_ipt" id="IdcardDate" v-model="formData.idcard_expiry_date" placeholder="上传后系统自动识别" readonly></component>
                <input type="text" class="idcard_expiry_date_ipt" v-model="formData.idcard_expiry_date" v-show="!canIptDate" placeholder="上传后系统自动识别" readonly="readonly" unselectable="on" onfocus="this.blur()" >
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
        <div class="marks">
            <div class="title">备注</div>
            <textarea v-model="formData.remark" placeholder="请输入备注信息"></textarea>
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
                cid:'',
                canSubmit:true, //限制双次提交
                shibieTip:'', //身份证号，识别状态提示信息
                shibieDateTip:'',  //身份证截止日期，识别状态提示信息
                canIptNum:true, //身份证号识别中，是否能输入
                canIptDate:true, //身份证截止日期识别中，是否能输入
                touxiangmianFailNum:2,//头像面识别失败次数
                guohuimianFailNum:2,//头像面识别失败次数
                is_mainland:false, //是否是中国大陆身份证
                formData:{
                    real_name:'',
                    mobile:'',
                    email:'',
                    is_vip:'0',
                    customer_tag:'意向',
                    current_address:'',
                    idcard:'',
                    idcard_address:'',
                    nation:'',
                    idcard_img:'',
                    idcardback_img:'',
                    idcard_expiry_date:'',
                    remark:''
                },
                customTeam:{
                    title:'请选择客户分组', //设置标题
                    def:{id:'1',text:'未成交客户'},
                    arr:[   //数组
                        {id:'1',text:'未成交客户'},
                        {id:'2',text:'成交客户'}
                    ]
                },
                customState:{
                    title:'请选择客户状态',
                    def:{id:'1',text:'意向'},
                    arr:[
                        {id:'1',text:'意向'},
                        {id:'2',text:'促单'}
                    ]
                }
			}
        },
        mounted(){
            adrShowInput();     //在安卓端调整键盘出现时,input的位置
            //获取参数
            this.cid = this.$route.params.id;
            if(this.cid){
                this.fetchData();
            }else{
                this.uploadInit();
            }
        },
        methods:{
            fetchData(){
                var _this = this;
                var data = this.qs.stringify({
                    token:localStorage.token,
					cid:_this.cid
				});
                this.axios.post('/customer/edit',data).then(function(res){
                    if(res.data.code == 1){
                        this.formData = res.data.data;
                        //修改客户状态字段
                        if(this.formData.tag !== undefined && this.formData.tag !== null ){
                            this.formData.customer_tag = this.formData.tag;
                            delete this.formData.tag;
                        }
                        
                        //重置客户分组状态
                        if(this.formData.is_vip == 1){
                            this.customTeam.def = this.customTeam.arr[1];
                        }else if(this.formData.is_vip == 0){
                            this.customTeam.def = this.customTeam.arr[0];
                            if(this.formData.customer_tag == '促单'){
                                this.customState.def = this.customState.arr[1];
                            }
                        }
                        //初始化上传插件
                        this.uploadInit();
                    }else{
                        this.$store.commit('msg', res.data.message);
                    }
                }.bind(this))
            },
            //图片上传初始化
            uploadInit(){
                var _this = this;
                setTimeout(() => {
                    _this.$refs.touxiangmianRef.uploadInit('#touxiangmian',{type:'idcard',msg:'身份证头像面'});
                    _this.$refs.guohuimianRef.uploadInit('#guohuimian',{type:'idcard_back',msg:'身份证国徽面'});
                }, 0);
            },
            //客户分组
            customTeamVal(res){
                this.customTeam.def = res;
                if(res.id == 1){
                    this.formData.is_vip = 0;
                }else{
                    this.formData.is_vip = 1;
                }
            },
            //客户状态
            customStateVal(res){
                this.customState.def = res;
                this.formData.customer_tag = res.text;
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
            //身份证正面链接以及内容识别
            touxiangmianFn(url){
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
                //识别
                _this.axios.post('/customer/idcardcheck',data).then(function(res){
                    _this.canIptNum = true;    //识别完成后恢复可以输入身份证号
                    if(res.data.code == 1){
                        _this.formData.idcard = res.data.data.idcard;
                        _this.formData.idcard_address = res.data.data.idcard_address;
                        _this.formData.nation = res.data.data.native_address;
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
                    _this.canIptNum = true;
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
            //身份证背面图片链接以及内容识别
            guohuimianFn(url){  
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
                this.shibieDateTip = '正在识别身份证有效期限...';
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
                        this.shibieDateTip = '身份证有效期限识别成功！';
                    }else{
                        this.shibieDateTip = '身份证有效期限识别失败，请手动输入';
                        $('#IdcardDate').attr('placeholder', '请手动输入身份证截止时间');
                        //重新识别
                        shibieAgain();
                    }
                }.bind(this)).catch(function(err){
                    _this.$store.commit('msg',err);
                    $('#IdcardDate').attr('placeholder', '请手动输入身份证截止时间');
                    _this.shibieDateTip = '身份证有效期限识别失败，请手动输入';
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
            //手动选择身份证到期时间
            pickTimeFn(res){
                this.formData.idcard_expiry_date = res;
            },
            //提交订单
            submit(){
                var _this = this;
                
                if(!this.canSubmit){
                    return false;
                }
                //验证开始
                var data = $.extend({}, this.formData);
                //验证
                if(data.real_name == ''){
                    this.$store.commit('msg','请输入客户姓名');
                    return false;
                }else if(data.mobile == ''){
                    this.$store.commit('msg','请输入客户电话');
                    return false;
                }

                this.canSubmit = false;
                data.token = localStorage.token;
                let isVip = data.is_vip;
                data = this.qs.stringify(data);
                this.axios.post('/customer/save',data).then(function(res){
                    if(res.data.code == 1){
                        this.$store.commit('msg', res.data.message);
                        setTimeout(() => {
                            _this.$router.push({
                                path:'/custom/list',
                                query:{
                                    is_vip: isVip
                                }
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
    .shibie{
        padding:0 15px;color:#fe6e6e;font-size:12px;padding-top:10px;
        text-align: right;
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
