var debugField=null;
module.exports=function(env){
    ///{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.BATTLE_KILL=0;
    gBattle.BATTLE_TEST=1;
    gBattle.BattleField=gUtil.Class.extend({
        scriptName:null,
        battleType:gBattle.BATTLE_TEST,

	    battleManager:null,
	    eventSender:null,

	    playerDict:"dict",

	    maze:null,
	    //unitId to unit
	    unitDict:"dict",
        moveTriggerDict:"dict",
        transferDict:"dict",
        constructor:function(){
  	        gBattle.BattleField.__super__.constructor.call(this);
            debugField=this;
            this.playerDict={};
            this.unitDict={};
            this.moveTriggerDict={};
            this.transferDict={};
        },
	    

	    failDict:{1:"path not valid",
		          2:"path no content",
		          3:"path contain barrier",
		          4:"unit can't move",
		          5:"path cell illegal",//example i,j out of range
		          6:"unit not existed",
		          7:"destination valid",
		          8:"unit just stay"},

        playerIdCounter:1,
	    genPlayerId:function(){
            return this.playerIdCounter++;
	    },
	    onPlayerJoin:function(battlePlayer){
	        var newId=this.genPlayerId();
	        if(!newId){
		        //TODO
	        }
	        battlePlayer.playerId=newId;
            battlePlayer.battleField=this;
	        this.playerDict[newId]=battlePlayer;
	        //TODO broadcast playerin message

	    },
	    onPlayerExit:function(battlePlayer){
	        delete this.playerDict[battlePlayer.playerId];
            battlePlayer.battleField=null;
	        //TODO broadcast playerexit message

            //if no player, battle exit
	        if(_.size(this.playerDict)==0){
		        this.battleManager.onBattleExit(this);
	        }
	    },
	    //TODO if destination has unit attack else move
	    onPlayerUnitPathing:function(battlePlayer,unitId,path){
    	    //////////////////////////
	        //// unit vaild check ////
	        //////////////////////////
	        var unit=this.unitDict[unitId];
	        if(!unit){
		        //TODO
		        if(!unit){ return {fail:6} }
		        //unit not existed error
		        return;
	        }
	        if(unit.ownerId!=battlePlayer.playerId){
		        //TODO
		        //player cann't operator this unit
		        return;
	        }
	        //TODO
	        //try to move , sendmessage back
	        ////////////////
	        // move check //
	        ////////////////
	        var checkResult=this.checkPathing(unit,path);

	        ////////////////
	        //move trigger//
	        ////////////////
	        if(checkResult.success){
		        //TODO
		        //var context
                var eventArray=this.operPathing(checkResult,unit,path);
                var eventSender=this.eventSender;
                _.each(this.playerDict,function(v,k){
                    eventSender.sendEvents(v,eventArray);
                });
                return {success:1};
	        }else{
		        //message send fail result need???
                return checkResult;
	        }
	    },
        onPlayerPathing:function(battlePlayer,path){
            //TODO......
            //many things TODO
            this.onPosPathing(path);
        },

	    // a test function
	    onPosPathing:function(path){
	        //TODO this check depend on the illegal of message
	        //maybe i shall check the 2 things in BattleController?
	        if(!(path instanceof Array)){
		        return {fail:1};
	        }else if(path.length<=1){
		        return {fail:2};
	        }else{
                var numberArray=_.every(path,function(pos){
                    if(!_.isObject(pos)){
                        return false;
                    }
                    if(_.isNumber(pos.i)&&_.isNumber(pos.j)){
                        return true;
                    }else{
                        return false;
                    }
                });
                if(!numberArray){
                    return {fail:1};
                }
            }
	        var begin=path[0];
	        var cell=this.maze.getCell(begin.i,begin.j);
	        if(cell.hasUnit()){
		        var unit=cell.content;
                if(gScript.unitCategoryDict[unit.typeName]!="normal"){
                    return {fail:4};
                }
		        var checkResult=this.checkPathing(unit,path);
		        if(checkResult.success){
		            var eventArray=this.operPathing(checkResult,unit,path);
                    var eventSender=this.eventSender;
                    _.each(this.playerDict,function(player){
		                eventSender.sendEvents(player,eventArray);
                    });
		            return eventArray;
		        }else{
		            return checkResult;
		        }
	        }else{
		        return {fail:6};
	        }
	    },

	    /**
	     *  @return {success:1}|{fail:fail_num}
	     */
	    checkPathing:function(unit,path){
	        
	        // path vaild check
	        var cellPath=this.maze.pathingCell(path);
	        // path illegal check //check by maze
	        if(cellPath===null) return {fail:5};
	        
	        //unit can move path check
	        //check unit can move 
	        //check continouse?
	        var pathingOperFunc=unit.pathingOper(cellPath);
	        if(!pathingOperFunc) return {fail:4};
	        
	        //return call func
	        return {success:1,oper:pathingOperFunc};
	        
	    },
	    /**
	     */
	    operPathing:function(checkResult,unit,path){
	        var eventArray=[];//as return result, context
	        var oper=checkResult.oper;
	        
	        //unit move
	        oper.call(unit,eventArray,path);
	        return eventArray;
	    },

	    /////////////////////////////////////
	    // the functions for simple action //
	    /////////////////////////////////////

	    unitMoveStep:function(context,unit,_pointArgs){
	        console.log("unit move from("+unit.i+" "+unit.j+")");
            var srcPos=gPoint.wrapPoint(unit);
            var dstPos=gPoint.wrapArgs(arguments,2);
            this.maze.moveUnit(srcPos,dstPos);
            unit.i=dstPos.i;
            unit.j=dstPos.j;
            context.push(new gEvent.PosMoveEvent({
                unitId:unit.unitId,
                srcPos:srcPos,
                dstPos:dstPos
            }));
            _.each(this.moveTriggerDict,function(triggerUnit){
                if(unit.alive){
                    triggerUnit.moveTrigger(context,unit,srcPos);
                }
            });
            _.each(this.transferDict,function(triggerUnit){
                if(unit.alive){
                    triggerUnit.moveTrigger(context,unit,srcPos);
                }
            });
	    },
        unitRangeAttack:function(context,unit,targets,damages,focusIndex){
            if(targets[focusIndex].typeName=="wall"){
	            console.log("wall can't be attacked");
                return ;
            }
	        console.log("unit range attack");
            var unitPos=gPoint.wrapPoint(unit);
            var focusTarget=targets[focusIndex];
            var rangeEvent=new gEvent.UnitRangeAttackEvent({
                unitId:unit.unitId,
                unitPos:unitPos,
                targetPosArray:[]
            });
            for(var i=0,l=targets.length;i<l;i++){
                rangeEvent.targetPosArray.push(gPoint.wrapPoint(targets[i]));
            }
            context.push(rangeEvent);
            for(var i=0,l=targets.length;i<l;i++){
                if(i===focusIndex){
                    targets[i].onAttack(context,unit,damages[i]);
                }else{
                    targets[i].onDamage(context,unit,damages[i]);
                }
            }
        },
	    unitAttack:function(context,unit,target,damage){
            if(target.typeName=="wall"){
	            console.log("wall can't be attacked");
                return ;
            }
	        console.log("unit attack");
            var unitPos=gPoint.wrapPoint(unit);
            var targetPos=gPoint.wrapPoint(target);
            context.push(new gEvent.UnitAttackEvent({
                unitId:unit.unitId,
                unitPos:unitPos,
                targetPos:targetPos
            }));
            target.onAttack(context,unit,damage);
	    },
        unitHarm:function(context,unit,target,damage){
	        console.log("unit harm");
            var unitPos=gPoint.wrapPoint(unit);
            var targetPos=gPoint.wrapPoint(target);
            context.push(new gEvent.UnitHarmEvent({
                unitId:unit.unitId,
                unitPos:unitPos,
                targetPos:targetPos
            }));
            target.onDamage(context,unit,damage);
        },
        unitSetAttr:function(context,unit,attrKey,attrValue){
            var unitPos=gPoint.wrapPoint(unit);
            context.push(new gEvent.AttrSetEvent({
                unitId:unit.unitId,
                unitPos:unitPos,
                attrSet:{
                    key:attrKey,
                    value:attrValue
                }
            }));
        },
        unitDie:function(context,unit){
            var unitId=unit.unitId;
            if(this.unitDict[unitId]){
                delete this.unitDict[unitId];
                var unitPos=gPoint.wrapPoint(unit);
                this.maze.removeUnit(unitPos);
                context.push(new gEvent.UnitDieEvent({
                    unitId:unit.unitId,
                    unitPos:unitPos,
                }));
            }
            if(this.moveTriggerDict[unitId]){
                delete this.moveTriggerDict[unitId];
            }
            if(this.transferDict[unitId]){
                delete this.transferDict[unitId];
            }
            if(this.checkWin()){
                context.push(new gEvent.BattleWin({}));
            }
        },
        unitTurn:function(context,unit,direct){
            var tempDirect=null;
            if(_.isObject(direct)){
                tempDirect={
                    i:direct.i,
                    j:direct.j
                }
            }else{
                tempDirect=null;
            }
            context.push(new gEvent.UnitTurnEvent({
                unitId:unit.unitId,
                direct:tempDirect
            }))
        },

        

        checkWin:function(){
            if(this.battleType==gBattle.BATTLE_TEST)
                return false;
            else if(this.battleType==gBattle.BATTLE_KILL){
                for(var i in this.unitDict){
                    if(this.unitDict[i].isKey()){
                        return false;
                    }
                }
                return true;
            }
        },


        
        destroy:function(){
        },
	    
	    
	    getMaze:function(){
	        return this.maze;
	    },
    });
};
