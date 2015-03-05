module.exports=function(env){
//{{{
	var gController=env.gController=env.gController||{}
  gController.GamePlayer=gUtil.Class.extend({
    session:null,
    constructor:function(session){
      this.session=session;
    }
  });
	gController.GameController=gUtil.Class.extend({
		name:"controllerModule",
		serverModule:null,
		battleModule:null,
		init:function(gameTop){
			this.serverModule=gameTop.getModule("serverModule");
			this.serverModule.addListener(this);
			this.battleModule=gameTop.getModule("battleModule");
		},
		start:function(gameTop){
		},
		onMessage:function(session,message){
      var gamePlayer=this.getPlayer(session);
      if(message.class=="cs_battle"){
		    this.battleModule.onMessage(gamePlayer,message);
      }else{
        //TODO
      }
		},
    //player get/create part
    sessionIdToPlayer:{},
    getPlayer:function(session){
      var sidToPlayer=this.sessionIdToPlayer;
      var gamePlayer=sidToPlayer[session.id];
      //if not existed then create
      if(!gamePlayer){
        gamePlayer=new gController.GamePlayer(session);
        sidToPlayer[session.id]=gamePlayer;
      }
      return gamePlayer;
    }
	});
//}}}
}
