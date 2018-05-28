<template>
	<div class="Notice">
        <component :is="'Header'"></component>
		<div class="container Page">
            <div v-if="resdata.total == 0 ? true : false" style="margin-top:10px;font-size:13px;color:#999;text-align:center;">暂无数据</div>
            <div class="item" v-for="(item,key) in resdata" :key="key" v-if="key == 'total' ? false : true">
                <div class="date">{{key}}</div>
                <div class="date_li" v-for="(c,index) in resdata[key]" :key="index">
                    <div class="title" v-show="c.msg_category">{{c.msg_category}}</div>
                    <p>{{c.msg_content}}</p>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	export default{
		name: 'notice',
		data(){
			return{
				resdata:{}
			}
		},
		mounted(){
			this.fetchData();
		},
		methods:{
			fetchData(){
				let _this = this;
				var data = this.qs.stringify({
					token:localStorage.token
				});
                this.axios.post('/messages/index',data).then(function(res){
                	if(res.data.code==1){
						this.resdata = res.data.data;
					}
                }.bind(this)).catch(function(err){
                    //code..
                })
            }
		}
	}
</script>
<style lang="less" scoped>
    .item{
        padding: 0 15px;
        .date{
            width:90px;
            margin: 15px auto 10px;
            height: 25px;
            line-height: 25px;
            font-size: 14px;
            color:#fff;
            background-color: rgba(0,0,0,0.2);
            text-align: center;
            border-radius: 4px;
        }
        .date_li{
            background-color: #fff;
            padding: 10px 15px;
            border-radius: 5px;
            margin-bottom: 10px;
            .title{
                font-size: 17px;
                color: #333;
                padding: 0 0 9px;
            }
            p{
                font-size: 15px;
                color: #888888;
                line-height: 1.5;
            }
        }
    }
</style>
