var game=game||{};
game.ViewManager=gUtil.Class.extend({
    controlModule:null,
    modelManager:null,

    moveSpeed:10,//1 cell 1 second
    bulletSpeed:20,
    
    gameLayer:null,
    frameItem:null,
    mainScene:null,

    name:"viewModule",

    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
		    this.modelManager=gameTop.getModule("modelModule");
            this.controlModule=gameTop.getModule("controlModule");
        }

    },
    start:function(gameTop){
        var thisVar=this;
        var modelManager=this.modelManager;
	    this.mainScene=new gameView.MainScene();
	    this.gameLayer=new gameView.GameLayer(gameTop);
        this.frameItem=new cc.Node();
        this.gameLayer.addChild(this.frameItem);
        this.frameItem.schedule(function(dt){
            thisVar.modelManager.timeUpdate(dt);
        });

        this.mainScene.bind(gameTop);
    },
    reRender:function(){
        var thisVar=this;
        var modelManager=this.modelManager;
        
        this.gameLayer.render();
        console.log("view reRender");
    },
    getGameLayer:function(){
        return this.gameLayer;
    },
    destroy:function(){
    }
});
