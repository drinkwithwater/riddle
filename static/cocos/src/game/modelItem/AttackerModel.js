var gameModel=gameModel||{};
gameModel.AttackerModel=gameModel.unitImpl({
    typeName:"attacker",
    speed:100,

    constructor:function(battleModel,unitId,position){
  	    gameModel.AttackerModel.__super__.constructor.apply(this,arguments);
    },
    
    canOper:function(){
        return true;
    },
    doMove:function(i,j){
        if(this.futureList.length>0){
            var last=_.last(this.futureList);
            if(last.position.i!=i && last.position.j!=j){
                return false;
            }
        }
        var dstUnit=this.battleModel.unit$(i,j);
        if(_.isObject(dstUnit)){
            this.doAttack(i,j);
            return false;
        }else{
            var position=this.battleModel.createPosition(i,j);
            this.futureList.push(new gameModel.MoveFutureModel(position).bind(this));
            return true;
        }
    },
    doAttack:function(i,j){
        var dstUnit=this.battleModel.unit$(i,j);
        if(_.isObject(dstUnit)){
            var attackFuture=new gameModel.AttackFutureModel(dstUnit.unitId).bind(this);
            this.futureList.push(attackFuture);
            return true;
        }else{
            return false;
        }
    },
    doStand:function(i,j){
        var standPos=this.battleModel.createPosition(i,j);
        var thisPos=this.position;
        if(standPos.i==thisPos.i && standPos.j==thisPos.j){
            this.cleanFuture();
            this.futureList.push(new gameModel.StandFutureModel(standPos).bind(this));
        }else{
            return false;
        }
    },

});
