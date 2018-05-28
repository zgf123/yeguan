<template>
<div>
	<component :is="'Header'"></component>
	<div class="System adr_input_box adr_input_show Page">
		<div class="info_cells bor_b">
			<div class="cell flex_align bor_b">
				<div class="left">用户名</div>
				<div class="right flex_1">{{resdata.user_name}}</div>
			</div>
			<div class="cell flex_align bor_b">
				<div class="left">真实姓名</div>
				<div class="right flex_1">{{resdata.real_name}}</div>
			</div>
			<div class="cell flex_align">
				<div class="left">所属部门</div>
				<div class="right flex_1">{{resdata.department_name}}</div>
			</div>
		</div>
		<div class="info_cells bor_b">
			<div class="cell flex_align bor_b">
				<div class="left">手机号码</div>
				<div class="right flex_1">
					<template v-if="resdata.mobile">
						{{resdata.mobile}}
					</template>
					<template v-else>
						<input type="tel" v-model="mobile" maxlength="11" placeholder="请输入手机号码" datatype="m" nullmsg="请输入手机号码" errormsg="请输入正确的手机号码">
					</template>
				</div>
			</div>
			<!-- <div class="cell flex_align bor_b">
				<div class="left">身份证号</div>
				<div class="right flex_1">
					<template v-if="resdata.idcard">
						{{resdata.idcard}}
					</template>
					<template v-else>
						<input type="text" v-model="idcard" placeholder="请输入身份证号码" nullmsg="请输入身份证号" errormsg="请输入正确的身份证号码">
					</template>
				</div>
			</div> -->
			<div class="cell flex_align bor_b">
				<div class="left">新密码</div>
				<div class="right flex_1"><input type="password" v-model="password" name="userpassword" value="" placeholder="请输入新密码" datatype="*6-16" ignore="ignore" nullmsg="请设置密码！" errormsg="密码范围在6~16位之间！" ></div>
			</div>
			<div class="cell flex_align">
				<div class="left">重复新密码</div>
				<div class="right flex_1"><input type="password" v-model="repassword" value="" placeholder="请重新输入新密码" :ignore="ignore" datatype="*" recheck="userpassword" nullmsg="请再输入一次密码！" errormsg="您两次输入的密码不一致！" ></div>
			</div>
		</div>
		<div class="info_cells">
			<div class="info_text">
				<label class="txt_label" for="remarks">个人介绍</label>
				<div class="text_area">
					<textarea name="remarks" id="remarks" v-model="baktext" placeholder="理财顾问个人介绍"></textarea>
				</div>
			</div>
		</div>
		<div class="info_cells bor_b">
			<div class="cell flex_align">
				<div class="left">展示个人信息</div>
				<div class="right flex_1 text_r">
					<span class="complate" @click="resdata.show_intro = resdata.show_intro == 1 ? 0 : 1">
	                    <b :class="resdata.show_intro == 1 ? 'on' : ''"></b>
	                </span>
				</div>
			</div>
		</div>

		<button type="button" class="submit">保存</button>
	</div>
</div>
</template>
<script>
	export default{
		name:'system',
		data(){
			return{
				canSubmit:true, //是否可以提交
				ignore:'ignore',
				resdata:'',
				password:'',
				repassword:'',
				baktext:'',
				mobile:'',
				idcard:'',
				show_intro:0
			}
		},
		mounted(){
			this.fetchData();
			this.validformInit();
			adrShowInput();
		},
		methods:{
			fetchData(){
				var _this = this;
				var data = this.qs.stringify({
					token:localStorage.token
				});
                this.axios.post('/user/edit',data).then(function(res){
                    this.resdata = res.data.data;
					this.baktext = this.resdata.intro || '';
                }.bind(this))
            },
            tijiao(){
            	var _this = this;
				_this.canSubmit = false;
            	var data = this.qs.stringify({
            		token:localStorage.token,
					mid:JSON.parse(localStorage.info).mid,
					// mobile:this.mobile || this.resdata.mobile,
					intro:_this.baktext,
					password:this.password,
					show_intro:this.resdata.show_intro
            	});
				this.axios.post('/user/save',data).then(function(res){
					_this.canSubmit = true;
                    if(res.data.code == 1){
						// console.log(data);
						layer.open({
							content: '保存成功'
							,skin: 'msg'
							,time: 2
						});
						/* setTimeout(() => {
							localStorage.clear();
							_this.$router.replace({
								path:'/login'
							})
						}, 2000); */
					}else{
						layer.open({
							content: '提交时发生错误，请重新提交'
							,btn: '确定'
						});
					}
                }.bind(this));
            },
            validformInit(){
				var _this = this;
				
				function tiptype(msg,o,cssctl){
					if(!_this.canSubmit){
						return false;
					}

					switch(o.type){
						case 3:
							// o.obj.next('span.errormsg').text(msg);
							layer.open({
							    content: msg
							    ,skin: 'msg'
							    ,time: 2
							});
							break;
					}
				};
				var demo = $('.System').Validform({
					btnSubmit:'.submit',
					tiptype:tiptype,
					tipSweep:true,
					showAllError:false,
					datatype:{
						'm':/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/,
						'idcard':function(gets,obj,curform,datatype){
							var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子;
							var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值，10代表X;
						
							if (gets.length == 15) {   
								return isValidityBrithBy15IdCard(gets);   
							}else if (gets.length == 18){   
								var a_idCard = gets.split("");// 得到身份证数组   
								if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {   
									return true;   
								}   
								return false;
							}
							return false;
							
							function isTrueValidateCodeBy18IdCard(a_idCard) {   
								var sum = 0; // 声明加权求和变量   
								if (a_idCard[17].toLowerCase() == 'x') {   
									a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作   
								}   
								for ( var i = 0; i < 17; i++) {   
									sum += Wi[i] * a_idCard[i];// 加权求和   
								}   
								var valCodePosition = sum % 11;// 得到验证码所位置   
								if (a_idCard[17] == ValideCode[valCodePosition]) {   
									return true;   
								}
								return false;   
							}
							
							function isValidityBrithBy18IdCard(idCard18){   
								var year = idCard18.substring(6,10);   
								var month = idCard18.substring(10,12);   
								var day = idCard18.substring(12,14);   
								var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
								// 这里用getFullYear()获取年份，避免千年虫问题   
								if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
									return false;   
								}
								return true;   
							}
							
							function isValidityBrithBy15IdCard(idCard15){   
								var year =  idCard15.substring(6,8);   
								var month = idCard15.substring(8,10);   
								var day = idCard15.substring(10,12);
								var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
								// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
								if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
									return false;   
								}
								return true;
							}
						}
					},
					beforeCheck:function(curform){
						//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
						//这里明确return false的话将不会继续执行验证操作;

						// 密码可填可不填
						if(_this.password == '' && _this.repassword == ''){
							_this.ignore = 'ignore';
						}else{
							_this.ignore = '';
						}
					},
					beforeSubmit:function(curform){
						//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
						//这里明确return false的话表单将不会提交;
						_this.tijiao();
						return false;
					}
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.System .info_cells .info_text .txt_label{
		font-size: 14px;
		color: #333333;
		line-height: 36px;
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
</style>
