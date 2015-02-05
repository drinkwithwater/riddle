var gTop=gTop||{}
gTop.GameTop=function(){
	this.uiService=null;
	this.logicService=null;
	this.interService=null;
	this.serviceDict={};
	this.init=function(){
		//implement by other
		/*
		this.uiSerivce=new gUI.UIService();
		this.logicService=new gLogic.LogicService();
		this.interService=new gInter.InterService();

		this.serviceDict["ui"]=this.uiService;
		this.serviceDict["logic"]=this.logicService;
		this.serviceDict["inter"]=this.interService;*/
	}
	this.getService=function(name){
		var re=this.serviceDict[name];
		if(!re){
			console.log("gTop.GameTop.getService error");
		}else{
			return re;
		}
	}
}