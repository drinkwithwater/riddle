var gameModel=gameModel||{};
gameModel.UnitModel=gUtil.Class.extend({
    futureList:"list",
    battleModel:"object",
    currentFuture:"futureObject",
    speed:21,
    position:"Position",
    unitId:"int",
    constructor:function(battleModel,unitId,position){
  	    gameModel.UnitModel.__super__.constructor.call(this);
        this.futureList=new Array();
        this.currentFuture=new gameModel.EmptyFutureModel();
        
        this.battleModel=battleModel;
        this.unitId=unitId;
        this.position=position;
    },
    
    canOper:function(){
        return true;
    },
    doMove:function(i,j){
        var position=this.battleModel.createPosition(i,j);
        this.futureList.push(new gameModel.MoveFutureModel(position).bind(this));
    },
    doAttack:function(unitId){
        this.futureList.push(new gameModel.AttackFutureModel(unitId).bind(this));
    },
    doStand:function(i,j){
        var standPos=this.battleModel.createPosition(i,j);
        var thisPos=this.position;
        if(standPos.i==thisPos.i && standPos.j==thisPos.j){
            this.cleanFuture();
            this.futureList.push(new gameModel.StandFutureModel().bind(this));
        }else{
            return false;
        }
    },

    cleanFuture:function(){
        this.currentFuture=new gameModel.EmptyFutureModel();
        this.futureList=[];
    },

    
    stepUpdate:function(){
        var future=false;
        if(!this.currentFuture.isFinished()){
            future=this.currentFuture;
        }else{
            if(this.futureList.length>0){
                this.currentFuture=this.futureList[0];
                this.futureList=this.futureList.slice(1);
                future=this.currentFuture;
            }else{
            }
        }
        if(future){
            var funcName=this.futureHandlers[future.typeName];
            this[funcName].call(this,future);
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
                    this.battleModel.updateUnitPos(this);
                }
            }else if(dy==0&&dx!=0){
                var update=thisPos.xMoveTo(futurePos.x,this.speed);
                if(update){
                    this.battleModel.updateUnitPos(this);
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
