module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._TriggerSample={
        i:-1, j:-1, maxHp:10, hp:10, alive:true, key:false,
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
    });
    gBattle.ObserverUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"observer",
        createDamage:function(){
            return this.ap;
        },
        moveTrigger:function(context,mover,dstPos){
            if(mover.unitId==this.unitId) return ;
            if(mover.group==this.group) return ;
            if(gPoint.maDistance(this,dstPos)>this.triggerRange)
                return ;
            //check death
            if(this.alive){
                var reDamage=this.createDamage();
                this.battleField.unitHarm(context,this,mover,reDamage);
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
            // check range
            if(gPoint.maDistance(this,dstPos)>this.triggerRange)
                return ;
            // position check
            // the mover and rider must be on the same line
            var battleField=this.battleField;
            var path=gPoint.range(this,mover);
            if(!path) return ;
            // check if path has other unit
            var maze=battleField.getMaze();
            for(var x=1,l=path.length;x<l;x++){
                var dstPos=path[x];
                var unit=maze.getUnit(dstPos);
                if(_.isObject(unit)){
                    return ;
                }
            }
            // move step
            var maze=battleField.maze;
            for(var x=1,l=path.length;x<l;x++){
                var dstPos=path[x];
                // check cell empty
                var cell=maze.getCell(dstPos);
                if(!cell.isEmpty()) return ;
                battleField.unitMoveStep(context,this,dstPos);
                // check death
                if(!this.alive) return ;
            }
            var damage=this.createDamage();
            battleField.unitAttack(context,this,mover,damage);
        }
    });
    //}}}
}
