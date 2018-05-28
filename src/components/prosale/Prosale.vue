<template>
<div>
	<component :is="'Header'"></component>
	<div class="Prosale Page">
		<div class="cus_head">
			<ul class="cr">
				<li class="on">在售产品</li>
				<li>产品动态</li>
			</ul>
			<div class="range"></div>
		</div>
		<transition enter-active-class="animated animatedPage fadeInUpSmall" leave-active-class="animated animatedPage fadeOutDownSmall">
			<component :is="'Onsale'" v-show="!isShow"></component>
		</transition>
		<transition enter-active-class="animated animatedPage fadeInUpSmall" leave-active-class="animated animatedPage fadeOutDownSmall">
			<component :is="'Pronews'" v-show="isShow"></component>
		</transition>
	</div>
</div>
</template>
<script>
	import Onsale from './temp/Onsale.vue';
	import Pronews from './temp/Pronews.vue';
	export default{
		name: 'prosale',
		data(){
			return{
				isShow:sessionStorage.isShow || 0
			}
		},
		computed:{
            loading(){
                return this.$store.state.loading;
            }
		},
		components: {
			Onsale,
			Pronews
		},
		mounted(){
		   	this.slideTab();
		},
		beforeRouteLeave (to, from, next) {
		    sessionStorage.clear('isShow');
		    next();
		},
		methods:{
            slideTab(){
            	var _this = this;
            	$('.cus_head li').eq(this.isShow).addClass('on').siblings().removeClass('on');
            	$('.cus_head .range').css('left',5*this.isShow+'rem');
            	$('.cus_head li').click(function(){
					var __this = this;
					var index = $(this).index();
					$(this).addClass('on').siblings().removeClass('on');
					$('.cus_head .range').css('left',5*index+'rem');
					_this.isShow=index;
				});
            },
            proInfo(pid){
            	this.$router.push({
            		path:'/prosaleinfo',
            		query:{
            			pid:pid
            		}
            	})
            },
            lookDetail(pid,name){
            	this.$router.push({
            		path:'/itemdetail',
            		query:{
            			name,
            			pid:pid
            		}
            	})
            },
            lookFile(link){
            	window.location.href=link;
            }
		}
	}
</script>
<style scoped="scoped">
	.animatedPage {
		animation-duration: .4s;
		animation-fill-mode: both;
		position: absolute;
		top:57px;
		width: 100%;
		left:0;
	}
</style>