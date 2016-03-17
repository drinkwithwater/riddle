var gameModel=gameModel||{};
gameModel.UnitBattleAttr=gUtil.Class.extend({
    hp:"int",
    ap:"int",
    range:"int",
    constructor:function(dict){
  	    gameModel.UnitBattleAttr.__super__.constructor.apply(this,arguments);
        this.hp=100;
        this.ap=1;
        this.range=1;
        _.extend(this,dict);
    },
    onHarm:function(harm){
        this.hp-=harm
    },
    isDead:function(){
        return this.hp<=0;
    }
});
gameModel.UnitModel=gUtil.Class.extend({
    typeName:"unit",
    speed:100,
    battleModel:"object",
    position:"Position",
    battleAttr:"UnitBattleAttr",
    unitId:"int",

    currentFuture:"futureObject",
    futureList:"list",
    nextFutureIndex:"int",

    constructor:function(battleModel,unitId,position){
  	    gameModel.UnitModel.__super__.constructor.apply(this,arguments);
        
        this.battleModel=battleModel;
        this.position=position;
        this.unitId=unitId;
        
        this.battleAttr=new gameModel.UnitBattleAttr();
        this.cleanFuture();
    },
    
    canOper:function(){
        return false;
    },
    
    doBegin:function(i,j){
        return false;
    },
    doMove:function(i,j){
        return false;
    },
    doEnd:function(i,j){
        return false;
    },
    doAttack:function(unitId){
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
        var di=Math.abs(futurePos.i-thisPos.i);
        var dj=Math.abs(futurePos.j-thisPos.j);
        var continuous=(di==1&&dj==0)||(di==0&&dj==1)||(di==0&&dj==0);
        if(!continuous){
            return false;
        }else{
            var checkUnit=this.battleModel.unit$(futurePos.i,futurePos.j);
            if(_.isObject(checkUnit)){
                if(checkUnit.unitId!=this.unitId){
                    return false;
                }
            }
        }
        return true;
    },
    
    startHandlers:{
        "moveFuture":"startMove",
        "standFuture":"startStand",
        "attackFuture":"startAttack",
    },
    startMove:function(moveFuture){
        if(!this.canMove(moveFuture)){
            moveFuture.stop();
            this.cleanFuture();
        }else{
            this.battleModel.unitShowMove(this,moveFuture.position);
        }
    },
    startStand:function(standFuture){
        this.battleModel.unitShowMove(this,standFuture.position);
    },
    startAttack:function(attackFuture){
        var dstUnit=this.battleModel.unit$(attackFuture.dstId);
        if(_.isObject(dstUnit)){
            this.battleModel.unitShowAttack(this,[dstUnit]);
        }
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
            var update=false;
            if(dx==0&&dy!=0){
                update=thisPos.yMoveTo(futurePos.y,this.speed);
            }else if(dy==0&&dx!=0){
                update=thisPos.xMoveTo(futurePos.x,this.speed);
            }else if(dx!=0&&dy!=0){
                // xy not in the same line
                thisPos.stand();
            }else{
                console.log("unit position exception when move step");
            }
            if(update){
                this.battleModel.unitUpdatePos(this);
            }
            if(moveFuture.isFinished()){
                var nextFuture=this.futureList[this.nextFutureIndex];
                if(_.isObject(nextFuture)){
                    if(nextFuture.typeName=="moveFuture"){
                        var nextPos=nextFuture.position;
                        if(thisPos.x!=nextPos.x && thisPos.y!=nextPos.y){
                            thisPos.stand();
                        }
                    }
                }
            }
        }
    },
    stepAttack:function(attackFuture){
        var dstUnit=this.battleModel.unit$(attackFuture.dstId);
        if(_.isObject(dstUnit)){
            var delay=attackFuture.stepCount();
            if(delay<=0){
                var harm=this.createAttack();
                dstUnit.onAttack(harm);
            }else{
                return ;
            }
        }else{
            return ;
        }
    },
    stepStand:function(standFuture){
        var thisPos=this.position;
        var standPos=standFuture.position;
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
    },

    createAttack:function(){
        return this.battleAttr.ap;
    },
    onAttack:function(ap){
        var battleAttr=this.battleAttr;
        battleAttr.onHarm(ap);
        this.battleModel.unitShowSetAttr(this,"hp",battleAttr.hp);
        if(battleAttr.isDead()){
            this.battleModel.unitDead(this);
        }
    },
    getAttr:function(key){
        if(key){
            return this.battleAttr[key];
        }else{
            return this.battleAttr;
        }
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
