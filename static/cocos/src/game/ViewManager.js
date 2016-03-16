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


    //////////
    // show //
    //////////
    /* bullet */
    showBulletCreate:function(bullet){
        this.gameLayer.bulletNode.shotBulletView(bullet);
    },
    showBulletExplode:function(bulletId){
        this.gameLayer.bulletNode.explodeBullet(bulletId);
    },
    showBulletDelete:function(bulletId){
        this.gameLayer.bulletNode.deleteBullet(bulletId);
        // TODO
    },

    /* unit */
    showUnitCreate:function(unitModel){
        this.gameLayer.unitNode.createUnitView(unitModel);
    },
    showUnitAttrUpdate:function(unitId,attrKey,attrValue){
        var unitView=this.gameLayer.unitNode.unit$(unitId);
        if(_.isObject(unitView)){
            unitView.setAttr(attrKey,attrValue);
        }else{
            console.warn("unit view not found for id="+unitId);
        }
    },
    showUnitAttack:function(srcUnitId,dstUnitIdSet){
        this.gameLayer.animateNode.actionUnitAttack(srcUnitId,dstUnitIdSet);
    },
    showUnitMove:function(unitId,dstIJ,duration){
        this.gameLayer.unitNode.actionUnitIdMove(unitId,dstIJ,duration);
    },
    showUnitDelete:function(unitId){
        this.gameLayer.unitNode.deleteUnitView(unitId);
    },

    
    // getter
    getGameLayer:function(){
        return this.gameLayer;
    },
    getUnitViewPool:function(){
        return this.gameLayer.unitNode;
    },
    getBulletViewPool:function(){
        return this.gameLayer.bulletNode;
    },
    getAnimateNode:function(){
        return this.gameLayer.animateNode;
    },



    
    destroy:function(){
    }
});
