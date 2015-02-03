var gLogic=gLogic||{}

/////////////////
///// Skill /////
/////////////////
gLogic.BaseSkill=function(){
  this.ownerUnit=null;
  this.game=null;
  this.range=10;
  this.id=null;

  this.getId=function(){
  	return this.getId();
  }
  this.checkRange=function(length){return length<=range;}
  this.checkCellThrough=function(cell){
    if(!cell.content===null) return false;
    else return true;
  }
  this.effect=function(showList,param){
  }
}
//game instanceof GamePool
gLogic.AttackSkill=function(){
}
gLogic.MoveSkill=function(){
}
gLogic.AttackSkill.prototype=new gLogic.BaseSkill();
gLogic.MoveSkill.prototype=new gLogic.BaseSkill();

///////////////////
///// Trigger /////
///////////////////
gLogic.BaseTrigger=function(){
  this.ownerUnit=null;
  this.game=null;
  this.range=10;
}
gLogic.AttackTrigger=function(){
}
gLogic.ThroughTrigger=function(){
  this.checkArea=function(pos){
  	var distance=gUtil.posAbs(pos,this.ownerUnit)
  	if(distance>range) return false;
  	else return true;
  }
  this.effect=function(showList,unit){
  }
}
gLogic.AttackTrigger.prototype=new gLogic.BaseTrigger();
gLogic.ThroughTrigger.prototype=new gLogic.BaseTrigger();