<template>
<div>
    <component :is="'Header'">
        <div class="header_title" slot="title">{{cus_name}}的浏览统计</div>
    </component>
	<div class="content Page">
        <p class="no_his" v-show="!resdata.length">暂无浏览记录</p>
		<div class="item">
            <div class="item_con">
                <ul>
                    <li class="bor_b" v-for="(item,index) in resdata" :key="index">
                        <div class="title">
                            <div class="name text_o"><span>{{item.product_type == 1 ? '股权  | ' : (item.product_type == 2 ? '固收  | ' : '')}}</span>{{item.product_name}}</div>
                        </div>
                        <div class="detail">
                            <div class="last_time">访问时间&nbsp;&nbsp;{{item.time}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
	</div>
</div>
</template>

<script>
	export default{
		name: 'browse',
		data(){
			return{
                cus_id:0,
                cus_name:'张三', //客户名字
                resdata:[]
			}
		},
        mounted(){
            this.cus_id = this.$route.query.id;
            this.cus_name = this.$route.query.name;
            this.fetchData();
        },
        methods:{
            fetchData(){
				let _this = this;
				var data = this.qs.stringify({
					token:localStorage.token,
                    member_id: _this.cus_id
				});
                this.axios.post('/club/readLogs',data).then(function(res){
                	if(res.data.code==1){
						this.resdata = res.data.data || [];
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
        font-weight: bolder;
        text-align: center;
    }
    .no_his{
        font-size: 14px;
        color: #999;
        text-align: center;
        margin-top: 15px;
    }
	.content{
        .item{
            background-color:#fff;
            color: #333;
            margin-bottom: 15px;
        }
        .item_con{
            padding-left: 15px;
            li{
                padding: 16px 0 16px;
                .title{
                    font-size:17px;
                }
                .detail{
                    margin-top: 10px;
                    font-size: 15px;
                    color:#999;
                }
            }
        }
    }
</style>
