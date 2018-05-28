<template>
	<div class="Login">
		<h1>业管系统</h1>
		<div class="formbox">
			<div class="iptbox">
				<div class="row bor_b flex_align">
					<div class="left"><label for="user_name">账号</label></div>
					<div class="right"><input type="text" name="user_name" id="user_name" v-model="user_name" placeholder="请输入账号"></div>
				</div>
				<div class="row bor_b flex_align">
					<div class="left"><label for="password">密码</label></div>
					<div class="right"><input type="password" name="password" id="password" v-model="password" placeholder="请输入密码"></div>
				</div>
				<div class="row"></div>
			</div>
			<button type="button" class="login_btn btn_active" @click="fetchData">登录</button>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				user_name:'',
				password:''
			}
		},
		mounted(){
			$('.com_header').hide();

			//ceshi
			// var userAgent = window.navigator.userAgent;
			// $('#zzz').html(userAgent);
		},
		methods:{
			fetchData(){
				var _this = this;
				if(this.user_name == ''){
					layer.open({
					    content: '请输入账号'
					    ,skin: 'msg'
					    ,time: 2
					});
					return false;
				}else if(this.password == ''){
					layer.open({
					    content: '密码不能为空'
					    ,skin: 'msg'
					    ,time: 2
					});
					return false;
				}
				var data = this.qs.stringify({
					'user_name':this.user_name,
					'password':this.password,
					'device_token':localStorage.devicetoken,
					'device_type':localStorage.devicetype
				});
                this.axios.post('/user/login',data).then(function(res){
					if(res.data.code == 1){
						let localData = $.extend({}, res.data.data);
						localStorage.info = JSON.stringify(localData);
						localStorage.token = res.data.data.token;
						if(cusAndroid){
							try {
								window.android.setToken(res.data.data.token);
							} catch (error) {
								_this.$store.commit('msg', '程序错误,请稍后再试');
							}
						}
						this.$router.replace({
							path:'/home'
						});
					}else{
						var resmsg = res.data.message;
						layer.open({
						    content: resmsg
						    ,skin: 'msg'
						    ,time: 2
						});
					}
                }.bind(this)).catch(function(err){
                    /* layer.open({
					    content: '请关闭浏览器无痕浏览模式'
					    ,skin: 'msg'
					}); */
                })
            }
		}
	}
</script>
<style lang="less" scoped>
	.Login{
		position: absolute;
		width: 100%;
		height: 100%;
		left:0;
		top:0;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
