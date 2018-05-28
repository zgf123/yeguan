<template>
    <div id="PickSelect" @click="pick">
        <slot></slot>
    </div>
</template>
<script>
    import mobiscroll from '../../plugin/mobiscroll/js/mobiscroll.js'
    export default{
        data(){
            return {
                keys:[],
                parseValue:''
            }
        },
        props:['pickSelectData'],
        computed:{
            selectData(){
                return this.pickSelectData;
            },
            wheels(){
                let _this = this;
                let wheels = {};
                let keys = Object.keys(this.pickSelectData.def);
                this.keys = keys;
                let key = keys[0];
                this.parseValue = 'z' + this.pickSelectData.def[keys[0]] || '';
                let value = keys[1];
                this.pickSelectData.arr.forEach(v => {
                    wheels['z'+v[key]] = v[value];
                });
                return wheels;
            }
        },
        mounted(){
            // this.parseValue = 'z' + this.pickSelectData.opts.id || '';
        },
        methods:{
            pick(){
                let vm = this;
                let config = {
	            	theme: 'android-holo-light',
                    cssClass:'zgf',
                    display: 'bottom',
					closeOnOverlay:true,
					height: 40,		//每行的高度
					rows: 4,		//设置有几行
					lang: 'zh',		//设置语言
		            wheels:[
                        {
                            'item':vm.wheels
                        }
                    ],
	                parseValue: (valueText) => {//设置初始值
			            return [vm.parseValue];
			        },
	                formatResult: (key) => {  //显示结果
	                    return vm.selectData.title;
	                },
	                buttons: [
					    {
					        text: '取消',
					        handler:(event, inst) => {
                                inst.hide();
					        }
					    },
					    {
					        text: '确定',
					        handler:(event, inst) => {
                                vm.parseValue = inst.values[0];
                                let id = inst.values[0].slice(1);
                                let name = vm.wheels[inst.values[0]];
                                let result = {};
                                result[vm.keys[0]] = id;
                                result[vm.keys[1]] = name;
                                vm.$emit('pickSelectVal',result);
					            inst.hide();
					        }
					    }
					],
					onCancel:(valueText, inst) => {
                        
				    }
                }
                let instance = $( '#PickSelect' ).mobiscroll(config).mobiscroll('show');
            }
        }
    }
</script>
<style lang="less" scoped>
    /*引入插件css*/
</style>
