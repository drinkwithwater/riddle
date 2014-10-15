var gLogic=gLogic||{}

/////////////////
///// Skill /////
/////////////////
gLogic.BaseSkill=function(){
  this.ownerId=null;
  this.range=10;

  this.checkRange=function(length){return length<=range;}
  this.checkCellThrough=function(cell){
    if(!cell.content===null) return false;
    else return true;
  }
  this.effect=function(param){
  }
}
//game instanceof GamePool
gLogic.AttackSkill=function(){
}
gLogic.MoveSkill=function(){
  this.effect=function(point){
  }
  //to know the move path
}
gLogic.AttackSkill.prototype=new BaseSkill();
gLogic.MoveSkill.prototype=new BaseSkill();

///////////////////
///// Trigger /////
///////////////////
gLogic.BaseTrigger=function(){
  this.ownerId=null;
  this.range=10;
}
gLogic.AttackTrigger=function(){
  this.effect=function(dstUnit){
  }
}
gLogic.ThroughTrigger=function(){
  this.type=gLogic.skill.type.moveTrigger;
  this.game=game;
  this.owner=owner;
  this.checkArea=function(path){
    //TODO
    return false;
  }
  this.effect=function(unit){}
}
gLogic.MoveTrigger.prototype=new BaseTrigger();
gLogic.AttackTrigger.prototype=new BaseTrigger();