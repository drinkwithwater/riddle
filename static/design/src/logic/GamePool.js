var gLogic=gLogic||{}
gLogic.GamePoolBattle=function(){
  this.gameMaze=null;
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
    return {success:1}
  }
  /**
   *  @param (gLogic.Unit) unit
   *  @param ([gLogic.Point]) path
   *  @return {}
   */
  this.actionMovePath=function(unit,path){
    if(typeof(unit)=="number") unit=unitDict[unit];
    ////////////////
    // move check //
    ////////////////
    result=this.checkMovePath(unit,path);

    if(result.success){
      /////////////////
      // move action //
      /////////////////
      //TODO
      //TODO
      //TODO
      //TODO

      //trigger check
      for(var i=0,l=throughTrigger.length;i<l;i++){
        trigger=throughTrigger[i];
        if(trigger.checkArea(path)){
          trigger.effect(unit);
        }
      }
      //check dead?
      //TODO
      if(unit.hp<=0){
      }
      return {success:1}
    }else{
      return result;
    }
  }

  ////////////////////////////////////
  // the function for simple action //
  ////////////////////////////////////
  /**
   * @param (gLogic.Unit) unit
   * @param (gLogic.Skill) skill
   * @param (point) pos
   */
  this.unitMove=function(unit,skill,pos){
  }
  /**
   * @param (gLogic.Unit) unit
   * @param (gLogic.Skill) skill
   * @param (point) dstUnit
   */
  this.unitAttack=function(unit,skill,dstUnit){
  }
  /**
   * @param (gLogic.Unit) unit
   * @param (point) direct
   */
  this.unitTurn=function(unit,direct){
  }
  /**
   * @param (gLogic.Unit) unit
   * @param (gLogic.Trigger) trigger
   */
  this.unitTrigger=function(unit,trigger){
  }
  
  
  //TODO
  //include died, harmed 
  this.unitTODO=function(){};
}
gLogic.GamePool=function(){

  addChess=function(){
  }
  delChess=function(){
  }

  this.initFrom=function(script){
  }

  this.startGame=function(){
  }
  this.endGame=function(){
  }
}
gLogic.IGamePool=function(){
  this.init(context)=function(){}
  this.start(context)=function(){}

  this.userEnter=function(script){}
  this.userWalk=function(path){}
  this.userExit=function(){}

}
