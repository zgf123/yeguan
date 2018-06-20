<template>
    <div>
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">资产配置详情</div>
            <div slot="search" class="baocuo"><span @click="sendError()">报错</span></div>
        </component>
        <div class="container Page" v-if="resdata">
            <div class="page_capitalconf">
                  <div class="topmsg">{{resdata.topInfo}}</div>
                  <div class="chart_box">
                        <div class="graph">
                              <template v-if="onoff.showCircle">
                                <div id="circleChart" class="circle_chart"></div>
                                <div class="sub_title">投资周期分析</div>
                                <div class="cut_off_line"><div class="bor_b"></div></div>
                            </template>
                              <div class="products">
                                    <div class="pro_title">在投项目：</div>
                                    <p v-if="!resdata.zaibao.length" style="font-size:14px;color:#999;text-align:center;line-height:3;">无在投项目</p>
                                    <ul>
                                        <li :class="(index == resdata.zaibao.length-1 && resdata.zaibao.length<=4) ? '' : 'bor_b'" v-for="(item,index) in resdata.zaibao" :key="index">
                                            <h1>{{item.product_name}}</h1>
                                            <div class="info flex_align">
                                                <div class="flex_1 text_l">
                                                    <div class="top">{{item.huiqian_start_time}}</div>
                                                    <p>购入时间</p>
                                                </div>
                                                <div class="flex_1 text_c">
                                                    <div class="top">{{(item.huiqian_summoney/10000).toFixed(2) + '万'}}</div>
                                                    <p>投资金额</p>
                                                </div>
                                                <div class="flex_1 text_r">
                                                    <div class="top">{{item.huiqian_end_time}}</div>
                                                    <p>到期时间</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                              </div>
                              <div class="toggle_slide" v-if="resdata.zaibao.length>4"><span class="text">展开详情</span><span class="slide_arrow"></span></div>
                              <div style="height:5px;" v-else></div>
                        </div>
                  </div>
                  <div class="income_box">
                        <div class="item item_expect bor_b">
                              <h1>未来5年预期收益一览：</h1>
                              <div class="expect" id="expect"></div>
                        </div>
                        <div class="item item_details bor_b">
                              <h1>未来一年预期收益明细：</h1>
                              <div class="detailsbox">
                                    <div class="ul_box">
                                          <ul class="cr">
                                                <li v-for="(item,key) in resdata.theNextOneYears" :key="key">
                                                    <div class="money">{{item | mingxiMoneyFormat}}</div>
                                                    <div class="time">{{key}}</div>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div class="suggest_box">
                        <div class="title">投资建议</div>
                        <div class="text bor_b">从未来一年流动性角度考量，您的投资配置合理，流动性较为充足，可考虑再配置一款类固定收益类产品，保持每个月都有流动收益入账。</div>
                  </div>
                  <div class="confdetail">
                        <h1 class="text_l">产品推荐</h1>
                        <ul class="item_ul">
                              <li v-for="(item,index) in resdata.products" :key="index">
                                    <h2>{{item.product_name}}</h2>
                                    <p>{{item.suggest}}</p>
                              </li>
                        </ul>
                  </div>
            </div>
        </div>
        <div class="savebtn cr" v-if="!Number(resdata.status)">
            <div class="btn save" @click.once="sendCustomer()">发送给客户</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                switch:true,
                onoff:{
                    showDelete:true, //是否显示产品删除按钮
                    showCircle:true,
                },
                resdata:'', //核心数据
            }
        },
        computed:{
            isEdit(){
                if( this.$route.path.indexOf('/add') == -1 ){
                    return true;
                }else{
                    return false;
                }
            }
        },
        filters:{
            mingxiTimeFormat(val){
                let value = val.split('-')[1];
                if(value[0] == 0){
                    return value[1];
                }
                return value;
            },
            mingxiMoneyFormat(val){
                if(val != 0){
                    return (val/10000).toFixed(2) + '万';
                }else{
                    return '0';
                }
            }
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                let _this = this,
                    url = '',
                    data = '';
                //判断编辑页面
                if(this.$route.params.assetid){
                    url = '/asset/detail';
                    data = {
                        token:localStorage.token,
                        asset_id: _this.$route.params.assetid
                    }
                }else{
                    url = '/asset/create';
                    data = {
                        token:localStorage.token,
                        customer_id: _this.$route.params.id
                    }
                }
                data = this.qs.stringify(data);
                //获取数据
                this.axios.post(url, data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                        _this.resdata.zaibao = res.data.data.zaibao || [];
                        _this.resdata.timeProportion = res.data.data.timeProportion || [];
                        
                        //绘制图表
                        setTimeout(() => {
                            _this.drawCircle(
                                _this.resdata.timeProportion.yiniannei || 0, 
                                _this.resdata.timeProportion.yizhisan || 0, 
                                _this.resdata.timeProportion.sannianyishang || 0
                            );
                            _this.drawChart();
                        }, 10);

                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            sendError(){
                layer.open({
                    content:'请联系信息中心同事，处理错误信息',
                    btn:['我知道了'],
                    yes:function(){
                        layer.closeAll();
                    }
                });
            },
            sendCustomer(){
                let _this = this;
				var data = this.qs.stringify({
                    token:localStorage.token,
                    customer_id: _this.$route.params.id,
                    asset_id: _this.$route.params.assetid,
                });
                if(!_this.switch) return false;
                _this.switch = false;

                this.axios.post('/asset/send', data).then(function(res){
                    if(res.data.code == 1){
                        // _this.switch = true;
                        _this.$store.commit('msg','发送成功！');
                        setTimeout(() => {
                            _this.$router.push({
                                path:'/capital/'+_this.$route.params.id
                            });
                        }, 1500);
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            //绘制圆形
            drawCircle(yiniannei,yizhisan,sannianyishang){
                let _this = this;
                let total = Number(yiniannei) + Number(yizhisan) + Number(sannianyishang);
                if(total == 0){
                    _this.onoff.showCircle = false;
                    return false;
                }
                let oData = [
                        {name: '一年内\n', value: yiniannei},
                        {name: '1-3年\n', value: yizhisan},
                        {name: '3年以上\n', value: sannianyishang},
                ];
                let data = [];

                $.each(oData, function(i,c){
                    if(c.value != 0){
                        c.value = (c.value/total).toFixed(2)*100;
                        data.push(c);
                    };
                });
                data[data.length-1].value = 100 - data.reduce((a,b)=>a+b.value,data[data.length-1].value*-1);
                
                var myChart = echarts.init(document.getElementById('circleChart'));
                var option = {
                        series: {
                            type: 'pie',
                            radius: ['46%', '70%'],
                            hoverAnimation: false,
                            label: {
                                    formatter: function(obj){
                                        let data = obj.data;
                                        return data.name + data.value + '%';
                                    },
                                    fontSize: 12,
                                    lineHeight: 16,
                                    width: 2000,
                                    align: 'center',
                                    rich: {
                                        
                                    }
                            },
                            data,
                            color: ['#f59502','#ff4c2c','#008aed']
                        }
                };
                myChart.setOption(option);
                //查看详情
                _this.lookDetail();
            },
            //查看详情折叠
            lookDetail() {
                $('.toggle_slide').click(function(){
                    $('.graph .products').toggleClass('show_list');
                    $('.slide_arrow').toggleClass('open');
                    if( $('.slide_arrow').hasClass('open') ){
                            $('.toggle_slide .text').text('收起详情');
                    }else{
                            $('.toggle_slide .text').text('展开详情');
                    }
                });
            },
            //五年预期
            drawChart(){
                let _this = this;
                function drawLine(opt){
                    var expectChart = echarts.init(document.getElementById('expect'));
                    var fenhongColor = '#ff1919', gushouColor = '#c58f57';

                    var option = {
                            legend: {
                                right: '15',
                                itemWidth: 10,
                                itemHeight: 10,
                                selectedMode: false,
                                textStyle:{
                                    padding: [0,0,2,0]
                                },
                                data:[
                                    {
                                        name:'股权产品',
                                        icon:'rect',
                                        textStyle:{
                                            color:fenhongColor
                                        }
                                    }, 
                                    {
                                        name:'类固收产品',
                                        icon:'rect',
                                        textStyle:{
                                            color:gushouColor
                                        }
                                    }
                                ]
                            },
                            xAxis : {
                                    type : 'category',
                                    boundaryGap : false,
                                    data : ['', opt[0].time, opt[1].time, opt[2].time, opt[3].time, opt[4].time, ''],
                                    axisLine:{
                                        lineStyle:{
                                                opacity:0
                                        }
                                    },
                                    axisTick:{
                                        show:false
                                    },
                                    axisLabel:{
                                        color:'#999999'

                                    }
                            },
                            yAxis : {
                                    axisLine:{
                                        lineStyle:{
                                            opacity:0
                                        }
                                    },
                                    axisTick:{
                                        show:false
                                    },
                                    axisLabel:{
                                        show:false
                                    },
                                    splitLine:{
                                        lineStyle:{
                                                color:'#f3f3f3'
                                        }
                                    },
                                    min: function(value) {
                                        return value.min;
                                    },
                                    splitNumber: 4,
                            },
                            grid:{
                                    x:15,
                                    y:80,
                                    x2:15,
                                    y2:30,
                                    borderWidth:1
                            },
                            label: {
                                    fontSize: 12,
                                    lineHeight: 16,
                                    align: 'center',
                                    rich: {
                                        
                                    }
                            },
                            series : [
                                    {type:'line', name:'股权产品',itemStyle:{color:fenhongColor}},
                                    {type:'line', name:'类固收产品',itemStyle:{color:gushouColor}},
                                    {
                                        type:'line',
                                        symbolSize: 0,
                                        hoverAnimation:false,
                                        lineStyle:{
                                                type:'dashed',
                                                width:2,
                                                color:'#c58f57'
                                        },
                                        data:[
                                                '-', 
                                                '-',
                                                '-',
                                                '-',
                                                '-',
                                                opt[4].fixed,
                                                opt[4].fixed,
                                        ],
                                        smooth: true
                                    },
                                    {
                                        type:'line',
                                        symbolSize: 6,
                                        label: {
                                                show: true,
                                                position: 'top',
                                                formatter: function(obj){
                                                    var data = obj.data;
                                                    if(data.stock === '' && data.value == 0){
                                                            return 0;
                                                    }else if(data.stock === '' && data.value != 0){
                                                            return '{blue|￥'+ data.value + '万}';
                                                    }else if(data.stock != '' && data.value == 0){
                                                            return '{red|预期分红}';
                                                    }else if(data.stock != '' && data.value != 0){
                                                            return '{red|预期分红}\n{blue|' + '￥'+ data.value + '万}';
                                                    }else{
                                                            return '';
                                                    }
                                                },
                                                rich: {
                                                    blue: {
                                                        color: gushouColor
                                                    },
                                                    red: {
                                                        color: fenhongColor
                                                    }
                                                }
                                        },
                                        hoverAnimation:false,
                                        areaStyle: {
                                                opacity:0.1,
                                                color:'#c58f57'
                                        },
                                        lineStyle:{
                                                type:'solid',
                                                width:2,
                                                color:'#c58f57',
                                        },
                                        itemStyle:{
                                                color:'#c58f57'
                                        },
                                        data:[
                                                {
                                                    value:0,
                                                    symbolSize:0,
                                                },
                                                {
                                                    value:opt[0].fixed,
                                                    stock:opt[0].stock,
                                                },
                                                {
                                                    value:opt[1].fixed,
                                                    stock:opt[1].stock,
                                                },
                                                {
                                                    value:opt[2].fixed,
                                                    stock:opt[2].stock,
                                                },
                                                {
                                                    value:opt[3].fixed,
                                                    stock:opt[3].stock,
                                                },
                                                {
                                                    value:opt[4].fixed,
                                                    stock:opt[4].stock,
                                                },
                                        ],
                                        smooth: true
                                    }
                            ]
                    };

                    expectChart.setOption(option);
                }

                //绘制图表
                /* var resdata = [
                    {
                            time:'2018',
                            fixed: '0',
                            stock: ''
                    },
                    {
                            time:'2019',
                            fixed: '0',
                            stock: '股权:预期分红'
                    },
                    {
                            time:'2020',
                            fixed: '0',
                            stock: '股权:预期分红'
                    },
                    {
                            time:'2021',
                            fixed: '20000',
                            stock: '股权:预期分红'
                    },
                    {
                            time:'2022',
                            fixed: '1200',
                            stock: ''
                    }
                ]; */
                var opt = [];
                for( var key in _this.resdata.theNextFiveYears){
                    opt.push( $.extend(true, {time:key}, _this.resdata.theNextFiveYears[key]) );
                }
                drawLine(opt);
            }
        }
    }
</script>

<style lang="less" scoped>
    .baocuo{
        position: absolute;
        top:0;
        right: 0;
        height: 48px;
        padding:0 5px;
        span{
            border:1px solid #fff;
            padding: 4px 5px;
            margin:0 5px;
            font-weight: normal;
            font-size: 14px;
            border-radius: 3px;
        }
    }
    .container{
        background-color: #fff;
    }
    .zengjia{
        position: absolute;
        top:0;
        right:0;
        line-height: 48px;
        padding-right: 15px;
        padding-left: 20px;
        font-size: 16px;
    }
    .com_title{
        padding:0 50px;
    }
    .product{
        padding:10px 20px 0;
        border-top: 5px solid #f2f2f2;
        li{
            font-size: 16px;
            line-height: 50px;
            input{
                width: 100%;
                border:1px solid #ddd;
                font-size: 16px;
                padding:8px 5px;
                line-height: 1;
                color: #333;
            }
            .ipt{
                width: 120px;
                input{
                    width: 140px;
                }
            }
        }
        .suggest{
            .text{
                padding-bottom: 16px;
                textarea{
                    width: 100%;
                    height: 110px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    font-size: 15px;
                    color: #666;
                }
            }
        }
    }
    .confdetail{
        padding: 0 15px;
        padding-top: 10px;
        padding-bottom: 100px;
        h1{
            font-size: 17px;
            font-weight: normal;
            text-align: center;
            span{
                padding-bottom: 4px;
                border-bottom: 2px solid #FF6666;
            }
        }
        .item{
            padding: 15px 0 20px;
            .title{
                margin-top: 20px;
                input{
                    width: 100%;
                    border:1px solid #ddd;
                    font-size: 16px;
                    padding:8px 5px;
                    line-height: 1;
                    color: #333;
                }
            }
            .text{
                padding-bottom: 16px;
                margin-top:10px;
                textarea{
                    width: 100%;
                    height: 110px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    font-size: 15px;
                    color: #666;
                }
            }
        }
        .btns{
            .btn{
                padding: 5px 20px;
                color: #fff;
                font-size: 16px;
                display: inline-block;
                border-radius: 3px;
                &.delete{
                    background-color: #FF6A6A;
                }
                &.use{
                    background-color: #ff8b03;
                }
            }
            &.first{
                text-align: right;
            }
        }
    }
    .savebtn{
        position: absolute;
        bottom:0;
        z-index: 999;
        background-color: #fff;
        padding: 10px 15px;
        width: 100%;
        text-align: center;
        border-top:1px solid #ddd;
        box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
        .btn{
            width: 100%;
            border-radius: 4px;
            padding: 10px 0;
            font-size: 14px;
            background-color: #ffa043;
            color: #fff;
            &:last-child{
                float: right;
            }
        }
    }

    .page_capitalconf{
        @r:2px;
        .topmsg{
            padding: 46/@r 30/@r 12/@r;
            color: #333;
            font-size: 34/@r;
            line-height: 1.5;
        }
        .chart_box{
            padding: 30/@r;
            .graph{
                border:1px solid #f2f1f1;
                border-radius: 20/@r;
                box-shadow: 3px 3px 5px rgba(0,0,0,.08);
                padding: 0;
                .circle_chart{
                    width: 100%;
                    height:420/@r;
                }
                .sub_title{
                    color: #999;
                    font-size: 30/@r;
                    text-align: center;
                }
                .cut_off_line{
                    padding: 48/@r 20/@r 0;
                }
                .products{
                    margin-top: 44/@r;
                    color: #333;
                    max-height: 487*2/@r;
                    overflow: hidden;
                    transition: all .3s;
                    .pro_title{
                        font-size: 36/@r;
                        line-height: 1.1;
                        border-left: 5/@r solid #c58f57;
                        padding-left: 25/@r;
                        vertical-align: middle;
                    }
                    ul{
                        padding: 0 20/@r;
                        li{
                            padding-bottom: 38/@r;
                            h1{
                                font-size: 32/@r;
                                padding: 30/@r 0 36/@r;
                                font-weight: normal;
                            }
                            .info{
                                .top{
                                    font-size: 36/@r;
                                    color: #c58f57;
                                }
                                p{
                                    font-size: 30/@r;
                                    margin-top: 14/@r;
                                    font-family: PingFangSC-Light, sans-serif;
                                }
                            }
                        }
                    }
                    &.show_list{
                        max-height: inherit;
                    }
                }
                .toggle_slide{
                    line-height: 92/@r;
                    font-size: 32/@r;
                    color: #c58f57;
                    text-align: center;
                    .slide_arrow{
                        display: inline-block;
                        width: 40/@r;
                        height: 40/@r;
                        background: url(/public/img/slide_arrow.png) no-repeat center center;
                        background-size: 100% 100%;
                        margin-left: 16/@r;
                        vertical-align: middle;
                        margin-top: -4/@r;
                        transform: rotate(180deg);
                        transition: all .3s;
                        &.open{
                            transform: rotate(0);
                        }
                    }
                }
            }
        }
        .income_box{
            .item{
                padding-top: 50/@r;
                color: #333;
                h1{
                    font-size: 36/@r;
                }
                .expect{
                    height: 360/@r;
                }
                &.item_expect{
                    padding-bottom: 46/@r;
                    h1{
                        padding-left: 30/@r;
                        margin-bottom: 40/@r;
                    }
                }
                &.item_details{
                    padding-left:30/@r;
                }
                .detailsbox{
                    padding: 38/@r 0 16/@r;
                    .ul_box{
                        width: 100%;
                        overflow-x: auto;
                        padding-right:30/@r;
                    }
                    ul{
                        background-color: #faf6f2;
                        padding: 36/@r 0;
                        width: (150*12+20)/@r;
                        padding-right: 15/@r;
                        li{
                            min-width: 150/@r;
                            border-right: 1px solid #c58f57;
                            float: left;
                            text-align: center;
                            .money{
                                color: #c58f57;
                                font-size: 34/@r;
                            }
                            .time{
                                font-size: 30/@r;
                                margin-top: 26/@r;
                            }
                            &:last-child{
                                border: 0;
                            };
                        }
                    }
                }
            }
        }
        .suggest_box{
            color: #333;
            padding: 40/@r 30/@r 0;
            padding-right: 0;
            .title{
                font-size: 36/@r;
                line-height: 1.1;
                border-left: 5/@r solid #c58f57;
                padding-left: 25/@r;
                vertical-align: middle;
            }
            .text{
                font-size: 32/@r;
                line-height: 1.5;
                padding: 30/@r 0 42/@r;
                padding-right: 30/@r;
            }
        }
        .confdetail{
            padding-left: 30/@r;
            padding-top: 50/@r;
            h1{
                font-size: 36/@r;
                line-height: 1.1;
                border-left: 5/@r solid #c58f57;
                padding-left: 25/@r;
                vertical-align: middle;
            }
            .item_ul{
                color: #333;
                padding-right: 30/@r;
                padding-bottom: 44/@r;
                li{
                    padding-right: 15/@r;
                    padding-top: 36/@r;
                    h2{
                        font-size: 32/@r;
                        line-height: 60/@r;
                        padding-left: 90/@r;
                        background: url(/public/img/money_icon.png) left center no-repeat;
                        background-size: 60/@r 60/@r;
                    }
                    p{
                        margin-top: 14/@r;
                        font-size: 30/@r;
                        line-height: 1.5;
                        font-family: PingFangSC-Light, sans-serif;
                    }
                }
            }
        }
        .contact{
            padding: 20/@r 30/@r;
            margin-top: 40/@r;
            a{
                text-align: center;
                background-color: #c58f57;
                color: #fff;
                display: block;
                line-height: 80/@r;
                font-size: 36/@r;
                border-radius: 40/@r;
            }
        }
    }
</style>