module.exports=function(env){
//{{{
	var gController=env.gController=env.gController||{}
  gController.BattlePlayer=gUtil.Class.extend({
    session:null,
    battle:null,
    playId:null,//key in BattleField
    userId:null,
    constructor:function(gamePlayer){
      this.session=gamePlayer.session;
    }
  });
	gController.BattleManager=gUtil.Class.extend({
    battleSet:{},
		name:"battleModule",
		serverModule:null,
		init:function(gameTop){
			this.serverModule=gameTop.getModule("serverModule");
		},
		start:function(gameTop){
		},
    //this is not called by server, but called by GameController
		onMessage:function(gamePlayer,message){
      var battlePlayer=this.getPlayer(gamePlayer);
      var handlerFunc=this[this.messageHandlers[message.type]];
      if(handlerFunc){
        handlerFunc.call(this,battlePlayer,message);
      }else{
        console.error("message type error : "+message.type);
      }
      //TODO
		},
    messageHandlers:{
      "start":"onStart",
      "join":"onJoin",
      "pathing":"onPathing"
    },
		onStart:function(battlePlayer,message){
      //create battleField
      var battleField=gBattle.BattleFactory.createBattle(message.battleName);
      this.battleSet[battleField._id]=battleField;
      //set player.battle
      battlePlayer.battle=battleField;
      //reply client
			var reMsg=new gMessage.SCStartScript();
			this.serverModule.sendMessage(battlePlayer.session,reMsg);
		},
		onClose:function(cid){
		},
    //convert player
    sessionIdToPlayer:{},
    getPlayer:function(gamePlayer){
      var sidToPlayer=this.sessionIdToPlayer;
      var battlePlayer=sidToPlayer[gamePlayer.session.id];
      if(!battlePlayer){
        battlePlayer=new gController.BattlePlayer(gamePlayer);
      }
      return battlePlayer;
    }
	});
//}}}
};
