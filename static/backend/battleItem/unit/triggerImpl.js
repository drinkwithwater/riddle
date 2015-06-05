module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._TriggerSample={
        i:-1, j:-1, maxHp:10, hp:10, alive:true,
        ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,
        group:gScript.GROUP_DEFENSER,
        moveTrigger:function(context,unit,dstPos){},
        attackTrigger:function(context,attacker,damage){}
    }
    gBattle.TriggerUnit=gBattle.unitImpl({
        group:gScript.GROUP_DEFENSER,
        typeName:"trigger",
        moveTrigger:function(context,unit,dstPos){
        },
        attackTrigger:function(context,attacker,damage){
            if(attacker.unitId==this.unitId) return ;
            if(attacker.group==this.group) return ;
            //check death
            if(this.alive){
                var reDamage=this.createDamage();
                this.battleField.unitHarm(context,this,attacker,reDamage);
            }
        }
    });
    gBattle.WallUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"wall",
        maxHp:200,
        hp:200,
        createDamage:function(){
            return 1;
        }
    });
    gBattle.ObserverUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"observer",
        createDamage:function(){
            return 2;
        },
        moveTrigger:function(context,mover,dstPos){
            if(mover.unitId==this.unitId) return ;
            if(mover.group==this.group) return ;
            //check death
            if(this.alive){
                if(gPoint.maDistance(this,dstPos)<=1){
                    var reDamage=this.createDamage();
                    this.battleField.unitHarm(context,this,mover,reDamage);
                }
            }
        }
    });
    gBattle.RiderUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"rider",
        moveTrigger:function(context,mover,dstPos){
            // check if itself
            if(mover.unitId==this.unitId) return ;
            // check if the partner
            if(mover.group==this.group) return ;
            // check death
            if(!this.alive) return ;
            // position check
            // the mover and rider must be on the same line
            var battleField=this.battleField;
            if(this.i!=mover.i && this.j==mover.j){
                var dstPos={i:this.i,j:this.j}
                var di=(this.i<mover.i?1:-1);
                for(var i=this.i+di;i!=mover.i;i+=di){
                    dstPos.i=i;
                    battleField.unitMoveStep(context,this,dstPos);
                    // check death
                    if(!this.alive) return ;
                }
                var damage=this.createDamage();
                battleField.unitAttack(context,this,mover,damage);
            }else if(this.j!=mover.j && this.i==mover.i){
                var dstPos={i:this.i,j:this.j}
                var dj=(this.j<mover.j?1:-1);
                for(var j=this.j+dj;j!=mover.j;j+=dj){
                    dstPos.j=j;
                    battleField.unitMoveStep(context,this,dstPos);
                    // check death
                    if(!this.alive) return ;
                }
                var damage=this.createDamage();
                battleField.unitAttack(context,this,mover,damage);
            }else return ;
        }
    });
    //}}}
}
