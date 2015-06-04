module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._TriggerSample={
        i:-1, j:-1, maxHp:10, hp:10, alive:true,
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
        attackTrigger:function(context,attacker,damage){
            if(attacker.unitId==this.unitId){
                return ;
            }
            //TODO check if attacker is a partner
            //check death
            if(this.alive){
                var reDamage=this.createDamage();
                this.battleField.unitHarm(context,this,attacker,reDamage);
            }
        }
    });
    gBattle.ObserverUnit=gBattle.unitImpl({
        typeName:"observer",
        createDamage:function(){
            return 2;
        },
        moveTrigger:function(context,mover,dstPos){
            if(mover.unitId==this.unitId){
                return ;
            }
            //TODO check if mover is a partner
            //check death
            if(this.alive){
                if(gPoint.maDistance(this,dstPos)<=1){
                    var reDamage=this.createDamage();
                    this.battleField.unitHarm(context,this,mover,reDamage);
                }
            }
        },
        attackTrigger:function(context,attacker,damage){
            if(attacker.unitId==this.unitId){
                return ;
            }
            //TODO check if attacker is a partner
            //check death
            if(this.alive){
                var reDamage=this.createDamage();
                this.battleField.unitHarm(context,this,attacker,reDamage);
            }
        }
    });
    //}}}
}
