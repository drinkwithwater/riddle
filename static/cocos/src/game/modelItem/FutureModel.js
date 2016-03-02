var gameModel=gameModel||{};
// pack finger's operation
gameModel.OperateFuture=gUtil.Class.extend({
    futureList:"list",
    currentIndex:"int",
    constructor:function(){
        this.futureList=[];
        this.currentIndex=0;
    },
    doStand:function(i,j){
        this.clear();
        var standPos=this.battleModel.createPosition(i,j);
        var thisPos=this.position;
        if(standPos.i==thisPos.i && standPos.j==thisPos.j){
            this.cleanFuture();
            this.futureList.push(new gameModel.StandFutureModel().bind(this));
        }else{
            return false;
        }
    },
    doMove:function(i,j){
        this.futureList.push(new gameModel.MoveFutureModel(position).bind(this));
    },
    doAttack:function(){
    },
    doFinish:function(){
    },
    clear:function(){
        this.futureList=[];
        this.currentIndex=0;
    },
    getCurrentFuture:function(){
    },
});
gameModel.BaseFutureModel=gUtil.Class.extend({
    typeName:"baseAction",
    unitModel:"UnitModel",
    constructor:function(){
  	    gameModel.BaseFutureModel.__super__.constructor.call(this);
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
        var distance=this.maDistance(this,this.unitModel);
        if(distance<this.unitModel.getSpeed()){
            return true;
        }else{
            return false;
        }
    }
});
gameModel.StandFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"standFuture",
    position:"Position",
    constructor:function(position){
        this.position=position;
    },
});
gameModel.AttackFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"attackFuture",
});
