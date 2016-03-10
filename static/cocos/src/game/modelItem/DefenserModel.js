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
gameModel.SlowGunModel=gameModel.defenserImpl({
    typeName:"slowGun",
    COOL_DOWN:10,
    coolingTime:0,
    constructor:function(battleModel,unitId,position){
  	    gameModel.DefenserModel.__super__.constructor.apply(this,arguments);
        this.coolingTime=0;
    },
    shotBullet:function(){
        this.coolingTime=this.COOL_DOWN;
        // TODO
        console.log("send bullet");
    },
    stepAI:function(){
        if(this.coolingTime<=0){
            this.shotBullet();
        }else{
            this.coolingTime-=1;
        }
    },
});
