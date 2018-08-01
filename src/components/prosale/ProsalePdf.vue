<template>
<div>
	<component :is="'Header'"><div class="header_title text_o" slot="title">{{$route.query.name || 'pdf预览'}}</div></component>
	<div class="Prosale Page">
		<iframe :src="'../public/pdfcover/viewer.html?file='+$route.query.file+'&name='+$route.query.manager" width="100%" height="100%"></iframe>
	</div>
</div>
</template>
<script>
	export default{
		name: 'prosalepdf',
		data(){
			return{
				isShow:sessionStorage.isShow || 0
			}
		},
		mounted(){
		   	
		},
		methods:{
            
		}
	}
</script>
<style scoped="scoped">
	iframe{
        border:0;
    }
    .header_title{
        text-align: center;
        font-weight: bold;
        font-size: 17px;
        padding-left: 30px;
    }
</style>