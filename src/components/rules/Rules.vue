<template>
    <div>
        <component :is="'Header'"></component>
        <div class="container Page">
            <div v-if="resdata.length == 0 ? true : false" style="margin-top:10px;font-size:13px;color:#999;text-align:center;">暂无数据</div>
            <div v-for="(item,index) in resdata" :key="index" class="item flex_align lyui_tap_active" @click="lookFile(item.rules_name, item.rules_path)">
                <div class="title flex_1">{{item.rules_name}}</div>
                <div class="btn">查看</div>
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
            this.fetchData();
        },
        methods:{
            fetchData(){
				var data = this.qs.stringify({
					token:localStorage.token
				});
                this.axios.post('/rules/index',data).then(function(res){
                    if(res.data.code == 1){
                        this.resdata = res.data.data || [];
                    }
                }.bind(this));
            },
            lookFile(name,link){
                this.$router.push({
                    path:'/rulescon'
                })
                return false;
                // link = link.split('\\').join('').split('[\"').join('').split('\"]').join('');
                try {
                    if(cusAndroid){
                        window.android.readPDF(name,link);
                    }else{
                        window.webkit.messageHandlers.readPDF.postMessage({pdfName:name,pdfUrl:link});
                    }
                } catch (error) {
                    window.location.href=link;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        background-color:#fff;
        padding-bottom: 15px;
    }
    .item{
        padding:0 15px;
        min-height: 50px;
        font-size: 17px;
        color: #323232;
        position: relative;
        &:after{
            content: "";
            position: absolute;
            left: 15px;
            right:0;
            height: 1px;
            bottom: 0;
            border-bottom: 1px solid #ddd;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
        .btn{
            color: #ffa043;
            font-size: 15px;
        }
    }
</style>