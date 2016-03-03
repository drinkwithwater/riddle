var gameModel=gameModel||{};
gameModel.UnitModel=gUtil.Class.extend({
    battleModel:"object",
    speed:100,
    position:"Position",
    unitId:"int",

    currentFuture:"futureObject",
    futureList:"list",
    nextFutureIndex:"int",

    constructor:function(battleModel,unitId,position){
  	    gameModel.UnitModel.__super__.constructor.call(this);
        this.futureList=new Array();
        this.currentFuture=new gameModel.EmptyFutureModel();
        
        this.battleModel=battleModel;
        this.unitId=unitId;
        this.position=position;
        this.nextFutureIndex=0;
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
        var position=this.battleModel.createPosition(i,j);
        this.futureList.push(new gameModel.MoveFutureModel(position).bind(this));
        return true;
    },
    doAttack:function(unitId){
        this.futureList.push(new gameModel.AttackFutureModel(unitId).bind(this));
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

    cleanFuture:function(){
        this.currentFuture=new gameModel.EmptyFutureModel();
        this.nextFutureIndex=0;
        this.futureList=[];
    },

    
    stepUpdate:function(){
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
    
    startHandlers:{
        "moveFuture":"startMove",
        "standFuture":"startStand",
    },
    startMove:function(moveFuture){
        this.battleModel.unitStartMove(this,moveFuture.position);
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
        if(futurePos.i!=thisPos.i && futurePos.j!=thisPos.j){
            // i and j not in the same line ...
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
gameModel.unitImpl=function(props,staticProps){
    if(props.typeName){
        /*
        var num=gScript.getNumericalDict(props.typeName);
        if(num){
            // extend hp, ap, range, group
            _.extend(props,num);
            // set max hp as hp
            props.maxHp=num.hp;
        }*/
        var aUnitClass=gBattle.UnitModel.extend(props,staticProps);
        gameModel.unitModelDict[props.typeName]=aUnitClass;
    }else{
        var aUnitClass=gBattle.BaseUnit.extend(props,staticProps);
        console.warn("unit class defined without typeName");
    }
    return aUnitClass;
}
gBattle.unitExtend=function(baseClass,props,staticProps){
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
