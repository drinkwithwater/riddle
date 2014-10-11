var gLogic=gLogic||{}
gLogic.GamePoolBattle=function(){
  this.gameMaze=null;
  this.unitDict={};
  // the move trigger skill
  this.moveListener=[];
  this.attackListener=[];
  this.failDict={1:"path not continuous",
                2:"path over length",
                3:"path contain barrier",
                4:"unit can't move"}

  /**
   *  @param (gLogic.Unit) unit
   *  @param ([gLogic.Point]) path
   *  @return {}
   */
  this.checkMove=function(unit,path){
    if(typeof(unit)=="number") unit=unitDict[unit];
    if(unit){
      //continuous check
      if(gUtil.continuous(path)){
        return {fail:1}
      }else{
        var unitMoveSkill=unit.getMoveSkill();
        //can move check
        if(unitMoveSkill===null) return {fail:4};
        //range check
        if(!unitMoveSkill.checkRange(path.length)) return {fail:2};

        // path check
        var cellPath=this.gameMaze.getCellPath(path);
        pathCheckResult=gUtil.allTrueIter(cellPath,function(cell){
          return unitMoveSkill.checkThrough(cell);
        });
        if(pathCheckResult){
          return {fail:3}
        }
        return {success:1}
      }
    }else{
      console.log("GamePool.move error");
      return {error:-1}
    }
  }
  /**
   *  @param (gLogic.Unit) unit
   *  @param ([gLogic.Point]) path
   *  @return {}
   */
  this.move=function(unit,path){
    if(typeof(unit)=="number") unit=unitDict[unit];
    result=this.checkMove(unit,path);
    if(result.success){
      //move trigger check
      for(var i=0,l=moveListener.length;i<l;i++){
        listener=moveListener[i];
        if(listener.checkArea(path)){
          listener.effect(unit);
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
  this.checkAttack=function(unit,path){
  }
  this.attack=function(unit,path){
  }

  this.skillHarm=function(srcUnit,dstUnit,harm){
  }
  this.skillMove=function(unit,point){
  }

  this.unitDie=function(unit){
    //TODO
  }
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
