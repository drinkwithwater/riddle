var gTest=gTest||{}
gTest.GameTopTest=function(){
	this.init=function(){
		this.logicService=new gLogic.LogicService();
		this.interService=new gInter.InterService();

		this.serviceDict["logic"]=this.logicService;
		this.serviceDict["inter"]=this.interService;
		
		this.logicService.init(this);
		this.interService.init(this);

		var script=gScript.mazeScripts[0];
		script.initLogic(this.logicService);
	}
}
gTest.GameTopTest.prototype=new gTop.GameTop();
/****************************************************************/
gTest.testImpl=new gTest.GameTopTest();
gTest.testImpl.init();
/*
var base=function(){
	this.x="base";
	this.dosth=function(){
		console.log(this.x);
	}
	this.printx=function(){
		console.log(this.x);
	}
}
var ext=function(){
	this.x="ext";
	this.dosth=function(){
		console.log(this.x);
	}
}
ext.prototype=new base();
var a=new Array(10);
*/