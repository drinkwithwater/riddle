var gameModel=gameModel||{};
gameModel.BaseFutureModel=gUtil.Class.extend({
    typeName:"baseAction",
    unitModel:"UnitModel",
    constructor:function(){
  	    gameModel.BaseFuture.__super__.constructor.call(this);
    },
    bind:function(unit){
        this.unitModel=unit;
        return this;
    },
    isFinished:function(){
        return true;
    }
});
gameModel.EmptyFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"emptyFuture",
});
gameModel.MoveFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"moveFuture",
    position:"Position",
    constructor:function(position){
        this.position=position;
    },
    isFinished:function(){
        var distance=xyPoint.maDistance(this.position,this.unitModel.position);
        if(distance<this.unitModel.getSpeed()){
            return true;
        }else{
            return false;
        }
    }
});
gameModel.StandFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"standFuture",
    ifFinished:function(){
        var distance=xyPoint.maDistance(this.position,this.unitModel.position);
        if(distance==0){
            return true;
        }else{
            return false;
        }
    }
});
gameModel.AttackFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"attackFuture",
});
