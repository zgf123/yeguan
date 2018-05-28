<template>
    <div id="PickTime" @click="timePlugin">
        <slot></slot>
    </div>
</template>
<script>
    import mobiscroll from '../../plugin/mobiscroll/js/mobiscroll.js'
    export default{
        data(){
            return {
                
            }
        },
        props:['PickTimeProp','PickTimeBtnCount'],
        computed:{
            defaultValue(){
                let oDate = this.PickTimeProp;
                if(oDate){
                    oDate = new Date(oDate);
                };
                return oDate;
            }
        },
        methods:{
            timePlugin(){
                let vm = this;
				let config = {
					preset: 'date',	
					theme: 'android-holo-light',
					cssClass:'zgf',
					mode: 'scroller',
                    display: 'bottom',
                    // dateFormat: '当前选择：'+'yy-mm-dd',
                    dateFormat: '',
					startYear: (new Date()).getFullYear() -100,
                    endYear: (new Date()).getFullYear() + 100,
					defaultValue: vm.defaultValue,
					closeOnOverlay:true,
					fixedWidth: 60,  //每列的宽度
					height: 40,		//每行的高度
					rows: 5,		//设置有几行
					lang: 'zh',		//设置语言，是否出现AM PM
					buttons: [
					    {
					        text: '取消',
					        handler: function (event, inst) { 
                                inst.hide();
					        }
					    },
					    { 
					        text: '确定',
					        handler: function (event, inst) {
                                let y = inst.values[0];
                                let m = Number(inst.values[1])+1;
                                let d = inst.values[2];
                                let date = y + '-' +  (m<10 ? ('0'+''+m) : m) + '-' + (d<10 ? ('0'+''+d) : d);
                                vm.$emit('PickTimeEmit', date);
                                inst.hide();
					        }
					    }
					],
					onCancel: function (valueText, inst) {
				    	
				    }
                };

                //根据情况显示按钮个数
                if(vm.PickTimeBtnCount == 3){
                    config.buttons.splice(1,0,
                        {
					        text: '清空',
					        handler: function (event, inst) {
                                vm.$emit('PickTimeEmit', 'clear');
                                inst.hide();
					        }
					    }
                    );
                }
                
                let instance = $( '#PickTime' ).mobiscroll(config).mobiscroll('show');
            }
        }
    }
</script>
<style lang="less" scoped>
    /*引入插件css*/
</style>
