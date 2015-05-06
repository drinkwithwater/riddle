module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    /*
    gBattle.BaseUnit=gUtil.Class.extend({
        i:-1,
        j:-1,
        hp:100,
	    ownerId:null,
        unitId:null,
	    battleField:null,
	    
	    //return pathing result
	    pathingOper:function(cellPath){},
	    //return nothing
	    move:function(context,path){},
	    //return true or false
	    canAttack:function(cellPath){},
	    //return damage
	    attack:function(context,path){},
	    //return nothing
	    onAttacked:function(context,srcUnit,damage){}
    });*/
    gBattle.SimpleUnit=gUtil.Class.extend({
        i:-1,
        j:-1,
        hp:100,
	    ownerId:null,
        unitId:null,
	    battleField:null,
	    
	    pathingOper:function(path){
	        var dst=path[path.length-1];
	        var dstCell=this.battleField.maze.getCell(dst);
	        if(dstCell.hasUnit()){
		        return this.operFunction.operAttack;
	        }else if(dstCell.isEmpty()){
		        return this.operFunction.operMove;
	        }
	        return null;
	    },
        operFunction:{
	        operMove:function(context,path){
	            var battleField=this.battleField;
		        battleField.unitMoveStep(context,this,_.last(path));
	        },
	        operAttack:function(context,path){
                var battleField=this.battleField;
                var target=battleField.getMaze().getUnit(_.last(path));
                battleField.unitAttack(context,this,target);
	        },
        },
        outDamage:function(context,target){
            return 10;
        },
        inDamage:function(context,source,damage){
            this.hp-=damage;
            this.battleField.unitSetAttr(context,this,"hp",10);
        },
    });
    gBattle.BaseUnit=gBattle.SimpleUnit;
    //}}}
};

