var gLogic=gLogic||{}
gLogic.skill.type={
  attack:1,
  move:2,
  attackTrigger:3,
  moveTrigger:4
}
//owner instanceof Unit
//game instanceof GamePool
gLogic.skill.AttackSkill=function(game,owner){
  this.type=gLogic.skill.type.attack;
  this.game=game;
  this.owner=owner;
  //the action is valid just care skill setting
  this.effect=function(dstUnit){
  }
  //to know the attack path
}
gLogic.skill.MoveSkill=function(game,owner){
  this.type=gLogic.skill.type.move;
  this.game=game;
  this.owner=owner;

  this.range=10;
  this.checkRange=function(length){return length<=range;}
  this.checkThrough=function(cell){
    if(cell) return false;
    else return true;
  }

  this.effect=function(point){
  }
  //to know the move path
}
gLogic.skill.AttackTrigger=function(game,owner){
  this.type=gLogic.skill.type.attackTrigger;
  this.game=game;
  this.owner=owner;
  this.effect=function(dstUnit){
  }
}
gLogic.skill.MoveTrigger=function(game,owner){
  this.type=gLogic.skill.type.moveTrigger;
  this.game=game;
  this.owner=owner;
  this.checkArea=function(path){
    //TODO
    return false;
  }
  this.effect=function(unit){}
}
