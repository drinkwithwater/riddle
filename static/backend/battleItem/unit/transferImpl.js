module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._TransferSample={
        i:-1, j:-1, maxHp:10, hp:10, alive:true, key:false,
        ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,
        group:gScript.GROUP_DEFENSER,
        moveTrigger:function(context,unit,srcPos){},
    }
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
    gBattle.Transfer1Unit=gBattle.unitExtend(gBattle.TransferUnit,{
        typeName:"transfer1",
    });
    gBattle.Transfer2Unit=gBattle.unitExtend(gBattle.TransferUnit,{
        typeName:"transfer2",
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
            var damage=this.createDamage();
            battleField.unitHarm(context,this,this,damage);
        }
    });
    gBattle.UpDown1Unit=gBattle.unitExtend(gBattle.Transfer1Unit,{
        typeName:"updown1",
        inRange:function(pos){
            var distance=gPoint.maDistance(this,pos);
            if(distance>this.triggerRange) return false;
            if(distance<=0) return false;
            if(this.j!=pos.j) return false;
            return true;
        }
    });
    gBattle.UpDown2Unit=gBattle.unitExtend(gBattle.Transfer2Unit,{
        typeName:"updown2",
        inRange:function(pos){
            var distance=gPoint.maDistance(this,pos);
            if(distance>this.triggerRange) return false;
            if(distance<=0) return false;
            if(this.j!=pos.j) return false;
            return true;
        }
    });
    gBattle.LeftRight1Unit=gBattle.unitExtend(gBattle.Transfer1Unit,{
        typeName:"leftright1",
        inRange:function(pos){
            var distance=gPoint.maDistance(this,pos);
            if(distance>this.triggerRange) return false;
            if(distance<=0) return false;
            if(this.i!=pos.i) return false;
            return true;
        }
    });
    gBattle.LeftRight2Unit=gBattle.unitExtend(gBattle.Transfer2Unit,{
        typeName:"leftright2",
        inRange:function(pos){
            var distance=gPoint.maDistance(this,pos);
            if(distance>this.triggerRange) return false;
            if(distance<=0) return false;
            if(this.i!=pos.i) return false;
            return true;
        }
    });
    //}}}
}
