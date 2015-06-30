module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._NormalSample={
        i:-1, j:-1, maxHp:10, hp:10, ap:10, key:false,
        attackRange:1, alive:true,
        ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,attackRange:1,
        group:gBattle.GROUP_ATTACKER,
    }
    gBattle.FlierUnit=gBattle.unitImpl({
        group:gBattle.GROUP_ATTACKER,
        typeName:"flier",
	    pathingOper:function(path){
	        var dst=path[path.length-1];
	        var dstCell=this.battleField.maze.getCell(dst);
            // attack or move
            if(dstCell.hasUnit()){
                var dstUnit=dstCell.getContent();
                // out of range -> null
                if(gPoint.maDistance(this,dst)>this.attackRange){
                    return null;
                }
                // the same group -> null
                if(this.group==dstUnit.group){
                    return null;
                }
                return this.operAttack;
	        }else if(dstCell.isEmpty()){
		        return this.operMove;
	        }
	        return null;
	    },
    });
    gBattle.WalkerUnit=gBattle.unitImpl({
        group:gBattle.GROUP_ATTACKER,
        typeName:"walker",
	    pathingOper:function(path){
            var maze=this.battleField.maze;
            var length=path.length;
	        var dst=path[length-1];
            var dstCell=maze.getCell(dst);
            // if the cell is itself
            if(dst.i==this.i&&dst.j==this.j){
                return null;
            }
            // attack or move
            if(dstCell.hasUnit()){
                var dstUnit=dstCell.getContent();
                // out of range -> null
                if(gPoint.maDistance(this,dst)>this.attackRange){
                    return null;
                }
                // the same group -> null
                if(this.group==dstUnit.group){
                    return null;
                }
                return this.operAttack;
	        }else if(dstCell.isEmpty()){
                // check continuous
                if(!gPoint.checkContinuous(path)){
                    return null;
                }
                // check empty cell
                for(var i=1,length=path.length;i<length-1;i++){
                    var cell=maze.getCell(path[i]);
                    if(!cell.isEmpty()) return null;
                }
		        return this.operMove;
	        }
	        return null;
	    },
        operMove:function(context,path){
            for(var i=1,length=path.length;i<length;i++){
                var pos=path[i];
                this.battleField.unitMoveStep(context,this,pos);
                // check death
                if(!this.alive) return ;
            }
        },
        operAttack:function(context,path){
            var battleField=this.battleField;
            var target=battleField.getMaze().getUnit(_.last(path));
            var damage=this.createDamage(target);
            battleField.unitAttack(context,this,target,damage);
        }
    });
    gBattle.BerserkerUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"berserker",
        createDamage:function(target){
            var maxHp=this.maxHp;
            var hp=this.hp;
            if(2*hp<=maxHp){
                return this.ap+2;
            }else{
                return this.ap;
            }
        },
    });
    gBattle.HitterUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"hitter",
        createDamage:function(target){
            var distance=gPoint.maDistance(this,target);
            if(distance<=1){
                return this.ap+1;
            }else{
                return this.ap-1;
            }
        }
    });
    gBattle.AssassinUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"assassin",
        firstAttack:true,
        createDamage:function(target){
            if(this.firstAttack){
                this.firstAttack=false;
                return this.ap*4;
            }else{
                return Math.floor(this.ap/2);
            }
        }
    });
    gBattle.ArcherUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"archer",
        createDamage:function(target){
            return Math.floor(this.ap/2);
        },
        operAttack:function(context,path){
            var battleField=this.battleField;
            var maze=battleField.getMaze();

            var target=maze.getUnit(_.last(path));
            var path=gPoint.range(this,target);
            if(!path) return ;
            else{
                // harm line unit
                for(var x=1,l=path.length;x<l;x++){
                    var pathUnit=maze.getUnit(path[x]);
                    if(pathUnit){
                        var damage=this.createDamage(pathUnit);
                        battleField.unitHarm(context,this,pathUnit,damage);
                    }
                }
                // attack target unit
                var damage=this.createDamage(target);
                battleField.unitAttack(context,this,target,damage);
            }
        }
    });
    //}}}
}
