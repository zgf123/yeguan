<template>
    <router-view></router-view>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
    .btn{
        &.delete{
            background-color: #FF6A6A;
        }
        &.history{
            background-color: #5CACEE;
        }
        &.edit{
            background-color: #00C5CD;
        }
        &.use{
            background-color: #ff8b03;
        }
    }
</style>
