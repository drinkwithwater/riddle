module.exports=function(env){
    ///{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.BattleField=gUtil.Class.extend({
	    battleManager:null,
	    eventSender:null,
	    playerDict:{},

	    maze:null,
	    //id to unit
	    unitDict:{},
	    

	    failDict:{1:"path is not array",
		          2:"path no content",
		          3:"path contain barrier",
		          4:"unit can't move",
		          5:"path cell illegal",//example i,j out of range
		          6:"unit not existed",
		          7:"destination valid"},

	    genPlayerId:function(){
	        //TODO
	    },
	    onPlayerJoin:function(battlePlayer,setId){
	        var newId=this.genPlayerId();
	        if(!newId){
		        //TODO
	        }
	        battlePlayer.playerId=newId;
	        this.playerDict[newId]=battlePlayer;
	        //TODO broadcast playerin message

	    },
	    onPlayerExit:function(battlePlayer){
	        //TODO broadcast playerexit message
	        delete this.playerDict[battlePlayer.playerId];
	        if(_.size(this.playerDict)==0){
		        this.battleManager.onBattleExit(this);
	        }

	    },
	    //TODO if destination has unit attack else move
	    onPlayerPathing:function(battlePlayer,unitId,path){
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

	    // a test function
	    onPosPathing:function(path){
	        //TODO this check depend on the illegal of message
	        //maybe i shall check the 2 things in BattleController?
	        if(!(path instanceof Array)){
		        return {fail:1};
	        }else if(path.length<=0){
		        return {fail:2};
	        }
	        var begin=path[0];
	        var cell=this.maze.getCell(begin.i,begin.j);
	        if(cell.hasUnit()){
		        var unit=cell.content;
		        var checkResult=this.checkPathing(unit,path);
		        if(checkResult.success){
		            var eventArray=this.operPathing(checkResult,unit,path);
		            this.eventSender.sendEvents(eventArray);
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
	     *  @return 
	     */
	    operPathing:function(checkResult,unit,path){
	        var eventArray=[];//as return result
	        var oper=checkResult.oper;
	        
	        //unit move
	        oper.call(unit,eventArray,path);
	        return eventArray;
	    },

	    ////////////////////////////////////////
	    // the function for simple action TODO//
	    ////////////////////////////////////////

	    unitMoveStep:function(context,unit,_pointArgs){
	        console.log("unit move to("+unit.i+" "+unit.j+")")
            var srcPos=gPoint.wrapPoint(unit);
            var dstPos=gPoint.wrapArgs(arguments,2);
            this.maze.moveUnit(srcPos,dstPos);
            unit.i=dstPos.i;
            unit.j=dstPos.j;
            context.push(new gBattle.PosMoveEvent({
                srcPos:srcPos,
                dstPos:dstPos
            }))
	    },
	    unitAttack:function(context,unit,skill,pos){
	    },
	    unitTrigger:function(context,activeUnit,triggerUnit,skill){
	    },
	    unitOnHarm:function(context,dosth){
	    },
	    

	    
	    
	    
	    


	    
	    //TODO
	    //for e.g. died, harmed
	    unitTODO:function(){},
	    
	    getMaze:function(){
	        return this.maze;
	    }
    });
};
