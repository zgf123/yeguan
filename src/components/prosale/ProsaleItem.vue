<template>
<div>
	<component :is="'Header'"></component>
	<div class="Prosale Page">
		<div class="content">
			<div class="item_title flex_align"><b class="flex_1 text_o">{{$route.query.name}}</b>
				<!-- <span @click="linkCus($route.query.name)">投资客户</span> -->
			</div>
			<div class="item_margin"></div>
			<div class="pro_col" v-for="(item,index) in newsdata" :key="index">
				<div class="pro_col_con cr">
					<div class="item_in_time">{{item.product_news_update_time}}</div>
					<div class="pro_pdf" v-if="item.product_news_files">
						<a href="javascript:;" @click="lookFile(item.product_news_content,item.product_news_files)" class="file_btn text_o">{{item.product_news_content}}</a>
					</div>
					<div class="pro_intro" v-else>{{item.product_news_content}}</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
        name:'prosaleItem',
		data(){
			return{
				news:{},
				newsdata:[]
			}
		},
		computed:{
            loading(){
                return this.$store.state.loading;
            }
        },
		mounted(){
			sessionStorage.isShow = 1;
		   	this.fetchData();
		},
		methods:{
			fetchData(){
				var _this = this;
				var data = this.qs.stringify({
					'token':localStorage.token,
					'pid':_this.$route.query.pid
				});
                this.axios.post('/product/news',data).then(function(res){
                	this.news = res.data;
                	this.newsdata = res.data.data;
                }.bind(this)).catch(function(err){
                    //code..
                })
            },
            linkCus(name){
            	this.$router.push({
            		path:'/report',
            		query:{
            			keyword: name
            		}
            	})
            },
			lookFile(name,link){
            	// window.location.href=link;
				link = link.split('\\').join('').split('[\"').join('').split('\"]').join('');
				// console.log(name,link);
				// return false;
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
		}
	}
</script>
<style scoped="scoped">
	/*引入插件css*/
	/* @import '../plugin/mobiscroll/css/mobiscroll.css'; */
	/*@import '../plugin/mobiscroll/css/mobiscrollcustom.css';*/

	/*自定义css*/
	.animatedPage {
        animation-duration: .4s;
        animation-fill-mode: both;
        position: absolute;
		top:57px;
		width: 100%;
		left:0;
    } 

    @keyframes fadeInUpSmall {
	  from {
	    opacity: 0;
	    transform: translate3d(0, 4rem, 0);
	  }

	  to {
	    opacity: 1;
	    transform: none;
	  }
	}

	.fadeInUpSmall {
	  animation-name: fadeInUpSmall;
	  /*animation-delay: .1s;*/
	}

	@keyframes fadeOutDownSmall {
	  from {
	    opacity: 1;
	  }

	  to {
	    opacity: 0;
	    transform: translate3d(0, 4rem, 0);
	  }
	}

	.fadeOutDownSmall {
	  animation-name: fadeOutDownSmall;
	}
	
</style>