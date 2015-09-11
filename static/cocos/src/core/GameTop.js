module.exports=function(env){
///{{{
var gCore=env.gCore=env.gCore||{}
gCore.GameTop=gUtil.Class.extend({
	moduleClasses:[
	],
	constructor:function(classes){
		var thisVar=this;
		_.each(classes,function(aClass){
    		thisVar.moduleClasses.push(aClass);
		});
	},
	moduleDict:{},
	modules:[],
	init:function(){
		var thisVar=this;
		var moduleClasses=this.moduleClasses;
		var modules=this.modules;
		_.each(moduleClasses,function(moduleClass){
			var moduleInst=new moduleClass();
			modules.push(moduleInst);
			thisVar.moduleDict[moduleInst.name]=moduleInst;
		});
		_.each(modules,function(moduleInst){
			moduleInst.init(thisVar);
		});
		_.each(modules,function(moduleInst){
			moduleInst.start(thisVar);
		});
	},
	getModule:function(name){
		var re=this.moduleDict[name];
		if(!re){
			console.log("GameTop.getModule error");
		}else{
			return re;
		}
	}
},{
	webMain:function(){
		var gameInst=new gCore.GameTop([
            gInter.WebClientModule,
		    gUI.ModelManager,
		    gUI.ViewManager,
            gUI.FrontendModule
		]);
		gameInst.init();
		gCore.gameInst=gameInst;
		return gameInst;
	},
	localMain:function(){
		var gameInst=new gCore.GameTop([
		    gController.BattleManager,
		    gController.GameController,
		    gInter.LocalClientModule,
		    gInter.LocalServerModule,
		    gUI.ModelManager,
		    gUI.ViewManager,
		    gUI.FrontendModule
		]);
	    
		gameInst.init();
		gCore.gameInst=gameInst;
		return gameInst;
	},
	serverMain:function(){
		var gameInst=new gCore.GameTop([
			gInter.HttpServerModule
		]);

	    
		gameInst.init();
		gCore.gameInst=gameInst;
		return gameInst;
	},
	androidMain:function(){
		var gameInst=new gCore.GameTop([
		    gController.BattleManager,
		    gController.GameController,
		    gInter.LocalClientModule,
		    gInter.LocalServerModule,
		    gUI.ModelManager,
		    gUI.ViewManager,
		    gUI.FrontendModule
		]);
	    
		gameInst.init();
		gCore.gameInst=gameInst;
		return gameInst;
	}
});


gCore.Module=gUtil.Class.extend({
	init:function(){
	},
	start:function(){
	},
	getServiceImpls:function(){
		return [];
	}
});
gCore.Service=gUtil.Class.extend({
});
//}}}
};
