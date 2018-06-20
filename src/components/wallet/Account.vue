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
                    <div class="tabcon" ref="taball" @scroll="swiperScroll('all')">
                        <div ref="boxall">
                            <div class="item flex_align bor_b" v-for="item in resdata.all" :key="item.id">
                                <div class="left flex_1">
                                    <div class="title">{{item.msg}}</div>
                                    <div class="time">{{item.time}}</div>
                                </div>
                                <div class="right">{{item.money}}</div>
                            </div>
                            <div class="no_info" style="padding-bottom:10px;font-size:13px;">{{swiper.all.tip}}</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="tabcon" ref="tabincome" @scroll="swiperScroll('income')">
                        <div ref="boxincome">
                            <div class="item flex_align bor_b" v-for="item in resdata.income" :key="item.id">
                                <div class="left flex_1">
                                    <div class="title">{{item.msg}}</div>
                                    <div class="time">{{item.time}}</div>
                                </div>
                                <div class="right">{{item.money}}</div>
                            </div>
                            <div class="no_info" style="padding-bottom:10px;font-size:13px;">{{swiper.income.tip}}</div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="tabcon" ref="tabwithdraw" @scroll="swiperScroll('withdraw')">
                        <div ref="boxwithdraw">
                            <div class="item flex_align bor_b" v-for="item in resdata.withdraw" :key="item.id">
                                <div class="left flex_1">
                                    <div class="title">{{item.msg}}</div>
                                    <div class="time">{{item.time}}</div>
                                </div>
                                <div class="right">{{item.money}}</div>
                            </div>
                             <div class="no_info" style="padding-bottom:10px;font-size:13px;">{{swiper.withdraw.tip}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
                li_index:0,
                mySwiper:'', //初始化后的swiper
                subline_trans:0, //tab下标线移动的距离
                ani:'transition: all .3s;', //下划线的动画设置
                resdata:{
                    all:'',
                    income:'',
                    withdraw:'',
                },
                swiper:{
                    all:{
                        tab:'taball',
                        box:'boxall',
                        onoff:true,
                        page:1,
                        tip:''
                    },
                    income:{
                        tab:'tabincome',
                        box:'boxincome',
                        onoff:true,
                        page:1,
                        tip:''
                    },
                    withdraw:{
                        tab:'tabwithdraw',
                        box:'boxwithdraw',
                        onoff:true,
                        page:1,
                        tip:''
                    }
                }
			}
		},
        mounted(){
            //获取数据
            this.fetchData();
            
            //初始化swiper
            let _this = this;
            this.mySwiper = this.mySwiperInit();
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
                _this.swiper.all.tip = '数据加载中...';
                _this.swiper.income.tip = '数据加载中...';
                _this.swiper.withdraw.tip = '数据加载中...';

                this.axios.all([
                    _this.fetchAll(),
                    _this.fetchIncome(),
                    _this.fetchWithdraw()
                ]).then(_this.axios.spread(function(allRes,incomeRes,withdrawRes){
                    _this.resdata.all = allRes.data.data || [];
                    _this.resdata.income = incomeRes.data.data || [];
                    _this.resdata.withdraw = withdrawRes.data.data || [];
                    
                    _this.swiper.all.tip = _this.resdata.all.length == 0 ?  '暂无数据' : '数据加载完成';
                    _this.swiper.income.tip = _this.resdata.income.length == 0 ?  '暂无数据' : '数据加载完成';
                    _this.swiper.withdraw.tip = _this.resdata.withdraw.length == 0 ?  '暂无数据' : '数据加载完成';
                }));
            },
            fetchAll(){
                let data = {
                    token:localStorage.token,
                    page: this.swiper.all.page
                };
                return this.axios.post(this.$store.state.walleturl+'/records/index', this.qs.stringify(data));
            },
            fetchIncome(){
                let data = {
                    token:localStorage.token,
                    page: this.swiper.income.page
                };
                return this.axios.post(this.$store.state.walleturl+'/records/income', this.qs.stringify(data));
            },
            fetchWithdraw(){
                let data = {
                    token:localStorage.token,
                    page: this.swiper.withdraw.page
                };
                return this.axios.post(this.$store.state.walleturl+'/records/withdraw', this.qs.stringify(data));
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
            },
            swiperScroll(params){
                let _this = this,
                    box = _this.swiper[params].box,
                    tab = _this.swiper[params].tab;

                let boxH = this.$refs[box].offsetHeight;
                let tabH = this.$refs[tab].offsetHeight;
                let top = this.$refs[tab].scrollTop;
                if(top>=boxH - tabH){
                    _this.swiper[params].page++;
                    if (!this.swiper[params].onoff) return false;
                    _this.swiper[params].onoff = false;
                    _this.swiper[params].tip = '数据加载中...';
                    let method = '';
                    if(params == 'all'){
                        method = _this.fetchAll();
                    }else if(params == 'income'){
                        method = _this.fetchIncome();
                    }else if(params == 'withdraw'){
                        method = _this.fetchWithdraw();
                    }
                    method.then(function(res){
                        _this.resdata[params] = _this.resdata[params].concat(res.data.data);
                        if(res.data.data.length == 0 || res.data.data.length<15){
                            _this.swiper[params].tip = '数据已全部加载';
                        }else{
                            _this.swiper[params].onoff = true;
                            _this.swiper[params].tip = '加载完成';
                        }
                    });
                }
            }
        }
	}
</script>
