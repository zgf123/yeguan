<template>
    <div>
		<div class="com_header">
            <slot name="title">
                <div class="com_title">{{$store.state.pageTitle}}</div>
            </slot>
            <slot name="back">
                <div class="nav_back btn_active" @click="navBack"></div>
            </slot>
            <slot name="search"></slot>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
				
            }
		},
        mounted(){
			
        },
        methods:{
			navBack(){
				window.navBack();
			}
        }
    }
</script>
<style lang="less" scoped>
	
</style>
