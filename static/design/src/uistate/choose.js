var gUIState=gUIState||{};
gUIState.Choose=function(){

	this.uiService=null;
	this.start=null;
	this.path=[];
	this.end=null;
	this.now=null;
	
	this.state=0; //0 for empty ; 1 for pathing ;
	
	

	var self=this;
	this.over=function(x,y){
		var ui=this.uiService;
		this.now={x:x,y:y};
		if(this.state==0){
		}
	}
	this.out=function(x,y){
		var ui=this.uiService;
	}
	this.click=function(x,y){
		var ui=this.uiService;
	}
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
		this.posToCell=uiService.posToCell;
	}
	this.chooseStart=function(x,y){
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