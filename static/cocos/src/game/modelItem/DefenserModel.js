var gameModel=gameModel||{};
gameModel.DefenserModel=gameModel.unitImpl({
    typeName:"defenser",
    speed:100,

    constructor:function(battleModel,unitId,position){
  	    gameModel.DefenserModel.__super__.constructor.apply(this,arguments);
    },
    
    canOper:function(){
        return false;
    },
    doMove:function(i,j){
        return false;
    },
    doAttack:function(unitId){
        return false;
    },
    doStand:function(i,j){
        return false;
    },

    stepAI:function(){
    },

    
});