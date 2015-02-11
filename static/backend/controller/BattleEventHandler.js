module.exports=function(env){
//(((
	var gController=env.gController=env.gController||{};
	gController.BattleEventHandler=gUtil.Class.Extend({
		sender:{
			sendMessage:function(message){
				console.log("send message:"+JSON.stringify(message));
				console.log("sender not impl");
			}
		},
		cid:null,
		constructor:function(sender){
			this.sender=sender;
		},
		addShow:function(show){
		},
		end:function(){
		}
	});
//)))
}