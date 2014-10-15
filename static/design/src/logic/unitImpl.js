var gLogic=gLogic||{}
gLogic.unitDict=[]
gLogic.SthUnit=function(){
}
gLogic.SthUnit.prototype=new gLogic.BaseUnit();
gLogic.unitClassDict[1]=SthUnit;
gLogic.createUnit=function(i){
  return new gLogic.unitClassDict[i]();
}
