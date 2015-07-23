module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._NormalSample={
        i:-1, j:-1, maxHp:10, hp:10, ap:10, key:false,
        attackRange:1, alive:true, mp:1,
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
            var maze=this.battleField.maze;
            for(var i=1,length=path.length;i<length;i++){
                var pos=path[i];
                // if cell's not empty, return 
                var cell=maze.getCell(pos);
                if(!cell.isEmpty()) return ;
                this.battleField.unitMoveStep(context,this,pos);
                // if pos's not move result, return 
                var normal=(pos.i===this.i&&pos.j===this.j);
                if(!normal) return ;
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
            return this.ap;
        },
        onAttack:function(context,source,damage){
            this.onDamage(context,source,damage);
        },
        onDamage:function(context,source,damage){
            if(this.alive){
                var beforeHp=this.hp;
                this.hp-=damage;
                var afterHp=this.hp;
                this.battleField.unitSetAttr(context,this,"hp",this.hp);
                if(this.hp<=0){
                    this.alive=false;
                    this.battleField.unitDie(context,this);
                }else{
                    var line=Math.floor(this.maxHp/2);
                    console.log(line);
                    if(beforeHp>line && afterHp<=line){
                        // berserker state for mp!=0
                        this.mp=1;
                        this.ap=this.ap*2;
                        this.battleField.unitSetAttr(context,this,"mp",this.mp);
                        this.battleField.unitSetAttr(context,this,"ap",this.ap);
                    }
                }
            }else{
                return ;
            }
        }
    });
    gBattle.HitterUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"hitter",
        createDamage:function(target){
            return this.ap;
            /*
            var distance=gPoint.maDistance(this,target);
            if(distance<=1){
                return this.ap+1;
            }else{
                return this.ap-1;
            }*/
        }
    });
    gBattle.AssassinUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"assassin",
        createDamage:function(target){
            return this.ap;
        },
        operAttack:function(context,path){
            var battleField=this.battleField;
            var target=battleField.getMaze().getUnit(_.last(path));
            if(this.mp==0){
                var damage=this.createDamage(target);
                battleField.unitAttack(context,this,target,damage);
            }else{
                var damage=this.createDamage(target);
                battleField.unitAttack(context,this,target,damage);
                this.ap=Math.floor(this.ap/2);
                this.mp=0;
                battleField.unitSetAttr(context,this,"mp",this.mp);
                battleField.unitSetAttr(context,this,"ap",this.ap);
            }
        }
    });
    gBattle.ArcherUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"archer",
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
