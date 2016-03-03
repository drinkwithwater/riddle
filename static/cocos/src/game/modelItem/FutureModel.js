var gameModel=gameModel||{};
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
    position:"Position",
    constructor:function(position){
        this.position=position;
    },
    isFinished:function(){
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

// pack finger's operation not used, not finished
gameModel.OperateFuture=gUtil.Class.extend({
    futureList:"list",
    currentIndex:"int",
    unitModel:"UnitModel",
    constructor:function(unitModel){
        this.futureList=[];
        this.currentIndex=0;
        this.unitModel=unitModel;
    },
    doStart:function(i,j){
        var standPos=this.battleModel.createPosition(i,j);
        var unitPos=this.unitModel.position;
        if(standPos.i==unitPos.i && standPos.j==unitPos.j){
            this.clear();
            this.futureList.push(standPos);
        }else{
            return false;
        }
    },
    doMove:function(i,j){
        var movePos=this.battleModel.createPosition(i,j);
        this.futureList.push(movePos);
        return true;
    },
    doAttack:function(){
        //TODO
    },
    doFinish:function(){
        //TODO
    },
    clear:function(){
        this.futureList=[];
        this.currentIndex=0;
    },
    getCurrentFuture:function(){
    },
});
