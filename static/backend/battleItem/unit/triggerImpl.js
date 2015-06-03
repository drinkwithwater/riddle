module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._TriggerSample={
        i:-1, j:-1, maxHp:20, hp:20, ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,
        moveTrigger:function(context,unit,dstPos){},
        damageTrigger:function(context,source,damage){}
    }
    gBattle.TriggerUnit=gBattle.unitImpl({
        typeName:"trigger",
        moveTrigger:function(context,unit,dstPos){
        },
        damageTrigger:function(context,source,damage){
        }
    });
    gBattle.WallUnit=gBattle.unitImpl({
        typeName:"wall",
        moveTrigger:function(context,unit,dstPos){
        }
    });
    //}}}
}
