module.exports=function(env){
//{{{
	var gController=env.gController=env.gController||{}
	gController.BattleManager=gUtil.Class.extend({
		name:"battleModule",
		bidBattle:{},
		serverModule:null,
		init:function(gameTop){
			this.serverModule=gameTop.getModule("serverModule");
		},
		start:function(gameTop){
		},
		onOpen:function(session,message){
			//TODO use factory create battle;
			this.bidBattle[message.cid]={nothing:"nothing"}//gBattle.BattleFactory.createByName(message.mazeName);
			var reMsg=new gMessage.SCStartMaze();
			this.serverModule.sendMessage(session,reMsg);
		},
		onMessage:function(session,message){
		},
		onClose:function(cid){
		}
	});
//}}}
};