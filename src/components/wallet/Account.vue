<template>
	<div class="body_account">
        <div class="tabnav bor_b">
            <ul class="cr flex_align">
                <li class="flex_1" :class="li_index == 0 ? 'on':''" @click="slideTo(0)"><span>全部</span></li>
                <li class="flex_1" :class="li_index == 1 ? 'on':''" @click="slideTo(1)"><span>收入</span></li>
                <li class="flex_1" :class="li_index == 2 ? 'on':''" @click="slideTo(2)"><span>提现</span></li>
            </ul>
            <div class="subline" :style="'transform:translate3d('+subline_trans+'px,0,0);'+ani"><span></span></div>
        </div>
        <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="tabcon">
                        <div class="item flex_align bor_b">
                            <div class="left flex_1">
                                <div class="title">月度付息</div>
                                <div class="time">2017-02-30 12:30:20</div>
                            </div>
                            <div class="right">-5.00</div>
                        </div>
                        <div class="item flex_align bor_b">
                            <div class="left flex_1">
                                <div class="title">买入</div>
                                <div class="time">2017-02-30 12:30:20</div>
                            </div>
                            <div class="right on">+5.00</div>
                        </div>
                        <div class="item flex_align bor_b">
                            <div class="left flex_1">
                                <div class="title">提现</div>
                                <div class="time">2017-02-30 12:30:20</div>
                            </div>
                            <div class="right">-5.00</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="tabcon">
                        <div class="no_info">暂无数据</div>
                        <div class="item"></div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="tabcon">
                        <div class="item flex_align bor_b">
                            <div class="left flex_1">
                                <div class="title">月度付息</div>
                                <div class="time">2017-02-30 12:30:20</div>
                            </div>
                            <div class="right">-5.00</div>
                        </div>
                        <div class="item flex_align bor_b">
                            <div class="left flex_1">
                                <div class="title">买入</div>
                                <div class="time">2017-02-30 12:30:20</div>
                            </div>
                            <div class="right on">+5.00</div>
                        </div>
                        <div class="item flex_align bor_b">
                            <div class="left flex_1">
                                <div class="title">提现</div>
                                <div class="time">2017-02-30 12:30:20</div>
                            </div>
                            <div class="right">-5.00</div>
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
                li_index:0,
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
                            _this.li_index = mySwiper.activeIndex;
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
            }
        }
	}
</script>
