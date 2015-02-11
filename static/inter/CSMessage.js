module.exports=function(env){
///{{{
var gMessage=env.gMessage=env.gMessage||{}
gMessage.CSPathing=gUtil.Message.impl({
	type:"pathing",
	pathes:[]
});
gMessage.CSStart=gUtil.Message.impl({
	type:"start",
	cid:"",
	mazeName:""
});
//}}}
};