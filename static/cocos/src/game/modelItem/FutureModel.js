var gameModel=gameModel||{};
gameModel.BaseFutureModel=gUtil.Class.extend({
    typeName:"baseAction",
    unitModel:"UnitModel",
    stopFlag:"bool",
    constructor:function(){
  	    gameModel.BaseFutureModel.__super__.constructor.call(this);
        this.stopFlag=false;
    },
    bind:function(unit){
        this.unitModel=unit;
        return this;
    },
    isFinished:function(){
        return true;
    },
    stop:function(){
        this.stopFlag=true;
    }
});
gameModel.EmptyFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"emptyFuture",
});
gameModel.MoveFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"moveFuture",
    position:"Position",
    constructor:function(position){
  	    gameModel.MoveFutureModel.__super__.constructor.call(this);
        this.position=position;
    },
    isFinished:function(){
        if(this.stopFlag){
            return true;
        }else{
            var distance=xyPoint.maDistance(this.position,this.unitModel.position);
            if(distance<this.unitModel.getSpeed()){
                return true;
            }else{
                return false;
            }
        }
    }
});
gameModel.StandFutureModel=gameModel.BaseFutureModel.extend({
    typeName:"standFuture",
    position:"Position",
    constructor:function(position){
  	    gameModel.StandFutureModel.__super__.constructor.call(this);
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
    dstId:"int",
    delay:"int",
    constructor:function(dstId,delay){
        this.dstId=dstId;
        this.delay=delay||1;
    },
    stepCount:function(){
        this.delay-=1;
        return this.delay;
    },
    isFinished:function(){
        if(delay<=0){
            return true;
        }else{
            return false;
        }
    }
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
