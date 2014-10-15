var gUtil=gUtil||{}
gUtil.Queue=function(){
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
gUtil.ActionQueue=function(){
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
//check if path is continuous
//path:[{x:1,y:2}]
gUtil.continuous=function(path){
  for(var i=0,l=path.length;i+1<l;i++){
    a=path[i];
    b=path[i+1];
    if(a.x===b.x){
      if(a.y-b.y===1||a.y-b.y===-1) continue;
      else return false;
    }else if(a.y===b.y){
      if(a.x-b.x===1||a.x-b.x===-1) continue;
      else return false;
    }else{
      return false;
    }
  }
  return true;
}
//all true return true, one false return false
gUtil.allTrueIter=function(array,check){
  for(var i=0,l=path.length;i+1<l;i++){
    if(!check(array[i])) return false;
  }
  return true;
}
gUtil.abs=function(a){
	return (a>=0?a:-a);
}
gUtil.posAbs=function(a,b){
  var l=a.x-b.x;
  var w=a.y-b.y;
  l=(l>=0?l:-l);
  w=(w>=0?w:-w);
  return l+w;
}