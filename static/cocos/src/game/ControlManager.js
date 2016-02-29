var game=game||{};
game.ControlManager=gUtil.Class.extend({
    
    modelManager:null,
    viewManager:null,

    gameTop:null,
    

    name:"controlModule",
    init:function(gameTop){
        if(gameTop){
	        this.modelManager=gameTop.getModule("modelModule");
	        this.viewManager=gameTop.getModule("viewModule");
            this.gameTop=gameTop;
        }
    },
    start:function(gameTop){
    }
    
});
