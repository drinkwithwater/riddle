var game=game||{};
game.ModelManager=gUtil.Class.extend({

    name:"modelModule",
    controlModule:null,
    viewManager:null,

    iLength:10,
    jLength:10,

    runFlag:false,

    battleModel:"battleModel",
    
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.controlModule=gameTop.getModule("controlModule");
            this.viewManager=gameTop.getModule("viewModule");
        }

    },

    start:function(gameTop){
        this.battleModel=new gameModel.BattleModel(gameTop);
    },
    timeUpdate:function(dt){
        if(this.runFlag){
            this.battleModel.timeUpdate(dt);
        }
    },
    runGame:function(){
        this.runFlag=true;
    },
    destroy:function(){
    },
    unit$:function(){
        return this.battleModel.unit$.apply(this.battleModel,arguments);
    }
});
