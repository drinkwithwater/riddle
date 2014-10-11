var gLogic=gLogic||{}

/////////////////
///// Skill /////
/////////////////
gLogic.BaseSkill=function(){
  this.game=null;
  this.owner=null;
  this.range=10;
  this.checkRange=function(length){return length<=range;}
}
//game instanceof GamePool
gLogic.AttackSkill=function(){
}
gLogic.MoveSkill=function(){
  this.checkThrough=function(cell){
    if(cell) return false;
    else return true;
  }
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
  this.game=null;
  this.owner=null;
  this.tid=null;
  this.range=null;
}
gLogic.AttackTrigger=function(){
  this.game=null;
  this.effect=function(dstUnit){
  }
}
gLogic.MoveTrigger=function(){
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