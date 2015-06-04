module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._TriggerSample={
        i:-1, j:-1, maxHp:20, hp:20, alive:true,
        ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,
        moveTrigger:function(context,unit,dstPos){},
        attackTrigger:function(context,source,damage){}
    }
    gBattle.TriggerUnit=gBattle.unitImpl({
        typeName:"trigger",
        moveTrigger:function(context,unit,dstPos){
        },
        attackTrigger:function(context,source,damage){
        }
    });
    gBattle.WallUnit=gBattle.unitImpl({
        typeName:"wall",
        maxHp:200,
        hp:200,
        createDamage:function(){
            return 1;
        },
        moveTrigger:function(context,unit,dstPos){
        },
        attackTrigger:function(context,source,damage){
            //check death
            if(this.alive){
                var reDamage=this.createDamage();
                this.battleField.unitHarm(context,this,source,reDamage);
            }
        }
    });
    //}}}
}
