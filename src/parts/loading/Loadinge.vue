<template>
    <div class="zns-loading">
    	<div class="spinner">
		  <div class="bounce1"></div>
		  <div class="bounce2"></div>
		  <div class="bounce3"></div>
		</div>
    </div>
</template>
<script>
	export default{
		data(){
			return{
				msg:''
			}
		}
	}
</script>
<style scoped>
	.zns-loading{
		position: fixed;
		z-index: 1000;
		top:0;
		bottom:0;
		width:100%;
		height:100%;
		background-color: rgba(0,0,0,0.6);
	}
	.spinner {
	  position: absolute;
	  top:50%;
	  left:50%;

		width: 150px;
		height: 70px;
		background-color: transparent;
		text-align: center;
		 
		margin: -35px auto auto -75px;
	  	-webkit-animation: rotate 2.0s infinite linear;
  		animation: rotate 2.0s infinite linear;
	}
	 
	.spinner > div {
	  width: 30px;
	  height: 30px;
	  background-color: #fff;
	 
	  border-radius: 100%;
	  display: inline-block;
	  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
	  animation: bouncedelay 1.4s infinite ease-in-out;
	  /* Prevent first frame from flickering when animation starts */
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}
	 
	.spinner .bounce1 {
	  -webkit-animation-delay: -0.32s;
	  animation-delay: -0.32s;
	}
	 
	.spinner .bounce2 {
	  -webkit-animation-delay: -0.16s;
	  animation-delay: -0.16s;
	}
	 
	@-webkit-keyframes bouncedelay {
	  0%, 80%, 100% { -webkit-transform: scale(0.0) }
	  40% { -webkit-transform: scale(1.0) }
	}
	 
	@keyframes bouncedelay {
	  0%, 80%, 100% {
	    transform: scale(0.0);
	    -webkit-transform: scale(0.0);
	  } 40% {
	    transform: scale(1.0);
	    -webkit-transform: scale(1.0);
	  }
	}
</style>