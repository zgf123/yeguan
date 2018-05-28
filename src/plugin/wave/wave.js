function wave(options){
	var defaluts={
		id:'canvas',
		height:400,
		colorBefore:'rgba(255,255,255,1)',
		colorAfter:'rgba(255,255,255,0.6)',
		waterTop:10,
		waterline:300,
		angleChange:0.004,
		speedChange:0.02
	}
	function extend(des, src, override){
	   	if(src instanceof Array){
	       	for(var i = 0, len = src.length; i < len; i++)
	           extend(des, src[i], override);
	   	}
	   	for( var i in src){
	       	if(override || !(i in des)){
	           des[i] = src[i];
	       	}
	   	}	 
	   return des;
	}
	var options = extend(defaluts,options,true);
	var canvas=document.getElementById(options.id);
	var w=document.body.offsetWidth;
	canvas.setAttribute('width',w);
	canvas.setAttribute('height',options.height);
	var ctx=canvas.getContext('2d');
	var W = canvas.width;
	var H = canvas.height;
	var speed=0;
	function draw(angle,angle1){
		ctx.save();
   		ctx.fillStyle=options.colorAfter;
   		ctx.lineWidth=1;
   		ctx.beginPath();
   		ctx.moveTo(0,options.waterline);
		for(var i=0;i<=W;i++){
			ctx.lineTo(i,options.waterline+Math.sin(angle+speed)*options.waterTop);
			angle+=options.angleChange;
		}
   		ctx.lineTo(W,H);
   		ctx.lineTo(0,H);
   		ctx.closePath();
   		ctx.fill();
   		ctx.restore();
   		ctx.save();
   		ctx.fillStyle=options.colorBefore;
   		ctx.lineWidth=1;
   		ctx.beginPath();
   		ctx.moveTo(0,options.waterline);
		for(var i=0;i<=W;i++){
			ctx.lineTo(i,options.waterline+Math.cos(angle1+speed)*options.waterTop);
			angle1+=options.angleChange;
		}
   		ctx.lineTo(W,H);
   		ctx.lineTo(0,H);
   		ctx.closePath();
   		ctx.fill();
   		ctx.restore();
   		speed+=options.speedChange;
	}
   	(function drawFrame(){
   		window.requestAnimationFrame(drawFrame);
   		ctx.clearRect(0,0,W,H);
   		draw(0,0);
   	})();
}
export default wave;