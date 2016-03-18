var gameModel=gameModel||{};
gameModel.RunnerModel=gameModel.unitImpl({
    typeName:"runner",
    speed:100,

    constructor:function(battleModel,unitId,position){
  	    gameModel.RunnerModel.__super__.constructor.apply(this,arguments);
    },
    
    canOper:function(){
        return false;
    },

    stepAI:function(){
    },

    
});