<template>
<div class="ReportSearch" v-show="isShow">
    <div class="mask" :class="class_on" @click="search('cacel')"></div>
    <div class="form adr_input_show adr_input_box" :class="class_on">
        <div class="row flex_align bor_b">
            <div class="label">开始时间</div>
            <div class="flex_1 arrow">
                <component :is="'PickTime'" :PickTimeBtnCount="'3'" @PickTimeEmit="startTimeFn">
                    <div class="time">{{searchCondition.start_time || timeTextPlaceholder}}</div>
                </component>
            </div>
        </div>
        <div class="row flex_align bor_b">
            <div class="label">结束时间</div>
            <div class="flex_1 arrow">
                <component :is="'PickTime'" :PickTimeBtnCount="'3'" @PickTimeEmit="endTimeFn">
                    <div class="time">{{searchCondition.end_time || timeTextPlaceholder}}</div>
                </component>                
            </div>
        </div>
        <div class="row flex_align bor_b">
            <div class="label">状态</div>
            <div class="flex_1">
                <div class="btndiv"><span class="btn type" :class="searchCondition.isJz == 'jz' ? 'on' : ''" @click="selectState('jz')">进账</span></div>
                <div class="btndiv"><span class="btn type" :class="searchCondition.isJz == 'daoqi' ? 'on' : ''" @click="selectState('daoqi')">到期</span></div>
            </div>
        </div>
        <div class="row flex_align bor_b">
            <div class="label">类型</div>
            <div class="flex_1">
                <div class="btndiv"><span class="btn state" :class="searchCondition.fund_type == '0' ? 'on' : ''" @click="selectType('0')">全部</span></div>
                <div class="btndiv"><span class="btn state" :class="searchCondition.fund_type == '1' ? 'on' : ''" @click="selectType('1')">固收</span></div>
                <div class="btndiv"><span class="btn state" :class="searchCondition.fund_type == '2' ? 'on' : ''" @click="selectType('2')">股权</span></div>
            </div>
        </div>
        <!-- 固收1 股权2  fund_type -->
        <!-- 上月prev 全部all   time-->
        <!-- 进账 start_2  到期end_1    order -->
        <div class="row flex_align bor_b">
            <div class="label">客户姓名</div>
            <div class="flex_1">
                <input class="time" type="text" placeholder="请输入" v-model="searchCondition.keyword">
            </div>
        </div>
        <div class="row">
            <div class="search_btn" @click="search()">搜索</div>
        </div>
    </div>
</div>
</template>
<script>
	export default{
		name:'reportsearch',
		data(){
			return{
                timeTextPlaceholder:'请选择时间',
                searchCondition:{},
                isShow:false, //遮罩是否显示
                class_on:'' //on状态
			}
		},
        props:['searchProp'],
		mounted(){
			adrShowInput();     //在安卓端调整键盘出现时,input的位置
            setTimeout(() => {
                this.searchCondition =  $.extend({}, this.searchProp);
            }, 0);
		},
		methods:{
            //选择时间
            startTimeFn(res){
                if(res == 'clear'){
                    this.timeTextPlaceholder = '未选择时间';
                    this.searchCondition.start_time = '';
                }else{
                    var start_time = res,
                        end_time = this.searchCondition.end_time;
                    if(start_time && end_time){
                        let start = new Date(start_time).getTime(),
                            end = new Date(end_time).getTime();
                        if( start > end ){
                            layer.open({
                                skin:'msg',
                                content:'开始时间不能大于结束时间',
                                time:2
                            });
                        }else{
                            this.searchCondition.start_time = res;
                        }
                    }else{
                        this.searchCondition.start_time = res;
                    }
                }
            },
            endTimeFn(res){
                if(res == 'clear'){
                    this.timeTextPlaceholder = '未选择时间';
                    this.searchCondition.end_time = '';
                }else{
                    var start_time = this.searchCondition.start_time,
                        end_time = res;
                    if(start_time && end_time){
                        let start = new Date(start_time).getTime(),
                            end = new Date(end_time).getTime();
                        if( start > end ){
                            layer.open({
                                skin:'msg',
                                content:'开始时间不能大于结束时间',
                                time:2
                            });
                        }else{
                            this.searchCondition.end_time = res;
                        }
                    }else{
                        this.searchCondition.end_time = res;
                    }
                }
            },
            //选择状态
            selectState(state){
                this.searchCondition.isJz = state;
            },
            //选择类型
            selectType(type){
                this.searchCondition.fund_type = type;
            },
            //点击搜索按钮
            search(cacel){
                let _this = this;
                if(cacel){
                    this.$emit('searchEmit','取消');
                }else{
                    for( var key in this.searchProp){
                        this.searchProp[key] = this.searchCondition[key];
                    };
                    this.$emit('searchEmit','确定');
                }
            },
            //显示搜索条件遮罩
            showCondition(shaixuan){
                let _this = this;
                if(shaixuan){
                    _this.isShow = true;
                    setTimeout(() => {
                        _this.class_on = 'on';
                    }, 50);
                }else{
                    this.class_on = '';
                    setTimeout(() => {
                        _this.isShow = false;
                    }, 400);
                }
            }
        }
	}
</script>
<style scoped="scoped" lang="less">
	.ReportSearch{
        position: absolute;
        width: 100%;
        top:48px;
        bottom:0;
        left: 0;
        overflow: hidden;
    }
    .mask{
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        right:0;
        top: 0;
        bottom:0;
        -webkit-transition: all .2s;
        transition: all .2s;
        opacity: 0;
        &.on{
            opacity: 1;
        }
    }
    .form{
        background-color: #fff;
        position: absolute;
        padding-left:15px;
        top:0;
        bottom:0;
        right:0;
        width: 8rem;
        overflow-y: auto;
        -webkit-transition: all .4s;
        transition: all .4s;
        -webkit-transform: translate3d(8rem,0,0);
        transform: translate3d(8rem,0,0);
        &.on{
            -webkit-transform: translate3d(0,0,0);
            transform: translate3d(0,0,0);
        }
    }
    .arrow{
        padding-right: 17px;
        background: url(/public/img/arrow_icon.png) no-repeat center right;
        background-size: 10px 15px;
    }
    .row{
        height: 51px;
        padding-right: 15px;
        .label{
            font-size: 17px;
            color: #323232;
            width: 36%;
        }
        .time{
            width: 100%;
            font-size: 17px;
            color: #b5b5b5;
        }
        .btndiv{
            float: left;
            width: 33.3333%;
            max-width: 60px;
            text-align: left;
            padding-right:3px;
        }
        .btn{
            display: inline-block;
            width: 100%;
            max-width: 45px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 3px;
            color: #b5b5b5;
            padding: 3px 0;
            font-size: 15px;
            margin-right: 5px;
            &.on{
                background-color: #ff8b03;
                border: #ff8b03;
                color: #fff;
                border: 1px solid #ff8b03;
            }
        }
        .search_btn{
            margin-top: 30px;
            background-color: #ff8b03;
            color: #fff;
            border-radius: 4px;
            text-align: center;
            line-height: 45px;
        }
    }
    
</style>