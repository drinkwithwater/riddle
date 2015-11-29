var gMove=gMove||{};
var htmlView; // a global ver for debug
gMove.MoveGameViewManager=gUtil.Class.extend({
    frontendModule:null,
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
            this.frontendModule=gameTop.getModule("frontendModule");
        }

	    //for test
	    htmlView=this;
    },
    start:function(gameTop){
        var thisVar=this;
        var modelManager=this.modelManager;
	    this.mainScene=new gMove.MainScene();
	    this.gameLayer=new gMove.GameLayer(gameTop);
        this.frameItem=new cc.Node();
        this.gameLayer.addChild(this.frameItem);

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
    getAreaNode:function(){
        return this.gameLayer.getAreaNode();
    },
    
    animateUnitSet:function(dstPosIJ){
        var unitNode=this.gameLayer.getUnitNode();
        var dstPosXY=this.gameLayer.pFloat(dstPosIJ.i,dstPosIJ.j);
        unitNode.attr({
            x:dstPosXY.x,
            y:dstPosXY.y
        });
    },
    animateUnitMove:function(dstPosIJ,time){
        var unitNode=this.gameLayer.getUnitNode();
        var dstPosXY=this.gameLayer.pFloat(dstPosIJ.i,dstPosIJ.j);
        unitNode.runAction(cc.moveTo(time,dstPosXY));
    },
    animateTest:function(ijArray,bright){
        this.gameLayer.shining(ijArray,bright);
    },
    animateShowScore:function(score){
        this.gameLayer.setScore(score)
    },
    
    destroy:function(){
    }
});
