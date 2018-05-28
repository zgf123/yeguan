<template>
    <div>
		<slot>
			<img class="default_pic" src="/public/img/upload_pic_default.jpg" alt="">
		</slot>
        <div id="fileList" class="uploader-list uploader-face">
			
		</div>
    </div>
</template>
<script>
    
    export default{
        data(){
            return {
				uploader:''
            }
		},
		props:['uploadProp'],
		computed:{
			imgUrl(){
				return this.uploadProp;
			}
		},
        mounted(){
			
        },
        methods:{
            uploadInit(pickel, params){
				var _this = this;
				if(cusAndroid){
					$(pickel).find('#fileList').click(function(){
						window.android.startGallery(params.type, pickel);
						window.startGallerySuccess = function(el, url) {
							layer.closeAll();
							_this.$emit('uploadEmit', url, pickel);
							_this.deletePic(el, url);
						};
					});
				}else{
					//loading加载
					let loading = `
						<div style="position:absolute;left:10%;top:10%;right:10%;bottom:10%;background-color:#fff;">
							<img style="margin:16px auto 0;" src="/public/img/loading.gif">
							<p style="color:#999;font-size:12px;text-align:center;margin-top:10px;">图片上传中...</p>
						</div>
					`;
					//上传失败
					let failDom = `
						<div style="position:absolute;left:10%;top:10%;right:10%;bottom:10%;background-color:#fff;">
							<p style="color:#999;font-size:12px;text-align:center;margin-top:26px;line-height:1.6;padding: 0 10px;color:#f28c8c;">图片上传失败，点击此处重新选择图片</p>
						</div>
					`;
					//上传成功
					let sucDom = `
						<div style="position:absolute;left:10%;top:10%;right:10%;bottom:10%;background-color:#fff;">
							<p style="color:#999;font-size:12px;text-align:center;margin-top:26px;line-height:1.6;padding: 0 10px;color:#999;">图片上传成功</p>
						</div>
					`;

					var vm = this;
					//判断系统,绑定节点,初始化参数
					var pick = pickel, accept;
					if(is_AdrIos() == 'adr'){
						accept = {
							title: 'Images',
							extensions: 'gif,jpg,jpeg,bmp,png',
							mimeTypes: 'image/*'
						}
					}else{
						accept = {
							title: 'Images',
							extensions: 'gif,jpg,jpeg,bmp,png',
							mimeTypes: 'image/jpg,image/jpeg,image/png'
						}
					};
					//盒子
					var picklist = pickel + ' #fileList';
					//上传地址
					var server = this.axios.defaults.baseURL+'/index/upload';
					//开始
					_this.uploader = WebUploader.create({
						// 选完文件后，是否自动上传。
						auto: false,
						// swf文件路径
						swf: 'src/plugin/uploader/dist/Uploader.swf',
						// 文件接收服务端。
						server,
						// 选择文件的按钮。可选。
						// 内部根据当前运行是创建，可能是input元素，也可能是flash.
						pick: pickel,
						chunked: true, //开启分片上传，避免图片压缩后依然很大
						chunkSize: 1010000,
						fileNumLimit:1,
						formData:{
							token:localStorage.token,
							type:params.type
						},
						//压缩、裁剪图片
						compress:{
							compressSize: 500
						},
						// 只允许选择图片文件。
						accept
					});

					var uploader = _this.uploader;
					
					// 当有文件添加进来的时候
					var $list = $(picklist);
					uploader.on( 'fileQueued', function( file ) {
						if($(pickel+ ' .uploader-del').length){
							$(pickel+ ' .uploader-del').remove();
							$(pickel+ ' .uploader-list').empty();
						}
						$list.html(loading);
						uploader.upload();
					});
					
					// 文件上传成功，给item添加成功class, 用样式标记上传成功。
					uploader.on( 'uploadSuccess', function( file, res ) {
						if(res.code == 1){
							vm.$emit('uploadEmit', res.data.fullImgUrl, pickel);
							vm.deletePic(pickel,res.data.fullImgUrl);
							$list.html(sucDom);
						}else{
							$list.html(failDom);
						}
					});

					// 完成上传完成，成功或者失败都执行。
					uploader.on( 'uploadComplete', function( file ) {
						uploader.removeFile( file.id, true );
					});
				}
				//如果有图片则显示图片
				if(this.imgUrl){
					_this.deletePic(pickel, this.imgUrl);
				}
			},
			//添加上传图片
			addFile(file){
				var _this = this;
				_this.uploader.addFiles(file);
			},
			//重新识别图片
			shibieAgain(layerContent,type,pickel){
				var _this = this;
				if(is_AdrIos() == 'adr'){
					layer.open({
						content:layerContent,
						shadeClose:false,
						btn:['选择图片'],
						yes:function(index){
							// layer.close(index);
							if(cusAndroid){
								window.android.startGallery(type, pickel);
							}else{
								var html = `<input type="file" accept="image/jpg,image/jpeg,image/png" id="selectPic" style="display:none;">`;
								$('body').append(html);
								iptChange('#selectPic');
								// $('#selectPic').triggerFastClick();
								$('#selectPic').click();
							}
						},
						no:function(){
							if(cusAndroid){
								window.android.startGallery(type, pickel);
							}else{
								var html = `<input type="file" accept="image/*" capture="camera" id="selectPic" style="display:none;">`;
								$('body').append(html);
								iptChange('#selectPic');
								$('#selectPic').click();
								// $('#selectPic').triggerFastClick();
							}
						}
					})
				}else{
					layer.open({
						content:layerContent,
						shadeClose:false,
						btn:['选择图片'],
						yes:function(index){
							var html = `<input type="file" accept="image/jpg,image/jpeg,image/png" id="selectPic" style="display:none;">`;
							$('body').append(html);
							iptChange('#selectPic', index);
							$('#selectPic').click();
							// $('#selectPic').triggerFastClick();
						}
					})
				}
				//选择图片后
                function iptChange(el, index){
                    $(el).change(function(){
                        var file = $(this)[0].files[0];
                        _this.addFile(file);
                        if(is_AdrIos() != 'adr'){
                            layer.close(index);
                        }
                        $(el).remove();
                    });
                }
			},
			//增加图片删除功能
			deletePic(pickel,url){
				var vm = this;
				var sucHtml = `
					<div class="uploader-del">
						<img style="position:absolute;width:100%;height:100%;top:0;left:0;" src="${url}">
						<img class="deletePic" src="/public/img/up_pic_delete.png">
					</div>
				`;
				$(pickel).append(sucHtml);
				$(pickel +' .deletePic').click(function(){
					layer.open({
						content: '是否删除重新上传？'
						,btn: ['是','否']
						,shadeClose:false
						,yes:function(index){
							layer.close(index);
							$(pickel+ ' .uploader-del').remove();
							$(pickel+ ' .uploader-list').empty();
							vm.$emit('uploadEmit', '', pickel);
						}
					});
				})
			}
        }
    }
</script>
<style lang="less">
	.default_pic{
		width: 100%;
	}
    .uploader-list{
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left:0;
		// z-index: 99;
	}
	.webuploader-element-invisible{
		position: absolute;
		z-index: 9;
		// background-color: red;
		width: 100%;
		height: 100%;
		left: 0;
		top:0;
		opacity: 0;
	}
	.uploader-del{
		position: absolute;
		z-index: 999;
		width: 100%;
		height: 100%;
		top:0;
		left:0;
		.deletePic{
			width:30px;
			position:absolute;
			right:-12px;
			top:-12px;
			z-index: 99;
		}
	}
</style>
