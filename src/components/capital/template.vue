<template>
    <div>
        <component :is="'Header'">
            <div slot="title" class="com_title text_o">{{resdata.customer_real_name}}的资产配置报告</div>
            <router-link slot="search" tag="div" class="bianji" :to="'/capital/'+$route.params.id+'/add'">
                <img src="/public/img/capital_edit_head.png">
            </router-link>
        </component>
        <div class="container Page">
            <div class="page_capitalconf">
                  <div class="chart_box">
                        <div class="graph">
                              <!-- <div id="circleChart" class="circle_chart"></div> -->
                              <div class="asset_conf_img"><img src="/public/img/asset_conf.jpg" alt=""></div>
                        </div>
                  </div>
                  <div class="suggest_box" v-if="suggest_show">
                        <div class="title">投资建议</div>
                        <div class="text bor_b">{{resdata.suggest}}</div>
                  </div>
                  <div class="confdetail" v-if="resdata">
                        <h1>产品推荐</h1>
                        <ul class="item_ul">
                            <li v-for="item in resdata.insurance.products" :key="item.id">
                                <h2>{{item.product_name}}</h2>
                                <p>{{item.suggest}}</p>
                            </li>
                            <li v-for="item in resdata.fixed.products" :key="item.id">
                                <h2>{{item.product_name}}</h2>
                                <p>{{item.suggest}}</p>
                            </li>
                            <li v-for="item in resdata.stock.products" :key="item.id">
                                <h2>{{item.product_name}}</h2>
                                <p>{{item.suggest}}</p>
                            </li>
                        </ul>
                  </div>
            </div>
        </div>
        <div class="savebtn cr">
            <div class="btn save" @click="sendCustomer()">发送给客户</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'rules',
        data(){
            return {
                switch:true,
                suggest_show:false,
                resdata:''
            }
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                let _this = this;
				var data = this.qs.stringify({
                    token:localStorage.token,
                    customer_id: _this.$route.params.id
				});
                this.axios.post('/asset/create', data).then(function(res){
                    if(res.data.code == 1){
                        _this.resdata = res.data.data;
                        if(_this.resdata.suggest){   //未进行风险评测不显示投资建议
                            _this.suggest_show = true;
                        }
                        _this.resdata.stock = {products : res.data.data.products};
                        _this.resdata.fixed = {products : []};
                        _this.resdata.insurance = {products : []};
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            },
            drawCircle(baoxian,gushou,guquan){
                var myChart = echarts.init(document.getElementById('circleChart'));
                var option = {
                        series: {
                            type: 'pie',
                            radius: ['46%', '70%'],
                            hoverAnimation: false,
                            label: {
                                    fontSize: 16,
                                    lineHeight: 20,
                                    width: 2000,
                                    align: 'center',
                                    rich: {
                                        
                                    }
                            },
                            data: [
                                    {name: '保险类\n'+baoxian+'%', value: baoxian},
                                    {name: '固收类\n'+gushou+'%', value: gushou},
                                    {name: '股权类\n'+guquan+'%', value: guquan},
                            ],
                            color: ['#999','#f59502','#008aed']
                        }
                };
                myChart.setOption(option);
            },
            sendCustomer(){
                let _this = this;
                if(!_this.suggest_show){
                    _this.$store.commit('msg','该客户未进行风险评测，不能发送!');
                    return false;
                }
                if(!_this.switch) return false;
                _this.switch = false;
                
				let data = this.qs.stringify({
                    token:localStorage.token,
                    customer_id: _this.$route.params.id,
                    data:_this.resdata
                });
                //先保存创建新配置
                this.axios.post('/asset/store', data).then(function(res){
                    if(res.data.code == 1){
                        //发送给客户
                        let dataCus = _this.qs.stringify({
                            token:localStorage.token,
                            customer_id: _this.$route.params.id,
                            asset_id: res.data.data,
                        });
                        _this.axios.post('/asset/send', dataCus).then(function(res){
                            // _this.switch = true;
                            if(res.data.code == 1){
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
                    }else{
                        _this.$store.commit('msg','请求错误，请重试');
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @r:75rem;
    .bianji{
        position: absolute;
        top:0;
        right:0;
        width: 48px;
        height: 48px;
        padding: 12px;
        img{
            width:100%;
            height: 100%;
        }
    }

    .container{
        background-color: #fff;
    }
    .page_capitalconf{
        padding-bottom: 120/@r;
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
                        // 苹方-简 常规体
                        // font-family: PingFangSC-Regular, sans-serif;

                        // 苹方-简 极细体
                        // font-family: PingFangSC-Ultralight, sans-serif;

                        // 苹方-简 细体
                        font-family: PingFangSC-Light, sans-serif;

                        // 苹方-简 纤细体
                        // font-family: PingFangSC-Thin, sans-serif;

                        // 苹方-简 中黑体
                        // font-family: PingFangSC-Medium, sans-serif;

                        // 苹方-简 中粗体
                        // font-family: PingFangSC-Semibold, sans-serif;
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
    .asset_conf_img{
        padding:24/@r 16/@r;
        img{
            width: 100%;
        }
    }
</style>