var g_util=g_util||{}
g_util.Queue=function(){
	data=new Array();
	this.queue=function(object){
		data.push(object);
	};
	this.dequeue=function(){
		var re;
		if(data.length<=0){
			re=null;
		}else{
			re=data[0];
			data.shift();
		}
		return re;
	};
	this.isEmpty=function(){
		if(data.length===0) return true;
		else return false;
	};
	this.getData=function(){
		return data;
	};
}
g_util.ActionQueue=function(){
	data=new Array();
	running=false;
	this.queue=function(object){
		data.push(object);
	};
	this.dequeue=function(){
		var re;
		if(data.length<=0){
			re=null;
		}else{
			re=data[0];
			data.shift();
		}
		return re;
	};
	this.isEmpty=function(){
		if(data.length===0) return true;
		else return false;
	};
	this.isRunning=function(){
		return running;
	};
	this.setRunning=function(){
		running=true;
	};
	this.setStop=function(){
		running=false;
	};
}