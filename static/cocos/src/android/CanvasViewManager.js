var gUI=gUI||{};
var htmlView; // a global ver for debug
gUI.ViewManager=gUtil.Class.extend({
    viewActionHandler:null,
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
            this.viewActionHandler=gameTop.getModule("frontendModule");
        }
        this.unitViews={};

	    //for test
	    htmlView=this;
    },
    start:function(gameTop){
        var thisVar=this;
        var modelManager=this.modelManager;
	    this.mainScene=new gViews.MainScene();
	    this.gameLayer=new gViews.GameLayer();
	    this.mainScene.bind(gameTop);
	    this.gameLayer.bind(gameTop);
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


    
    destroy:function(){
    }
});
