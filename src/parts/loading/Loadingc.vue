<template>
    <div class="zns-loading">
    	<div class="spinner"></div>
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
		background-color: #fff;
		 
		margin: -30px auto auto -30px;
	  	-webkit-animation: rotateplane 1.2s infinite ease-in-out;
  		animation: rotateplane 1.2s infinite ease-in-out;
	}
	 
	@-webkit-keyframes rotateplane {
	  0% { -webkit-transform: perspective(120px) }
	  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
	  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
	}
	 
	@keyframes rotateplane {
	  0% {
	    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
	  } 50% {
	    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
	  } 100% {
	    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	  }
	}
</style>