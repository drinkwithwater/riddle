module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._NormalSample={
        i:-1, j:-1, maxHp:10, hp:10, alive:true,
        ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,attackRange:1,
        group:gBattle.GROUP_ATTACKER,
    }
    gBattle.FlierUnit=gBattle.unitImpl({
        group:gBattle.GROUP_ATTACKER,
        typeName:"flier"
    });
    gBattle.WalkerUnit=gBattle.unitImpl({
        group:gBattle.GROUP_ATTACKER,
        typeName:"walker",
        attackRange:1,
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
                if(gPoint.maDistance(this,dst)>this.attackRange){
                    return null;
                }
                if(this.group==dst.group){
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
        }
    });
    gBattle.BerserkerUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"berserker",
        createDamage:function(){
            var maxHp=this.maxHp;
            var hp=this.hp;
            if(2*hp<=maxHp){
                return 4;
            }else{
                return 2;
            }
        },
    });
    gBattle.HitterUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"hitter",
        createDamage:function(target){
            var distance=gPoint.maDistance(this,target);
            if(distance<=1){
                return 3;
            }else{
                return 1;
            }
        }
    });
    gBattle.AssassinUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        typeName:"assassin",
        firstAttack:true,
        createDamage:function(){
            if(this.firstAttack){
                this.firstAttack=false;
                return 3;
            }else{
                return 1;
            }
        }
    });
    //}}}
}
