var gUIState=gUIState||{};
gUIState.UIService=function(){
	this.choose=null;
	this.posToCell=null;
	var interService=null;
	//
	this.init=function(gameTop){
		interService=gameTop.getService("inter");
    	self.choose=new gUIState.Choose();
    	self.choose.init(self);
    	console.log(this.posToCell);
	};
	this.logicTriggerAction=function(){}
	this.chooseTriggerAction=function(){}
}
gUIState.TestUIService=function(){
	this.testUI=null;
	var self=this;
	this.chooseTriggerAction=function(x,y){
		//refresh testui
		if(this.posToCell[x]) if(this.posToCell[x][y]){
        	this.testUI.setIJCell(x,y,this.posToCell[x][y]);
		}
	}
	this.setTestUI=function(testUI){
		self.testUI=testUI;
	}
}
gUIState.TestUIService.prototype=new gUIState.UIService();
