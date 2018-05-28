<template>
<div>
    <component :is="'Header'"></component>
	<div class="content Page">
        <p class="no_info" v-if="!resdata">暂无评价</p>
        <div class="item" v-for="(item, index) in resdata" :key="index">
            <div class="title"><span>{{item.product.type == 1 ? '股权' : '固收'}} | </span>{{item.product.product_name}}</div>
            <table class="text_c">
                <tr v-for="(c,i) in item.data" :key="i">
                    <td width="25%" class="text_l">{{c.user_name}}</td>
                    <td width="35%">{{c.time | timeFormat}}</td>
                    <td width="15%">{{c.score}}星</td>
                    <td width="25%">{{c.channel | channelFileter}}</td>
                </tr>
            </table>
            <p v-if="!item.data.length" style="text-align:center;font-size:14px;padding: 8px 0; color: #999;">暂无评价</p>
        </div>
	</div>
</div>
</template>

<script>
	export default{
		name: 'browse',
		data(){
			return{
                resdata:'', //返回的数据
			}
		},
        mounted(){
            this.fetchData();
        },
        filters: {
            timeFormat: function (value) {
                if(value){
                    let timeArr = value.split(' ');
                    return timeArr[0];
                }else{
                    return '暂无时间';
                }
            },
            channelFileter: function(value){
                if(value == 'wechat'){
                    return '微信';
                }else if(value == 'app'){
                    return 'APP';
                }else{
                    return '朋友圈';
                }
            }
        },
        methods:{
            fetchData(){
				let _this = this;
				var data = this.qs.stringify({
					token:localStorage.token
				});
                this.axios.post('/club/productScoreLogs',data).then(function(res){
                	if(res.data.code==1){
						this.resdata = res.data.data || '';
					}
                }.bind(this));
            }
        }
	}
</script>
<style lang="less" scoped="scoped">
    .no_info{
        font-size: 15px;
        color: #999;
        text-align: center;
        margin-top: 10px;
    }
    .item{
        background-color: #fff;
        margin-bottom: 12px;
        .title{
            height: 44px;
            color: #333333;
            font-size: 16px;
            line-height: 44px;
            padding-left: 15px;
            position: relative;
            &:after{
                content: "";
                position: absolute;
                left: 15px;
                right: 0;
                height: 1px;
                bottom: 0;
                border-bottom: 1px solid #d9d9d9;
                -webkit-transform-origin: 0 100%;
                transform-origin: 0 100%;
                -webkit-transform: scaleY(.5);
                transform: scaleY(.5)
            }
        }
        table{
            padding-left: 15px;
            width: 100%;
            tr{
                height: 44px;
                font-size: 14px;
                color: #666666;
            }
            td{
                line-height: 44px;
                max-width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:first-child{
                    padding-left:15px;
                }
                &:last-child{
                    padding-right:15px;
                    text-align: right;
                }
            }
        }
    }
</style>
