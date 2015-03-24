module.exports=function(env){
    //(((
    var gController=env.gController=env.gController||{};
    gController.BattleEventSender=gUtil.Class.Extend({
	    battleField:null,
	    battleManager:null,
	    gameController:null,
	    serverModule:null,
	    constructor:function(){
	    },
	    sendEvents:function(eventArray){
	    }
    });
    //)))
}
