var gLogic=gLogic||{}
gLogic.Unit=function(a){
  this.a=a;
  this.x=-1;
  this.y=-1;
  this.hp=100;
  this.moveSkill=null;
  this.attackSkill=null;
  this.triggerSkill=[];
  this.initFrom=function(script){
  }
}
