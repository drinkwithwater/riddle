module.exports=function(env){
  ///{{{
  var gBattle=env.gBattle=env.gBattle||{};
  gBattle.battleScript={};
  gBattle.battleScript["empty"]={
    battleType:0,
    iLength:6,
    jLength:6,
    unitArray:[[0,0,0, 0,1,0],
    [0,0,0, 0,2,0],
    [0,0,0, 0,0,0],

    [0,0,0, 0,4,0],
    [0,0,0, 0,0,0],
    [0,0,0, 0,0,1]]
  }
  ///}}}
}
