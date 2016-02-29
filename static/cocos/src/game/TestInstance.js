var gameTest=gameTest||{}
var viewTest=null;
var modelTest=null;
var battleTest=null;
var dosthTest=null;
gameTest.init=function(gameInst){
    viewTest=gameInst.getModule("viewModule");
    modelTest=gameInst.getModule("modelModule");
    battleTest=modelTest.battleModel;
}
