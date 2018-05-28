<template>
<div>
    <component :is="'Header'"></component>
	<div class="content Page">
        <div class="tabnav bor_b">
            <ul class="cr">
                <!-- <li @click="slideTo(0)"><span>产品浏览记录<b class="point"></b></span></li> -->
                <li @click="slideTo(0)"><span>产品浏览记录</span></li>
                <li @click="slideTo(1)"><span>动态浏览记录</span></li>
            </ul>
            <div class="subline" :style="'transform:translate3d('+subline_trans+'px,0,0);'+ani"><span></span></div>
        </div>
        <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="tabcon">
                        <div class="no_info" v-if="!product_data">暂无浏览记录</div>
                        <div class="item" v-for="(item,index) in product_data" :key="index">
                            <div class="title flex_align">
                                <!-- <div class="point"></div> -->
                                <div class="flex_1 text_o">{{item.type == 1 ? '股权' : '固收'}}&nbsp;|&nbsp;{{index}}</div>
                                <div class="eye"><img src="/public/img/eye.png" alt="">{{item.total}}</div>
                            </div>
                            <div class="table">
                                <div class="no_info" v-if="!item.data.length">暂无浏览记录</div>
                                <table>
                                    <tr class="" @click="toDetail(c.nicename, c.vxuser_id, c.product_id, 'chanpin')" v-for="(c,i) in item.data" :key="i">
                                        <td><img :src="c.logo" alt="">{{c.nicename}}</td>
                                        <td>{{c.time | timeFormat}}</td>
                                        <td>{{c.total}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="pack_up" @click="show_or_hide($event)"><img src="/public/img/back_up_icon.png" alt=""><span>展开</span></div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="tabcon">
                        <div class="no_info" v-if="!article_data">暂无浏览记录</div>
                        <div class="item" v-for="(item,index) in article_data" :key="index">
                            <div class="title flex_align">
                                <!-- <div class="point"></div> -->
                                <div class="flex_1 text_o">{{index}}</div>
                                <div class="eye"><img src="/public/img/eye.png" alt="">{{item.total}}</div>
                            </div>
                            <div class="table">
                                <div class="no_info" v-if="!item.data.length">暂无浏览记录</div>
                                <table>
                                    <tr class="" @click="toDetail(c.nicename, c.vxuser_id, c.article_id, 'dongtai')" v-for="(c,i) in item.data" :key="i">
                                        <td><img :src="c.logo" alt="">{{c.nicename}}</td>
                                        <td>{{c.time | timeFormat}}</td>
                                        <td>{{c.total}}</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="pack_up" @click="show_or_hide($event)"><img src="/public/img/back_up_icon.png" alt=""><span>展开</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</div>
</template>

<script>
	export default{
		name: 'Alive_browse',
		data(){
			return{
                product_data:'', //获取产品浏览记录的数据
                article_data:'', //获取动态浏览记录的数据
                mySwiper:'', //初始化后的swiper
                subline_trans:0, //tab下标线移动的距离
                ani:'transition: all .3s;', //下划线的动画设置
			}
		},
        mounted(){
            //获取数据
            // this.fetchData();
            
            //初始化swiper
            let _this = this;
            this.mySwiper = this.mySwiperInit();
        },
        activated(){
			//获取数据，在这里获取数据避免滑块重置
            this.fetchData();
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
            fetchData(){
				let _this = this;
				var data = this.qs.stringify({
					token:localStorage.token
				});
                //产品浏览记录
                this.axios.post('/club/wechatProductLogs',data).then(function(res){
                	if(res.data.code==1){
						this.product_data = res.data.data || '';
					}
                }.bind(this));
                //动态浏览记录
                this.axios.post('/club/wechatArticleLogs',data).then(function(res){
                	if(res.data.code==1){
						this.article_data = res.data.data || '';
					}
                }.bind(this));
            },
            //初始化swiper
            mySwiperInit(){
                let _this = this;
                var mySwiper = new Swiper('.swiper-container',{
                    speed:300,
                    preventIntercationOnTransition : true, //过渡时将无法滑动
                    touchAngle : 30,//设置拖动角度
                    resistanceRatio : 0, //设置抵抗力，在滑到第一个或者最后一个滑块时没有不能单方向滑动
                    on:{
                        sliderMove: function(event){
                            _this.subline_trans = -mySwiper.getTranslate()/mySwiper.slides.length;
                            _this.ani = '';
                            
                        },
                        transitionStart: function(){
                            _this.ani = 'transition: all .3s;';
                            _this.subline_trans = mySwiper.width / mySwiper.slides.length * mySwiper.activeIndex;
                        },
                    }
                });
                return mySwiper;
            },
            slideTo(index){
                let _this = this;
                this.mySwiper.slideTo(index, 300, false);
                this.subline_trans = _this.mySwiper.width / _this.mySwiper.slides.length * index;
            },
            //展开活隐藏
            show_or_hide(event){
                let el = event.target;
                let that = $(el).parents('.item').find('.pack_up');
                $(that).toggleClass('open');
                var isopen = $(that).hasClass('open');
                $(that).siblings('.table').slideToggle(300);
                setTimeout(() => {
                    if(isopen){
                        $(that).children('span').html('收起');
                        $(that).children('img').addClass('open');
                    }else{
                        $(that).children('span').html('展开');
                        $(that).children('img').removeClass('open');
                    }
                }, 300);
            },
            //跳转
            toDetail(name, uid, pid, type){
                this.$router.push({
                    path:'/sharebrowsedetail',
                    query:{
                        name,uid,pid,type
                    }
                })
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
    .point{
        position: absolute;
        display: block;
        width: 5px;
        height: 5px;
        background-color: #ff4343;
        border-radius: 50%;
    }
    .header_title{
        position: relative;
        width: 100%;
        font-size: 17px;
        font-weight: bold;
        text-align: center;
    }
    .tabnav{
        background-color: #fff;
        position: relative;
        li{
            float: left;
            width: 50%;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            color: #333;
            span{
                position: relative;
            }
            .point{
                top: -6px;
                right: -8px;
            }
        }
        .subline{
            position: absolute;
            width: 50%;
            bottom:0;
            span{
                display: block;
                width: 80px;
                height: 3px;
                background-color: #ff8b03;
                -webkit-border-radius: 3px;
                border-radius: 3px;
                margin:0 auto;
            }
        }
    }
    .swiper-container{
        position: absolute;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .tabcon{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        p{
            line-height: 90px;
            border-bottom: 1px solid #ddd;
        }
        .item{
            background-color: #fff;
            margin: 5px auto;
            border-bottom: 2px solid #eee;
            .title{
                height: 50px;
                padding: 0 15px;
                border-bottom: 1px solid #eee;
                font-size: 16px;
                color: #666;
                position: relative;
                .point{
                    top:5px;
                    left:5px;
                }
                .eye{
                    color: #ff8888;
                    img{
                        display: inline-block;
                        vertical-align: middle;
                        width:18px;
                        margin: -3px 5px auto auto;
                    }
                }
            }
            .table{
                display: none;
                font-size: 14px;
                color: #666;
                table{
                    width: 100%;
                }
                tr{
                    td{
                        height: 45px;
                        vertical-align: middle;
                        img{
                            width: 25px;
                            height: 25px;
                            border-radius: 50%;
                            border: 1px solid #bbb;
                            display: inline-block;
                            margin-right: 5px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
                        }
                    }
                    td:first-child{
                        text-align: left;
                        padding-left: 15px;
                        max-width: 80px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    td:nth-child(2){
                        text-align: center;
                    }
                    td:last-child{
                        text-align: center;
                        min-width: 40px;
                        padding-right: 15px;
                    }
                    &.on{
                         td{
                             background-color: #ffecd9;
                         }
                    }
                }

            }
        }
        .pack_up{
            line-height: 35px;
            font-size: 14px;
            color: #499df1;
            text-align: center;
            img{
                width: 13px;
                display: inline-block;
                vertical-align: middle;
                transform: rotate(180deg);
                margin: -2px 4px auto auto;
                transition: all .2s;
            }
            img.open{
                transform: rotate(0);
            }
        }
    }
</style>
