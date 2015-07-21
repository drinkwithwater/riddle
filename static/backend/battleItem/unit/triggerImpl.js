module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._TriggerSample={
        i:-1, j:-1, maxHp:10, hp:10, alive:true, key:false,
        ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,
        group:gScript.GROUP_DEFENSER,
        moveTrigger:function(context,unit,srcPos){},
    }
    gBattle.TriggerUnit=gBattle.unitImpl({
        group:gScript.GROUP_DEFENSER,
        typeName:"trigger",
        moveTrigger:function(context,unit,srcPos){
        },
        attackTrigger:function(context,attacker,damage){
            if(attacker.unitId==this.unitId) return ;
            if(attacker.group==this.group) return ;
            //check death
            if(this.alive){
                var reDamage=this.createDamage();
                this.battleField.unitHarm(context,this,attacker,reDamage);
            }
        },
        onAttack:function(context,source,damage){
            if(this.alive){
                this.attackTrigger(context,source,damage);
                this.hp-=damage;
                this.battleField.unitSetAttr(context,this,"hp",this.hp);
                if(this.hp<=0){
                    this.alive=false;
                    this.battleField.unitDie(context,this);
                }
            }else{
                return ;
            }
        },
    });
    gBattle.WallUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"wall",
    });
    gBattle.ObserverUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"observer",
        createDamage:function(){
            return this.ap;
        },
        moveTrigger:function(context,mover,srcPos){
            if(mover.unitId==this.unitId) return ;
            if(mover.group==this.group) return ;
            if(gPoint.maDistance(this,mover)>this.triggerRange)
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
        moveTrigger:function(context,mover,srcPos){
            // check if itself
            if(mover.unitId==this.unitId) return ;
            // check if the partner
            if(mover.group==this.group) return ;
            // check death
            if(!this.alive) return ;
            // check range
            if(gPoint.maDistance(this,mover)>this.triggerRange)
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
                // if cell's not empty, return 
                var cell=maze.getCell(dstPos);
                if(!cell.isEmpty()) return ;
                battleField.unitMoveStep(context,this,dstPos);
                // if dstPos's not moving result, return
                var normal=(dstPos.i===this.i&&dstPos.j===this.j);
                if(!normal) return;
                // check death
                if(!this.alive) return ;
            }
            var damage=this.createDamage();
            battleField.unitAttack(context,this,mover,damage);
        }
    });
    gBattle.TransferUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"transfer",
        inRange:function(pos){
            var distance=gPoint.maDistance(this,pos);
            if(distance>this.triggerRange) return false;
            if(distance<=0) return false;
            if(this.i!=pos.i && this.j!=pos.j) return false;
            return true;
        },
        moveTrigger:function(context,mover,srcPos){
            // check if itself
            if(mover.unitId==this.unitId) return ;
            // check if the partner
            if(mover.group==this.group) return ;
            // check death
            if(!this.alive) return ;
            // check range
            if(!this.inRange(mover)) return ;
            // if srcPos is in range, return
            if(this.inRange(srcPos)) return ;
            // position check
            var battleField=this.battleField;
            var maze=battleField.getMaze();
            // the mover and rider must be on the same line
            if(this.i!=mover.i && this.j!=mover.j) return;
            var dstPos={
                i:2*this.i-mover.i,
                j:2*this.j-mover.j
            };
            if(!maze.valid(dstPos)) return ;
            if(!maze.getCell(dstPos).isEmpty()) return ;
            battleField.unitMoveStep(context,mover,dstPos);
        }
    });
    gBattle.BoxUnit=gBattle.unitExtend(gBattle.TriggerUnit,{
        typeName:"box",
        afterAttackTrigger:function(context,attacker,damage){
            var dstPos={i:this.i,j:this.j};
            if(attacker.i==this.i){
                dstPos.j+=(attacker.j>this.j?-1,1);
            }else if(attacker.j==this.j){
                dstPos.i+=(attacker.i>this.i?-1,1);
            }else{
                // not in the same line
                return ;
            }
            var battleField=this.battleField;
            var maze=battleField.getMaze();
            if(!maze.valid(dstPos)) return ;
            if(!maze.getCell(dstPos).isEmpty()) return ;
            battleField.unitMoveStep(context,this,dstPos);
        },
        onAttack:function(context,source,damage){
            if(this.alive){
                this.attackTrigger(context,source,damage);
                this.hp-=damage;
                this.battleField.unitSetAttr(context,this,"hp",this.hp);
                if(this.hp<=0){
                    this.alive=false;
                    this.battleField.unitDie(context,this);
                }else{
                    this.afterAttackTrigger(context,source,damage);
                }
            }else{
                return ;
            }
        },
    });
    //}}}
}
