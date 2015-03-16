module.exports=function(env){
  ///{{{
  var gBattle=env.gBattle=env.gBattle||{};
  gBattle.battleScript={};
  gBattle.battleScript["default"]={
    battleType:0,
    iLength:6,
    jLength:6,
    unitArray:[[0,0,0, 0,1,0],
    [0,0,0, 1,1,0],
    [0,0,0, 0,0,0],

    [0,0,0, 0,1,0],
    [0,0,0, 0,0,0],
    [0,0,0, 0,0,1]]
  }
  ///}}}
}
