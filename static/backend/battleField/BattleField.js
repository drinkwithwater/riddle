module.exports=function(env){
    ///{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.BattleField=gUtil.Class.extend({
	battleManager:null,
	gameMaze:null,
	
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
	onPlayerMove:function(battlePlayer,unitId,path){
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
	    if(checkResult.success){
		var operResult=this.operMovePath(unit,path,checkResult);
		//TODO
		//oper move 
	    }else{
		//TODO
		//message send fail result
	    }
	},

	/**
	 *  @return {success:1}|{fail:fail_num}
	 */
	checkMovePath:function(unit,path){
    	    //////////////////////////
	    //// unit vaild check ////
	    //////////////////////////
	    //check unit can move //unitMoveSkill is used in next step
	    var cellPath=this.gameMaze.getCellPath(path);
	    var canMove=unit.canMove(cellPath);
	    if(canMove) return {fail:4};
	    //check unit can be move by player
	    //TODO

	    //////////////////////////
	    //// path vaild check ////
	    //////////////////////////
	    
	    if(gUtil.continuous(path)){ return {fail:1} }
	    // path illegal check  //check by gameMaze
	    if(cellPath===null) return {fail:5};
	    // destination valid
	    if(cellPath[cellPath.length-1].content===null){ return {fail:7}; }

	    //////////////////////////////////
	    //// unit can move path check ////
	    //////////////////////////////////
	    // range check
	    if(!unitMoveSkill.checkRange(path.length)) return {fail:2};
	    // each cell through check/*
	    var pathCheckResult=gUtil.allTrueIter(cellPath,function(cell){
		return unitMoveSkill.checkCellThrough(cell);
	    });*/
	    var pathCheckResult=_.every(unitMoveSkill,function(cellPath){
		return unitMoveSkill.checkCellThrough(cell);
	    });
	    if(pathCheckResult){ return {fail:3} }

	    //////////////////
	    //return success//
	    //////////////////
	    return {success:1, skill:unitMoveSkill};
	},
	/**
	 *  @return {}
	 */
	operMovePath:function(unit,path,result){
	    var skill=result.skill;
	    var moveTrigger=this.moveTrigger;
	    var operArray=[];
	    
	    //unit move
	    for(var j=0,l=path.length;j<l;j++){
		var pos=path[j];
		operArray.push(this.unitMove(unit,skill,pos));
		//unit trigger
		for(var i=0,l=moveTrigger.length;i<l;i++){
		    var trigger=moveTrigger[i];

		    if(trigger.checkArea(pos)){
			operArray.push(this.unitTrigger(unit,trigger));
			//TODO check dead
		    }
		}
	    }
	    return operArray;
	},
	checkAttackPath:function(unit,path){
	    //////////////////////////
	    //// unit vaild check ////
	    //////////////////////////
	    //check unit is existed
	    if(!unit){ return {fail:6} }
	    //check unit can move //unitMoveSkill is used in next step
	    var unitMoveSkill=unit.getMoveSkill();
	    if(unitMoveSkill===null) return {fail:4};
	    //check unit can be move by player
	    //TODO

	    //////////////////////////
	    //// path vaild check ////
	    //////////////////////////
	    // path continuous check
	    if(gUtil.continuous(path)){ return {fail:1} }
	    // path illegal check  //check by gameMaze
	    var cellPath=this.gameMaze.getCellPath(path);
	    if(cellPath===null) return {fail:5};
	    // destination valid
	    if(cellPath[cellPath.length-1].content===null){ return {fail:7}; }

	    //////////////////////////////////
	    //// unit can move path check ////
	    //////////////////////////////////
	    // range check
	    if(!unitMoveSkill.checkRange(path.length)) return {fail:2};
	    // each cell through check/*
	    var pathCheckResult=gUtil.allTrueIter(cellPath,function(cell){
		return unitMoveSkill.checkCellThrough(cell);
	    });*/
	    var pathCheckResult=_.every(unitMoveSkill,function(cellPath){
		return unitMoveSkill.checkCellThrough(cell);
	    });
	    if(pathCheckResult){ return {fail:3} }

	    //////////////////
	    //return success//
	    //////////////////
	    return {success:1, skill:unitMoveSkill};
	},
	operAttackPath:function(unit,path){
	},

	////////////////////////////////////////
	// the function for simple action TODO//
	////////////////////////////////////////

	unitMoveStep:function(unit,pos){
	},
	unitAttack:function(unit,skill,dstUnit){
	},
	unitTrigger:function(unit,trigger){
	},
	

	
	
	
	


	
	//TODO
	//for e.g. died, harmed
	unitTODO:function(){}
    }
};
