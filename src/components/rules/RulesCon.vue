<template>
    <div>
        <component :is="'Header'"></component>
        <div class="container Page">
            <h1>工装管理规定</h1>
            <p>编号：MXCF-02-002<br>2010年5月6日第一次修订</p>
            <div class="con">
                为了展现公司及员工的良好精神面貌，公司为正式入职员工配发工装，员工上班期间需着工装。相关规定如下：<br>
                1、公司每年为正式员工配发工装，公司员工上班期间需着工装，女员工需着丝袜，黑色净面皮鞋（含高跟鞋），男员工穿西服，着黑色皮鞋。<br>
                2、员工工装要保持整洁、熨贴。<br>
                3、暂未做工装的员工，穿正装进入公司，不得穿休闲装。<br>
                4、每天工装检查一经发现着装不规范之处，按员工工作守则规定进行处罚。<br>
                5、工装费用由公司先行承担50%，员工承担50%，如员工在公司服务未满半年（含半年）离职，工装费用由个人全部承担；服务半年以上一年以下（含一年）离职，费用由个人承担50%；服务满一年后离职，费用由公司全额承担。<br>
                6、公告实施：<br>
                本办法于 2010  年  5  月  6  日第一次修正。<br>
                7、本办法经呈董事长核准后公告实施，修改、废止时亦同。<br><br><br>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                resdata:[]
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>

<style lang="less" scoped>
    .container{
        background-color: #fff;
        padding: 0 15px;
        color: #666;
    }
    h1{
        font-size: 18px;
        text-align: center;
        color: #333;
        margin-bottom: 20px;
        padding-top: 18px;
    }
    p{
        // text-align: right;
        font-size: 15px;
        color: #999;
        line-height: 1.4;
    }
    .con{
        margin-top: 15px;
        line-height: 1.5;
        font-size: 15px;
    }
</style>