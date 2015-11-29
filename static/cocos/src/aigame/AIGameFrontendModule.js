var gAI=gAI||{};
gAI.AIGameFrontendModule=gUtil.Class.extend({
    
    modelManager:null,
    viewManager:null,

    gameTop:null,
    
    FRAME_TIME:0.05,

    name:"frontendModule",
    init:function(gameTop){
        if(gameTop){
	        this.modelManager=gameTop.getModule("modelModule");
	        this.viewManager=gameTop.getModule("viewModule");
            this.gameTop=gameTop;
        }
    },
    start:function(gameTop){
    },
    run:function(){
        this.modelManager.run();
        this.runTime();
    },

    runTime:function(){
        var frameItem=this.viewManager.frameItem;
        var self=this;
        frameItem.runAction(cc.sequence(
            cc.delayTime(this.FRAME_TIME),
            cc.callFunc(function(){
                self.runTime();
                self.modelManager.runTime(self.FRAME_TIME);
                self.viewManager.animateShowScore(self.modelManager.hitCount);
            })
        ));
    },

    closurePathing:function(path){
        this.modelManager.closurePathing(path);
    },
    rectWrap:function(min,max){
        this.modelManager.rectWrap(min,max);
    },
});
