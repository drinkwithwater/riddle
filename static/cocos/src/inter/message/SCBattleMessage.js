module.exports=function(env){
    ///{{{
    var gMessage=env.gMessage=env.gMessage||{}
    gMessage.SCBattleMessage=gUtil.Message.extend({
        class:"sc_battle"
    });
	gMessage.SCStartScript=gMessage.SCBattleMessage.extend({
        type:"start_script",
		scriptName:"empty"
	});
    gMessage.SCShowEventArray=gMessage.SCBattleMessage.extend({
        type:"show_event_array",
        eventArray:[]
    });
    gMessage.SCEffect=gMessage.SCBattleMessage.extend({
        type:"effect",
        unitId:"",
        //other change e.g. hp:100
    });
    //}}}
};
