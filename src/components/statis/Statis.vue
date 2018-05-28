<template>
<div>
    <component :is="'Header'">
        <div class="nav_title flex_align" slot="title">
            <div class="flex_1"></div>
            <!-- <router-link :to="'/evaluate'" tag="div" class="link"><img src="/public/img/pingjia_icon.png" alt=""></router-link> -->
            <!-- <router-link :to="'/sharebrowse'" tag="div" class="link"><img src="/public/img/tongji_icon.png" alt=""></router-link> -->
            <!-- <router-link :to="'/sharebrowse'" tag="div" class="link"><span>微信浏览</span></router-link> -->
            <router-link :to="'/evaluate'" tag="div" class="link"><span>产品评价</span></router-link>
            <router-link :to="'/sharebrowse'" tag="div" class="link"><span>分享浏览</span></router-link>
        </div>
    </component>
    <div>
        <div class="search_box flex_align">
            <div class="inputbox flex_1">
                <input type="text" placeholder="请输入客户姓名/手机号" v-model="keyword">
            </div>
            <div class="btn" @click="searchFn">查询</div>
        </div>
        <div class="head_ul">
            <ul v-show="floors" class="ul flex_align" :style="'width:'+ listWidth +'px;-webkit-transform:translate3d('+ margin +'px,0,0)'">
                <li v-for="i in floors" :key="i">{{fonts[i-1]}}级客户</li>
            </ul>
            <p class="no_info">暂无客户</p>
        </div>
        <div class="content" @scroll.passive="onScroll($event)">
            <div class="listbox" :style="'width:'+ listWidth +'px;'">
                <router-link :to="'/browse?id='+ item.id + '&name='+ item.members[item.members.length-1]" tag="ul" class="ul flex_align" :class="item.newLog > 0 ? 'on' : ''" v-for="(item,index) in resdata" :key="index">
                    <li v-for="(c,i) in item.members" :key="i">{{c}}</li>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
	export default{
		name: 'statis',
		data(){
			return{
                margin:0, // head_ul 的偏移值
                listWidth:0, //客户列表宽度
                floors:0,  //客户层级数
                fonts:['一','二','三','四','五','六','七','八','九'],
                keyword:'', //搜索关键字
                resdata:[]
			}
		},
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
				let _this = this;
                var boxW= $('.content').width();
                
				var data = this.qs.stringify({
					token:localStorage.token,
                    keyword: _this.keyword
				});
                this.axios.post('/club/index',data).then(function(res){
                	if(res.data.code==1){
                        //首先取出客户层级最大值
                        if(res.data.data){
                            let customerArr= res.data.data;
                            let maxNum = 1;
                            for (var i=0; i<customerArr.length-1; i++){
                                var a = customerArr[i].members.length,
                                b = customerArr[i+1].members.length;
                                _this.floors = getMax(a, b);
                            }
                            if(_this.floors*106<boxW){
                                _this.listWidth = boxW;
                            }else{
                                _this.listWidth = _this.floors*106;
                            };

                            if(_this.floors < 3) _this.floors=3;
                        }else{
                            _this.floors = 0;
                        }
						_this.resdata = res.data.data || [];
					}
                }.bind(this));

                //定义一个取最大值方法
                function getMax(a,b){
                    if(a>=b){
                        return a;
                    }
                    return b;
                };
            },
            searchFn(){
                this.fetchData();
            },
            onScroll(el){
                el = el.srcElement;
                let margin = $(el).scrollLeft();
                this.margin = -margin;
            }
        }
	}
</script>
<style lang="less" scoped="scoped">
    .nav_title{
        position: absolute;
        right: 0;
        padding-right: 10px;
        .link{
            // height: 48px;
            // width: 38px;
            // padding-top: 10px;
            span{
                border:1px solid #fff;
                padding: 4px 5px;
                margin:0 5px;
                font-weight: normal;
                font-size: 14px;
                border-radius: 3px;
            }
        }
        img{
            width: 28px;
        }
    }
    .search_box{
        margin-top: 48px;
        height: 50px;
        padding: 0 10px;
        .inputbox{
            input{
                height: 34px;
                color: #333;
                width: 100%;
                border-radius: 17px;
                padding-left: 30px;
                font-size: 15px;
                background: #fff url(/public/img/search_icon.png) no-repeat 8px center;
                background-size: 15px;
            }
        }
        .btn{
            min-width: 60px;
            font-size: 16px;
            text-align: center;
            line-height: 50px;
            color: #ff8b03;
        }
    }
	.content{
        position: absolute;
        top:148px;
        right:0;
        left:0;
        bottom:0;
        overflow: auto;
        background-color: #fff;
        -webkit-overflow-scrolling: initial;
    }
    .listbox{
        position: relative;
        padding-bottom: 15px;
    }
    .ul{
        padding-left: 10px;
        position: relative;
        width: 100%;
        color:#333;
        font-size: 15px;
        &:after{
            content: "";
            position: absolute;
            left: 10px;
            right: 0;
            height: 1px;
            bottom: 0;
            border-bottom: 1px solid #ddd;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
        }
        &.on{
            background-color: #fff1e3;
        }
        li{
            width: 106px;
            line-height: 50px;
            text-align: left;
        }
    }
    .head_ul{
        background-color: #fff;
        width: 100%;
        overflow: hidden;
        .ul{
            color: #ff8b03;
        }
        .no_info{
            height: 50px;
            text-align: center;
            font-size: 14px;
            color: #999;
            padding-top: 10px;
        }
    }
</style>
