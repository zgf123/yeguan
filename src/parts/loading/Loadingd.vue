<template>
    <div class="zns-loading">
    	<div class="spinner">
		  <div class="double-bounce1"></div>
		  <div class="double-bounce2"></div>
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

		width: 60px;
		height: 60px;
		background-color: transparent;
		 
		margin: -30px auto auto -30px;
	  	-webkit-animation: rotateplane 1.2s infinite ease-in-out;
  		animation: rotateplane 1.2s infinite ease-in-out;
	}
	 
	.double-bounce1, .double-bounce2 {
	  width: 100%;
	  height: 100%;
	  border-radius: 50%;
	  background-color: #fff;
	  opacity: 0.6;
	  position: absolute;
	  top: 0;
	  left: 0;
	   
	  -webkit-animation: bounce 2.0s infinite ease-in-out;
	  animation: bounce 2.0s infinite ease-in-out;
	}
	 
	.double-bounce2 {
	  -webkit-animation-delay: -1.0s;
	  animation-delay: -1.0s;
	}
	 
	@-webkit-keyframes bounce {
	  0%, 100% { -webkit-transform: scale(0.0) }
	  50% { -webkit-transform: scale(1.0) }
	}
	 
	@keyframes bounce {
	  0%, 100% {
	    transform: scale(0.0);
	    -webkit-transform: scale(0.0);
	  } 50% {
	    transform: scale(1.0);
	    -webkit-transform: scale(1.0);
	  }
	}
</style>