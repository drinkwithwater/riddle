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
    getLastPosition:function(){
        for(var i=this.futureList.length-1;i>=this.nextFutureIndex;i--){
            var future=this.futureList[i];
            if(future.typeName=="moveFuture"){
                return future.position;
            }
        }
        if(_.isObject(this.currentFuture)){
            if(this.currentFuture.typeName=="moveFuture"){
                return this.currentFuture.position;
            }
        }
        return this.position;
    },
    doMove:function(i,j){
        var lastPos=this.getLastPosition();
        var dist=gPoint.maDistance(lastPos,{
            i:i,
            j:j
        });
        if(dist>1){
            return false;
        }else if(dist==0){
            return true;
        }
        var dstUnit=this.battleModel.unit$(i,j);
        var dstPos=this.battleModel.createPosition(i,j);
        if(_.isObject(dstUnit)){
            if(dstUnit.unitId!=this.unitId){
                var attackFuture=new gameModel.AttackFutureModel(dstPos,dstUnit.unitId).bind(this);
                this.futureList.push(attackFuture);
                return true;
            }
        }
        this.futureList.push(new gameModel.MoveFutureModel(dstPos).bind(this));
        return true;
    },
    doBegin:function(i,j){
        var standPos=this.battleModel.createPosition(i,j);
        var thisPos=this.position;
        if(standPos.i==thisPos.i && standPos.j==thisPos.j){
            this.cleanFuture();
            this.futureList.push(new gameModel.StandFutureModel(standPos).bind(this));
        }else{
            return false;
        }
    },
    doEnd:function(i,j){
        return false;
    }

});
gameModel.HitterModel=gameModel.attackerImpl({
    typeName:"hitter",
});
// not a good type...
gameModel.FlierModel=gameModel.attackerImpl({
    typeName:"flier",
    speed:209,
    doBegin:function(i,j){
        return true;
    },
    doMove:function(i,j){
        return true;
    },
    doEnd:function(i,j){
        var dstPos=this.battleModel.createPosition(i,j);
        this.futureList.push(new gameModel.MoveFutureModel(dstPos).bind(this));
        return true;
    },

    canMove:function(moveFuture){
        var dstPos=moveFuture.position;
        var unit=this.battleModel.unit$(dstPos.i,dstPos.j);
        if(_.isObject(unit)){
            return false;
        }else{
            return true;
        }
    },
    startMove:function(moveFuture){
        if(this.canMove(moveFuture)){
            this.battleModel.unitShowMove(this,moveFuture.position);
        }else{
            moveFuture.stop();
            this.cleanFuture();
        }
    },
    stepMove:function(moveFuture){
        var dstPos=moveFuture.position;
        if(this.canMove(moveFuture)){
            this.position=moveFuture.position;
            this.battleModel.unitUpdatePos(this);
        }else{
            this.cleanFuture();
        }
    }
});
