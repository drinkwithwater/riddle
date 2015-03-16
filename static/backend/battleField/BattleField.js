module.exports=function(env){
    ///{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.BattleField=gUtil.Class.extend({
	battleManager:null,
	maze:null,
	
	playerDict:{},
	
	interService:null,
	//id to unit
	unitDict:{},
	// the trigger
	moveTrigger:[],
	attackTrigger:[],
	failDict:{1:"path not continuous",
		  2:"path over length",
		  3:"path contain barrier",
		  4:"unit can't move",
		  5:"path illegal",
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
	    var checkResult=this.checkMovePath(unit,path);

	    ////////////////
	    //move trigger//
	    ////////////////
	    if(!checkResult.success){
		//TODO
		//message send fail result
		return;
	    }else{
		//var context=null;
		var operResult=this.operMovePath(unit,path);
		//TODO
		//oper move 
	    }
	},

	/**
	 *  @return {success:1}|{fail:fail_num}
	 */
	checkMovePath:function(unit,path){
	    
	    // path vaild check
	    var cellPath=this.maze.getCellPath(path);
	    // path illegal check //check by maze
	    if(cellPath===null) return {fail:5};
	    // destination valid
	    if(cellPath[cellPath.length-1].content===null){ return {fail:7}; }
	    
	    //unit can move path check
	    //check unit can move 
	    //check continouse
	    var canMove=unit.canMove(cellPath);
	    if(canMove) return {fail:4};
	    
	    //return success
	    return {success:1};
	},
	/**
	 *  @return move result
	 */
	operMovePath:function(unit,path){
	    var operArray=[];//as return result
	    
	    //unit move
	    unit.move(operArray,path);
	    return operArray;
	},
	checkAttackPath:function(unit,path){
	    
	    // path vaild check
	    var cellPath=this.maze.getCellPath(path);
	    // path illegal check,//check by maze
	    if(cellPath===null) return {fail:5};
	    // destination valid
	    if(cellPath[cellPath.length-1].content===null){ return {fail:7}; }
	    
	    //unit can move path check
	    //check unit can move 
	    //check continouse
	    var canMove=unit.canMove(cellPath);
	    if(canMove) return {fail:4};

	    //return success
	    return {success:1};
	},
	operAttackPath:function(unit,path){
	},

	////////////////////////////////////////
	// the function for simple action TODO//
	////////////////////////////////////////

	unitMoveStep:function(context,unit,pos){
	},
	unitAttack:function(context,unit,skill,pos){
	},
	unitTrigger:function(context,activeUnit,triggerUnit,skill){
	},
	unitOnHarm:function(context,dosth){
	},
	

	
	
	
	


	
	//TODO
	//for e.g. died, harmed
	unitTODO:function(){}
    }
};