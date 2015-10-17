module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.OneUnit=gBattle.unitExtend(gBattle.WalkerUnit,{
        group:gBattle.GROUP_ATTACKER,
        typeName:"one",
        
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
                if(this.group==dstUnit.group){
                    return null;
                }
                // check empty cell
                var ar=this.attackRange;
                for(var i=1,length=path.length;i<length-ar;i++){
                    var cell=maze.getCell(path[i]);
                    if(!cell.isEmpty()) return null;
                }
                return this.operMoveAttack;
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
        operMoveAttack:function(context,path){
            var ar=this.attackRange;
            this.operMove(context,path.slice(0,path.length-ar));
            if(this.alive){
                this.operAttack(context,path.slice(path.length-ar));
            }
        }
    });
    gBattle.TwoUnit=gBattle.unitExtend(gBattle.OneUnit,{
        group:gBattle.GROUP_ATTACKER,
        typeName:"two",
    });
    //}}}
}
