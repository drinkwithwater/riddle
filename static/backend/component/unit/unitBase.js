module.exports=function(env){
//{{{
	var gBattle=env.gBattle=env.gBattle||{}
    gBattle.BaseUnit=gUtil.Class.extend({
        i:-1,
        j:-1,
        hp:100,
        unitId:null,
        attackRule:null,
        moveRule:null,
        triggerRule:null
    })
//}}}
}

