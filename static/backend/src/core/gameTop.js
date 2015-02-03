var gTop=gTop||{}
gTop.GameTop=gUtil.Class.extend({
	moduleClasses:{
	},
	uiService:null,
	logicService:null,
	interService:null,
	serviceDict:{},
	modules:[],
	init:function(){
		var moduleClasses=this.moduleClasses;
		var modules=this.modules;
		for(var i=0,length=moduleClasses.length;i<length;i++){
			var moduleClass=moduleClasses[i];
			modules.push(new moduleClass());
			//TODO add service
		}
		for(var i=0,length=modules.length;i<length;i++){
			modules[i].init(this);
		}
		for(var i=0,length=modules.length;i<length;i++){
			modules[i].start(this);
		}
		/*
		this.uiSerivce=new gUI.UIService();
		this.logicService=new gLogic.LogicService();
		this.interService=new gInter.InterService();

		this.serviceDict["ui"]=this.uiService;
		this.serviceDict["logic"]=this.logicService;
		this.serviceDict["inter"]=this.interService;*/
	},
	getService:function(name){
		var re=this.serviceDict[name];
		if(!re){
			console.log("gTop.GameTop.getService error");
		}else{
			return re;
		}
	},
	main:function(){
	}
});