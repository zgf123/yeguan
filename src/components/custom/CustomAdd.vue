<template>
<div>
	<component :is="'Header'"></component>
	<div class="content Page adr_input_box">
		<component :is="'FormComponent'" ref="save"></component>
        <div class="submitbox"><div class="submit btn_active" @click="submit">确认添加</div></div>
	</div>
</div>
</template>
<script>
    import FormComponent from './temp/formComponent.vue';
	export default{
        name:'customAdd',
		data(){
			return{
                msg:''
			}
        },
        components:{
            FormComponent
        },
        methods:{
            submit(){
                this.$refs.save.submit();
            }
        }
	}
</script>


<style lang="less" scoped="scoped">
    .content{
        background-color: #fff;
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
</style>
