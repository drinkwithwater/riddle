var gMove=gMove||{};
gMove.MoveGameFrontendModule=gUtil.Class.extend({
    
    modelManager:null,
    viewManager:null,

    gameTop:null,
    

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
    startOper:function(i,j){
        this.modelManager.startOper(i,j);
    },
    moveOper:function(i,j){
        this.modelManager.moveOper(i,j);
    }
    
});
