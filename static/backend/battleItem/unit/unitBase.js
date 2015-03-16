module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.BaseUnit=gUtil.Class.extend({
        i:-1,
        j:-1,
        hp:100,
	ownerId:null,
        unitId:null,
	battleField:null,
	
	//return true or false
	canMove:function(cellPath){},
	//return nothing
	move:function(context,path){},
	//return true or false
	canAttack:function(cellPath){},
	//return damage
	attack:function(context,path){},
	//return nothing
	onAttacked:function(context,srcUnit,damage){}
    });
    gBattle.SimpleUnit=gUtil.Class.extend({
        i:-1,
        j:-1,
        hp:100,
	ownerId:null,
        unitId:null,
	battleField:null,
	
	canMove:function(cellPath){
	},
	move:function(context,path){
	    var battleField=this.battleField;
	    _.each(path,function(element){
		battleField.unitMoveStep(context,cellPath);
	    }
	},
	canAttack:function(cellPath){},
	attack:function(context,path){
	}
    })
    //}}}
};

