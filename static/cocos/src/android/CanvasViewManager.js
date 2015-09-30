var gUI=gUI||{};
var htmlView; // a global ver for debug
gUI.ViewManager=gUtil.Class.extend({
    frontendModule:null,
    modelManager:null,

    moveSpeed:10,//1 cell 1 second
    bulletSpeed:20,
    
    gameLayer:null,
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
            gCore.gameInst.getModule("frontendModule").viewStart("default");
        }
    },
    start:function(gameTop){
        var thisVar=this;
        var modelManager=this.modelManager;
	    this.mainScene=new gViews.MainScene();
	    this.gameLayer=new gViews.GameLayer(gameTop);
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
    refreshTriggerRange:function(){
        //this.boardView.refreshTriggerRange();
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
    getSpritePool:function(){
        return this.gameLayer.spritePool;
    },


    
    destroy:function(){
    }
});
