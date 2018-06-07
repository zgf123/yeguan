<template>
<div>
	<div :class="xBar"></div>
    <div id="app" :class="pageContainer">
      	<keep-alive :include="/^Alive_/">
          	<router-view></router-view>
      	</keep-alive>
    </div>
</div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
              msg: '',
              toPath:'',
			  xBar:'',
			  pageContainer:''
            }
		},
		mounted(){
			var _this = this;
			this.isIphoneX();
			window.navBack = function() {
				/* console.log(_this.$route.path);
				return false; */
				let curPath = _this.$route.path;
				if ( cusAndroid && (curPath == '/home' || curPath == '/login') ) {
					window.android.navBack();
					return false;
				};

				let backUrl = _this.$route.meta.backUrl;
				if(backUrl == '/custom/list'){
					_this.$router.push({
						path: backUrl,
						query:{
							is_vip:_this.$route.query.is_vip
						}
					})
				}else if( !backUrl ){
					_this.$router.go(-1);
				}else{
					_this.$router.push({
						path: backUrl
					});
				}
			};
		},
		methods:{
			isIphoneX(){
				if(is_AdrIos() == 'ios'){
					let screenW = window.screen.width;
					let screenH = window.screen.height;
					if(screenH == 812 && screenW == 375){
						this.xBar = 'x_bar';
						this.pageContainer = 'PageContainer';
					}
				}
			}
		}
    }
</script>
<style lang="less" scoped>
  	.PageContainer{
		position: absolute;
		left:0;
		top:22px;
		bottom:0;
		right: 0;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.x_bar{
		height: 22px;
		background-color: #ffa043;
	}
</style>
