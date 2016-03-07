var gameTest=gameTest||{}
var gameInstTest=null;
var viewTest=null;
var modelTest=null;
var battleTest=null;
var dosthTest=null;
gameTest.init=function(gameInst){
    gameInstTest=gameInst;
    viewTest=gameInst.getModule("viewModule");
    modelTest=gameInst.getModule("modelModule");
    battleTest=modelTest.battleModel;
    battleTest.createUnit("attacker",1,1);
    battleTest.createUnit("attacker",1,2);
    viewTest.reRender();
}
