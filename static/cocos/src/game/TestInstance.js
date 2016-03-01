var gameTest=gameTest||{}
var gameInst=null;
var viewTest=null;
var modelTest=null;
var battleTest=null;
var dosthTest=null;
gameTest.init=function(gameInst){
    gameInst=gameInst;
    viewTest=gameInst.getModule("viewModule");
    modelTest=gameInst.getModule("modelModule");
    battleTest=modelTest.battleModel;
    battleTest.createUnit("none",1,1);
    viewTest.reRender();
}
