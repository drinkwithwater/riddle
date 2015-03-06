module.exports=function(env){
  ///{{{
  var gBattle=env.gBattle=env.gBattle||{}
  gBattle.BattleField=gUtil.Class.extend({
    gameMaze:null,
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


    /**
     *  @return {success:1}|{fail:fail_num}
     */
    checkMovePath:function(unit,path){
      if(typeof(unit)=="number") unit=unitDict[unit];

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
      // each cell through check
      var pathCheckResult=gUtil.allTrueIter(cellPath,function(cell){
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
    operMovePath:function(unit,path){
      if(typeof(unit)=="number") unit=unitDict[unit];
      ////////////////
      // move check //
      ////////////////
      var result=this.checkMovePath(unit,path);

      ////////////////
      //move trigger//
      ////////////////
      if(result.success){
        var skill=result.skill;
        var showContext=new gInter.ShowContext();
        //unit move
        for(var j=0,l=path.length;j<l;j++){
          var pos=path[j];
          this.unitMove(showContext,unit,skill,pos);
          //unit trigger
          for(var i=0,l=moveTrigger.length;i<l;i++){
            var trigger=moveTrigger[i];
            if(trigger.checkArea(pos)){
              this.unitTrigger(unit,trigger);
              //TODO check dead
            }
          }
        }
        this.interService.show(showContext);
        return {success:1}
      }else{
        //TODO
        return result;
      }
    },

    ////////////////////////////////////////
    // the function for simple action TODO//
    ////////////////////////////////////////
    /**
     * @param (gLogic.Unit) unit
     * @param (gLogic.Skill) skill
     * @param (point) pos
     */
    unitMove:function(showContext,unit,pos){
    },
    /**
     * @param (gLogic.Unit) unit
     * @param (gLogic.Skill) skill
     * @param (point) dstUnit
     */
    unitAttack:function(showContext,unit,skill,dstUnit){
    },
    /**
     * @param (gLogic.Unit) unit
     * @param (point) direct
     */
    unitTurn:function(showContext,unit,direct){
    },
    /**
     * @param (gLogic.Unit) unit
     * @param (gLogic.Trigger) trigger
     */
    unitTrigger:function(showContext,unit,trigger){
    },


    //TODO
    //include died, harmed
    unitTODO:function(){}
  }
  //gLogic.GamePoolBattle.prototype=new gLogic.GamePoolInit();
  //gLogic.LogicService.prototype=new gLogic.GamePoolBattle();
  //}}}
};
