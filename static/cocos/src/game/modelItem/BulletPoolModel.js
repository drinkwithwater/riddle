var gameModel=gameModel||{};
gameModel.BulletModel=gUtil.Class.extend({
});
gameModel.BulletPoolModel=gUtil.Class.extend({
    battleModel:"BattleModel",
    constructor:function(battleModel){
        this.battleModel=battleModel;
    },
    stepUpdate:function(){
    }
});
