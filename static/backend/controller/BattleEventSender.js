module.exports=function(env){
    //(((
    var gController=env.gController=env.gController||{};
    gController.BattleEventSender=gUtil.Class.extend({
	    battleField:null,
	    battleManager:null,
	    serverModule:null,
	    constructor:function(){
	    },
	    sendEvents:function(player,eventArray){
            var msgArray=[];
            _.each(eventArray,function(e){
                msgArray.push(e.toMessage());
            });
            var message=new gMessage.SCShowArray({array:msgArray});
            this.serverModule.sendMessage(player.session,message);
	    }
    });
    //)))
}
