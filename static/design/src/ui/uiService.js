var gUI=gUI||{};
gUI.UIService=function(){
	var interService=null;
	//
	this.init=function(gameTop){
		logicService=gameTop.getService("logic");
	};
	this.triggerAction=function(){
	}
}
gUI.Choose=function(){
	this.start=null;
	this.path=[];
	this.end=null;

	var self=this;
	function continueValid(x,y){
	}
	function rangeValid(x,y){
	}

	this.start=function(x,y){
		this.start={x:x,y:y};
		this.path.append({x:x,y:y});
	}
	this.through=function(x,y){
	}
	this.end=function(x,y){
	}
}
