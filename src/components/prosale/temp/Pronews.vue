<template>
    <div class="content cus_body">
        <div class="nav flex_align">
            <div class="back_arrow"></div>
            <div class="center flex_1">
                <input type="text" v-model="searchtext" placeholder="请输入项目名称">
            </div>
            <div class="search"><div class="search_btn" @click="searchFn">搜索</div></div>
        </div>
        <div v-if="showdata.length>0?false:true" class="com_noinfo">
            <p><img src="/src/assets/images/no_info.png" alt=""></p>
        </div>
        <div class="pro_col lyui_tap_active" v-for="(item,index) in showdata" :key="index" @click="lookDetail(item.product_id,item.product_name)">
            <div class="pro_col_head flex_align bor_b">
                <div class="pro_col_name flex_1 text_o">{{item.product_name}}</div>
                <div class="pro_col_time">{{item.news_date}}</div>
            </div>
            <div class="pro_col_con cr">
                <div class="pro_pdf" v-if="item.news_files">
                    <span class="file_btn text_o" @click.stop="lookFile(item.news_content, item.news_files)">{{item.news_content}}</span>
                </div>
                <div class="pro_intro max_line" v-else>{{item.news_content}}</div>
            </div>
        </div>
        <div id="laypageBtn" class="more_btn"></div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                searchtext:'',
                productnews:[],
                productnewsData:[],
                showdata:[]
            }
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                var data = this.qs.stringify({
					token:localStorage.token,
                    keyword:this.searchtext
				});
                this.axios.post('/product/allnews',data).then(function(res){
                    // console.log(res);
                	if(res.data.code == 1){
                        this.productnews = res.data;
                        this.productnewsData = res.data.data || [];
                        this.pagePlugin();
                    }
                }.bind(this));
            },
            pagePlugin(){
                var _this = this;
                var data = _this.productnewsData;
                var nums = 15;
                var pages = Math.ceil(this.productnewsData.length/nums);
                // console.log(pages);
                _this.showdata = [];

                function appendimg(curr){
                    var addArr = data.splice(0,nums);
                    _this.showdata = _this.showdata.concat(addArr);
                }

                //调用分页
                laypage({
                    cont: 'laypageBtn',
                    pages: pages,
                    skin: 'flow',
                    groups: 0,
                    prev: false,
                    next: '查看更多',
                    jump: function(obj,first){
                        if(obj.curr === obj.pages-1){
                            $('#laypageCon').append(appendimg(obj.curr));
                            this.next = '没有更多了';
                            return false;
                        }
                        $('#laypageCon').append(appendimg(obj.curr));
                    }
                })
            },
            searchFn(){
                this.fetchData();
            },
            lookFile(name,link){
            	// window.location.href=link;
            	/* if(is_AdrIos() == 'adr'){
	            	window.location.href='/src/plugin/pdfjs/demo.html?url='+link;
            	}else{
            		window.location.href=link;
            	} */
                // console.log(name,link);
                link = link.split('\\').join('').split('[\"').join('').split('\"]').join('');
                try {
                    if(cusAndroid){
                        window.android.readPDF(name,link);
                    }else{
                        window.webkit.messageHandlers.readPDF.postMessage({pdfName:name,pdfUrl:link});
                    }
                } catch (error) {
                    window.location.href=link;
                }
            },
            lookDetail(pid,name){
            	this.$router.push({
            		path:'/prosale/item',
            		query:{
            			name,
            			pid:pid
            		}
            	})
            }
        }
    }
</script>
<style lang="less" scoped>
    .content{
        background-color: #f4f4f4;
    }
</style>

