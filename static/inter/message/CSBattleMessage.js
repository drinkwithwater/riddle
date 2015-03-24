module.exports=function(env){
  ///{{{
  var gMessage=env.gMessage=env.gMessage||{}
  gMessage.CSBattleMessage=gUtil.Message.extend({
    class:"cs_battle",
  });
  gMessage.CSStart=gMessage.CSBattleMessage.extend({
    type:"start",
    scriptName:"empty"
  });
  gMessage.CSJoin=gMessage.CSBattleMessage.extend({
    type:"join",
    battleId:""
  });
  //user action
  gMessage.CSPathing=gMessage.CSBattleMessage.extend({
    type:"pathing",
    pathes:[]
  });
  //}}}
};
