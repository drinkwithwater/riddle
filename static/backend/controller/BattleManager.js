module.exports=function(env){
    //{{{
    var gController=env.gController=env.gController||{}
    gController.BattlePlayer=gUtil.Class.extend({
	    session:null,
	    battleField:null,
	    playerId:null,//key in BattleField
	    userId:null,
	    constructor:function(gamePlayer){
	        this.session=gamePlayer.session;
	    }
    });
    gController.BattleManager=gUtil.Class.extend({
        // _id to battleField
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
		        console.error("message type no handler: "+message.type);
	        }
	        //TODO
	    },

        createBattleField:function(message){
	        var battleField=gBattle.BattleFactory.createBattleByName(message.scriptName);
            var battleEventSender=new gController.BattleEventSender();
            battleField.battleManager=this;
            battleField.eventSender=battleEventSender;
	        this.battleSet[battleField._id]=battleField;

            battleEventSender.battleManager=this;
            battleEventSender.battleField=battleField;
            battleEventSender.serverModule=this.serverModule;

            return battleField;
        },

        
	    messageHandlers:{
	        "start":"messageStart",
	        "join":"messageJoin",
	        "pathing":"messagePathing",
	        "exit":"messageExit",
	    },
	    messageStart:function(battlePlayer,message){
	        //if battle existed,remove.
            var oldBattleField=battlePlayer.battleField;
	        if(oldBattleField){
		        oldBattleField.onPlayerExit(battlePlayer);
	        }
	        //create battleField
	        var battleField=this.createBattleField(message);
	        //player join battlefield 
            battleField.onPlayerJoin(battlePlayer);
	        //reply client
	        var reMsg=new gMessage.SCStartScript({scriptName:message.scriptName});
            reMsg.scriptName=message.scriptName;
	        this.serverModule.sendMessage(battlePlayer.session,reMsg);
	    },
	    messageJoin:function(battlePlayer,message){},
	    messagePathing:function(battlePlayer,message){
	        var battleField=battlePlayer.battleField;
	        if(battleField){
                battleField.onPlayerPathing(battlePlayer,message.path);
		        //TODO
	        }else{
		        console.error("battle not started");
	        }
	    },
	    messageExit:function(battlePlayer,message){
	        this.onPlayerExit(battlePlayer);
	    },
	    


	    onBattleExit:function(battleField){
	        
	        //remove from set
	        delete this.battleSet[battleField._id];
	    },
	    

	    //convert player
	    sessionIdToPlayer:{},
	    getPlayer:function(gamePlayer){
	        var sidToPlayer=this.sessionIdToPlayer;
	        var battlePlayer=sidToPlayer[gamePlayer.session.id];
	        if(!battlePlayer){
		        battlePlayer=new gController.BattlePlayer(gamePlayer);
                this.sessionIdToPlayer[gamePlayer.session.id]=battlePlayer;
	        }
	        return battlePlayer;
	    }
    });
    //}}}
};
