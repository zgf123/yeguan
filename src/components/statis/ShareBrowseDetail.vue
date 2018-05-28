<template>
<div>
    <component :is="'Header'">
        <div class="header_title" slot="title">{{name}}的查看详情</div>
    </component>
	<div class="content Page">
        <ul>
            <li class="flex_align bor_b" v-for="(item, index) in resdata" :key="index">
                <div class="flex_1">第{{index+1}}次查看时间</div>
                <div class="flex_1">{{item.time | timeFormat}}</div>
            </li>
        </ul>
	</div>
</div>
</template>

<script>
	export default{
		name: 'browse',
		data(){
			return{
                name:'',
                resdata:{}
			}
		},
        mounted(){
            let params = this.$route.query;
            this.name = params.name;
            this.fetchData(params);
        },
        filters: {
            timeFormat: function (value) {
                if(value){
                    let timeArr = value.split(':');
                    return timeArr[0] + ':' + timeArr[1];
                }else{
                    return '暂无时间';
                }
            }
        },
        methods:{
            fetchData(params){
				let _this = this;
				var data = this.qs.stringify({
					token:localStorage.token,
                    vxuser_id:params.uid,
                    product_id:params.pid,
                    article_id:params.pid
				});
                let posturl = '';
                if(params.type == 'chanpin'){
                    posturl = '/club/WechatProductLogDetails';
                }else{
                    posturl = '/club/WechatArticleLogDetails';
                }
                this.axios.post(posturl,data).then(function(res){
                	if(res.data.code==1){
						this.resdata = res.data.data || {};
					}
                }.bind(this));
            }
        }
	}
</script>
<style lang="less" scoped="scoped">
    .header_title{
        position: relative;
        width: 100%;
        font-size: 17px;
        font-weight: bold;
        text-align: center;
    }
    .content{
        ul{
            background-color: #fff;
            text-align: center;
            li{
                padding: 0 15px;
                height: 50px;
                font-size: 15px;
                color: #666;
            }
        }
    }
</style>
