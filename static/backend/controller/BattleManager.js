module.exports=function(env){
    //{{{
    var gController=env.gController=env.gController||{}
    gController.BattlePlayer=gUtil.Class.extend({
	    session:null,
	    battle:null,
	    playerId:null,//key in BattleField
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
	    //this is not called by ServerModule, but called by GameController
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
		"start":"messageStart",
		"join":"messageJoin",
		"pathing":"messagePathing",
		"exit":"messageExit",
	    },
	    messageStart:function(battlePlayer,message){
		//if battle existed,remove.
		if(battlePlayer.battle){
		    this.onPlayerExit(battlePlayer);
		}
		//create battleField
		var battleField=gBattle.BattleFactory.createBattle(message.battleName);
		this.battleSet[battleField._id]=battleField;
		//set player.battle
		battlePlayer.battle=battleField;
		//reply client
		var reMsg=new gMessage.SCStartScript();
		this.serverModule.sendMessage(battlePlayer.session,reMsg);
	    },
	    messageJoin:function(){},
	    messagePathing:function(battlePlayer,message){
		var battle=battlePlayer.battle;
		if(battle){
		    //TODO
		}else{
		    console.error("battle not started");
		}
	    },
	    messageExit:function(battlePlayer,message){
		this.onPlayerExit(battlePlayer);
	    },
	    //when player exit battle or player start a new battle
	    onPlayerExit:function(battlePlayer){
		var battle=battlaPlayer.battle;
		battle.onPlayerExit(battlePlayer);
		//TODO battle.onPlayerExit();
		battlePlayer.battle=null;
	    },
	    //when player connect close or fail
	    onPlayerQuit:function(battlePlayer){
		this.onPlayerExit(battlePlayer);
		delete this.sessionIdToPlayer[battlePlayer.session.id];
	    },
	    onBattleExit:function(battle){
		    
		//remove from set
		delete this.battleSet[battle._id];
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
