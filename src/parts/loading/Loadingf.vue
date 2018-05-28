<template>
    <div class="zns-loading">
    	<div class="spinner">
			<div class="rect1"></div>
			<div class="rect2"></div>
			<div class="rect3"></div>
			<div class="rect4"></div>
			<div class="rect5"></div>
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
		top:65px;
		bottom:0;
		width:100%;
		height:100%;
		background-color: #f4f4f4;
	}
	/*.spinner {
	  position: absolute;
	  top:50%;
	  left:50%;
	  width: 50px;
	  height: 60px;
	  text-align: center;
	  margin-top: -30px;
	  margin-left:-25px;
	}*/
	.spinner {
	  width: 50px;
	  height: 60px;
	  text-align: center;
	  margin: 40px auto;
	}
	 
	.spinner > div {
	  background-color: #fa7e7e;
	  height: 100%;
	  width: 4px;
	  display: inline-block;
	   
	  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
	  animation: stretchdelay 1.2s infinite ease-in-out;
	}
	 
	.spinner .rect2 {
	  -webkit-animation-delay: -1.1s;
	  animation-delay: -1.1s;
	}
	 
	.spinner .rect3 {
	  -webkit-animation-delay: -1.0s;
	  animation-delay: -1.0s;
	}
	 
	.spinner .rect4 {
	  -webkit-animation-delay: -0.9s;
	  animation-delay: -0.9s;
	}
	 
	.spinner .rect5 {
	  -webkit-animation-delay: -0.8s;
	  animation-delay: -0.8s;
	}
	 
	@-webkit-keyframes stretchdelay {
	  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
	  20% { -webkit-transform: scaleY(1.0) }
	}
	 
	@keyframes stretchdelay {
	  0%, 40%, 100% {
	    transform: scaleY(0.4);
	    -webkit-transform: scaleY(0.4);
	  }  20% {
	    transform: scaleY(1.0);
	    -webkit-transform: scaleY(1.0);
	  }
	}
</style>