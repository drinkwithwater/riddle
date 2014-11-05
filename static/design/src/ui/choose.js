gUI.Choose=function(){
	this.uiService=null;
	this.start=null;
	this.path=[];
	this.end=null;

	var self=this;
	function continueValid(x,y){
		var length=path.length;
		if(length==0) return false;
		else{
			var point=path[length-1];
			var distance=gUtil.posAbs(point);
			if(distance==1) return true;
			else return false;
		}
	}

	this.init=function(uiService){
		this.uiService=uiService;
	}
	this.start=function(x,y){
		this.start={x:x,y:y};
		this.path.append({x:x,y:y});
	}
	this.through=function(x,y){
	}
	this.end=function(x,y){
	}
	
	this.clear=function(){
		this.start=null;
		this.path=[];
		this.end=null;
	}
}