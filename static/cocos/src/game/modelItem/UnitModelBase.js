var gameModel=gameModel||{};
gameModel.UnitModel=gUtil.Class.extend({
    typeName:"unit",
    speed:100,
    battleModel:"object",
    position:"Position",
    unitId:"int",

    currentFuture:"futureObject",
    futureList:"list",
    nextFutureIndex:"int",

    constructor:function(battleModel,unitId,position){
  	    gameModel.UnitModel.__super__.constructor.apply(this,arguments);
        
        this.battleModel=battleModel;
        this.position=position;
        this.unitId=unitId;
        
        this.futureList=new Array();
        this.currentFuture=new gameModel.EmptyFutureModel();
        this.nextFutureIndex=0;
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

    cleanFuture:function(){
        this.currentFuture=new gameModel.EmptyFutureModel();
        this.nextFutureIndex=0;
        this.futureList=[];
    },

    stepAI:function(){
    },
    
    stepUpdate:function(){
        this.stepAI();
        var stepFuture=false;
        var stepStart=false;
        while(true){
            if(_.isObject(this.currentFuture)){
                if(!this.currentFuture.isFinished()){
                    stepFuture=this.currentFuture;
                    break;
                }
            }
            if(this.nextFutureIndex<this.futureList.length){
                this.currentFuture=this.futureList[this.nextFutureIndex];
                this.nextFutureIndex+=1;
                stepStart=true;
            }else{
                this.currentFuture=new gameModel.EmptyFutureModel();
                break;
            }
        }
        if(stepFuture){
            if(stepStart){
                var funcName=this.startHandlers[stepFuture.typeName];
                if(funcName) this[funcName].call(this,stepFuture);
            }else{
                var funcName=this.futureHandlers[stepFuture.typeName];
                if(funcName) this[funcName].call(this,stepFuture);
                else console.error("future unhandle");
                if(stepFuture.isFinished()){
                    var startFuture=false;
                    while(true){
                        if(this.nextFutureIndex<this.futureList.length){
                            this.currentFuture=this.futureList[this.nextFutureIndex];
                            this.nextFutureIndex+=1;
                        }else{
                            this.currentFuture=new gameModel.EmptyFutureModel();
                            break;
                        }
                        if(this.currentFuture.isFinished()){
                            continue;
                        }else{
                            startFuture=this.currentFuture;
                            break;
                        }
                    }
                    if(startFuture){
                        var funcName=this.startHandlers[startFuture.typeName];
                        if(funcName) this[funcName].call(this,startFuture);
                    }
                }
            }
        }else{
            // for empty future
        }
    },
    
    canMove:function(moveFuture){
        var futurePos=moveFuture.position;
        var thisPos=this.position;
        if(futurePos.i!=thisPos.i && futurePos.j!=thisPos.j){
            return false;
        }else{
            var checkUnit=this.battleModel.unit$(futurePos.i,futurePos.j);
            if(_.isObject(checkUnit)){
                return false;
            }else{
                return true;
            }
        }
    },
    
    startHandlers:{
        "moveFuture":"startMove",
        "standFuture":"startStand",
    },
    startMove:function(moveFuture){
        if(!this.canMove(moveFuture)){
            moveFuture.stop();
            this.cleanFuture();
        }else{
            this.battleModel.unitStartMove(this,moveFuture.position);
        }
    },
    startStand:function(standFuture){
        this.battleModel.unitStartMove(this,standFuture.position);
    },
    futureHandlers:{
        "moveFuture":"stepMove",
        "attackFuture":"stepAttack",
        "standFuture":"stepStand",
        "emptyFuture":"stepEmpty",
    },
    stepMove:function(moveFuture){
        var thisPos=this.position;
        var futurePos=moveFuture.position;
        if(!this.canMove(moveFuture)){
            this.cleanFuture();
            return ;
        }else{
            // i or j in the same line
            var dx=futurePos.x-thisPos.x;
            var dy=futurePos.y-thisPos.y;
            if(dx==0&&dy!=0){
                var update=thisPos.yMoveTo(futurePos.y,this.speed);
                if(update){
                    this.battleModel.unitUpdatePos(this);
                }
            }else if(dy==0&&dx!=0){
                var update=thisPos.xMoveTo(futurePos.x,this.speed);
                if(update){
                    this.battleModel.unitUpdatePos(this);
                }
            }else if(dx!=0&&dy!=0){
                // xy not in the same line
                thisPos.stand();
            }else{
                console.log("unit position error when move step");
            }
        }
    },
    stepAttack:function(attackFuture){
    },
    stepStand:function(){
        var thisPos=this.position;
        var standPos=this.battleModel.createPosition(thisPos.i,thisPos.j);
        var dist=xyPoint.maDistance(standPos,thisPos);
        if(dist<this.speed){
            thisPos.stand();
        }else{
            this.stepMove(new gameModel.MoveFutureModel(standPos).bind(this));
        }
    },
    stepEmpty:function(emptyFuture){
    },

    getSpeed:function(){
        return this.speed;
    },
    getPosition:function(){
        return this.position;
    }
});
gameModel.unitModelDict={}
gameModel.unitExtend=function(baseClass,props,staticProps){
    if(props.typeName){
        /*
        var num=gScript.getNumericalDict(props.typeName);
        if(num){
            // extend hp, ap, range, group
            _.extend(props,num);
            // set max hp as hp
            props.maxHp=num.hp;
        }*/
        var aUnitClass=baseClass.extend(props,staticProps);
        gameModel.unitModelDict[props.typeName]=aUnitClass;
    }else{
        var aUnitClass=baseClass.extend(props,staticProps);
        console.warn("unit class defined without typeName");
    }
    return aUnitClass;
}

gameModel.unitImpl=function(props,staticProps){
    return gameModel.unitExtend(gameModel.UnitModel,props,staticProps);
}
gameModel.attackerImpl=function(props,staticProps){
    return gameModel.unitExtend(gameModel.AttackerModel,props,staticProps);
}
gameModel.defenserImpl=function(props,staticProps){
    return gameModel.unitExtend(gameModel.DefenserModel,props,staticProps);
}