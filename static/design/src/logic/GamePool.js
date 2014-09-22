var gLogic=gLogic||{}
//check if path is continuous
function continuous(path){
  for(var i=0,l=path.length;i+1<l;i++){
    a=path[i];
    b=path[i+1];
    if(a.x===b.x){
      if(a.y-b.y===1||a.y-b.y===-1) continue;
      else return false;
    }else if(a.y===b.y){
      if(a.x-b.x===1||a.x-b.x===-1) continue;
      else return false;
    }else{
      return false;
    }
  }
  return true;
}
//all true return true, one false return false
function allTrueIter(array,check){
  for(var i=0,l=path.length;i+1<l;i++){
    if(!check(array[i])) return false;
  }
  return true;
}
gLogic.GamePoolBattle=function(){
  this.gameMaze=null;
  this.unitDict={};
  // the move trigger skill
  this.moveListener=[];
  this.attackListener=[];
  this.failMap={1:"path not continuous",
                2:"path over length",
                3:"path contain barrier"}

  this.checkMove=function(unit,path){
    if(typeof(unit)=="number") unit=unitDict[unit];
    if(unit){
      if(continuous(path)){
        return {fail:1}
      }else{
        //range check
        unitMoveSkill=unit.moveSkill;
        if(!unitMoveSkill.checkRange(path.length)){
          return {fail:2}
        }
        // path check
        cellPath=this.gameMaze.getCellPath();
        pathCheckResult=allTrueIter(cellPath,function(cell){
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
