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
    battleTest.createUnit("attacker",0,4);
    battleTest.createUnit("attacker",1,4);
    battleTest.createUnit("slowGun",9,0);
    battleTest.createUnit("slowGun",5,5);
    battleTest.createUnit("slowGun",1,0);
    viewTest.reRender();
}
