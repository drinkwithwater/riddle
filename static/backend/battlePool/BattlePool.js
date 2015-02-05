module.exports=function(env){
///{{{
var gBattle=env.gBattle=env.gBattle||{}
gBattle.BattleBase=gUtil.Class.extend({
  init:function(gameTop){
  },
  start:function(gameTop){
  }
});
gBattle.BattlePool=function(){
  this.gameMaze=null;
  this.interService=null;
  //id to unit
  this.unitDict={};
  // the trigger
  this.throughTrigger=[];
  this.attackTrigger=[];
  this.failDict={1:"path not continuous",
                2:"path over length",
                3:"path contain barrier",
                4:"unit can't move",
                5:"path illegal",
                6:"unit not existed",
                7:"destination valid"}


  /**
   *  @param (gLogic.Unit|number) unit
   *  @param ([gLogic.Point]) path
   *  @return {success:1}|{fail:fail_num}
   */
  this.checkMovePath=function(unit,path){
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
  }
  /**
   *  @param (gLogic.Unit) unit
   *  @param ([gLogic.Point]) path
   *  @return {}
   */
  this.operMovePath=function(unit,path){
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
        for(var i=0,l=throughTrigger.length;i<l;i++){
          var trigger=throughTrigger[i];
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
  }

  ////////////////////////////////////////
  // the function for simple action TODO//
  ////////////////////////////////////////
  /**
   * @param (gLogic.Unit) unit
   * @param (gLogic.Skill) skill
   * @param (point) pos
   */
  this.unitMove=function(showContext,unit,pos){
  }
  /**
   * @param (gLogic.Unit) unit
   * @param (gLogic.Skill) skill
   * @param (point) dstUnit
   */
  this.unitAttack=function(showContext,unit,skill,dstUnit){
  }
  /**
   * @param (gLogic.Unit) unit
   * @param (point) direct
   */
  this.unitTurn=function(showContext,unit,direct){
  }
  /**
   * @param (gLogic.Unit) unit
   * @param (gLogic.Trigger) trigger
   */
  this.unitTrigger=function(showContext,unit,trigger){
  }


  //TODO
  //include died, harmed
  this.unitTODO=function(){};
}
//gLogic.GamePoolBattle.prototype=new gLogic.GamePoolInit();
//gLogic.LogicService.prototype=new gLogic.GamePoolBattle();
//}}}
};