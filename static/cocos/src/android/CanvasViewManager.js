var gUI=gUI||{};
var htmlView; // a global ver for debug
gUI.ViewManager=gUtil.Class.extend({
    frontendModule:null,
    modelManager:null,

    moveSpeed:10,//1 cell 1 second
    bulletSpeed:20,
    
    gameLayer:null,
    scriptMenu:null,
    closeMenu:null,
    mainScene:null,

    name:"viewModule",

    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
		    this.modelManager=gameTop.getModule("modelModule");
            this.frontendModule=gameTop.getModule("frontendModule");
        }
        this.unitViews={};

	    //for test
	    htmlView=this;
        htmlView.run=function(){
            gCore.gameInst.getModule("frontendModule").viewStart("oneway");
        }
        htmlView.getSprite=function(){
            return this.getSpritePool().sprite$("0_0");
        }
    },
    start:function(gameTop){
        var thisVar=this;
        var modelManager=this.modelManager;
	    this.mainScene=new gViews.MainScene();
	    this.gameLayer=new gViews.GameLayer(gameTop);
        this.scriptMenu=new gViews.ScriptMenu(gameTop);
        this.closeMenu=new gViews.CloseMenu(gameTop);

        this.gameLayer.setVisible(false);
        this.closeMenu.setVisible(false);
        this.mainScene.bind(gameTop);
	    /*
          this.loadTemplates(["unit","board","menu"],function(){
          var scriptNames=_.map(gScript.battleScript,
          function(v,k){
          return k;
          });
          thisVar.menuView=new gViews.MenuView({
          scriptNames:scriptNames,
          viewActionHandler:thisVar.viewActionHandler
          });

          $("#menu").html(thisVar.menuView.render().el);

          thisVar.reRender();

          //TODO start a inst
          //if do this ,clean up some code above.
          thisVar.viewActionHandler.viewStart("default");
          });*/
    },
    reRender:function(){
        var thisVar=this;
        var modelManager=this.modelManager;
        this.scriptMenu.setVisible(false);
        
        this.gameLayer.setVisible(true);
        this.closeMenu.setVisible(true);
        this.gameLayer.render();
        console.log("view reRender");
	    /*
          thisVar.boardView=new gViews.BoardView({
          viewManager:thisVar,
          modelManager:modelManager,
          viewActionHandler:thisVar.viewActionHandler
          });

          $("#main").html(thisVar.boardView.render().el);
          thisVar.boardView.afterRender();*/
    },
    showMenu:function(){
        this.scriptMenu.setVisible(true);
        
        this.gameLayer.setVisible(false);
        this.closeMenu.setVisible(false);
    },
    refreshTriggerRange:function(){
        //this.gameLayer.getAreaNode().showRange();
    },
    createUnitView:function(aDict){
    },
    animatePosMove:function(srcPos,dstPos,callback){
    },
    animateBulletMove:function(srcPos,dstPos,callback){
    },
    animateHarm:function(pos,callback){
    },
    animateUnitDie:function(pos,callback){
    },
    moveLight:function(pos){
    },
    getUnitPool:function(){
        return this.gameLayer.getUnitPool();
    },
    getGameLayer:function(){
        return this.gameLayer;
    },
    getAreaNode:function(){
        return this.gameLayer.getAreaNode();
    },


    
    destroy:function(){
    }
});
