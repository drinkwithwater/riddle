module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.SimpleUnit=gUtil.Class.extend({
        i:-1,
        j:-1,
        hp:10,
        maxHp:10,
        alive:true,
	    ownerId:null,
        unitId:null,
	    battleField:null,
	    
	    pathingOper:function(path){
	        var dst=path[path.length-1];
	        var dstCell=this.battleField.maze.getCell(dst);
            // if the cell is itself
            if(dst.unitId==this.unitId){
                return null;
            }
            // TODO if the cell is it's partner
            // attack or move
            if(dstCell.hasUnit()){
		        return this.operAttack;
	        }else if(dstCell.isEmpty()){
		        return this.operMove;
	        }
	        return null;
	    },
        /**
         * user move operation
         */
        operMove:function(context,path){
            var battleField=this.battleField;
            battleField.unitMoveStep(context,this,_.last(path));
        },
        /**
         * user attack operation
         */
        operAttack:function(context,path){
            var battleField=this.battleField;
            var target=battleField.getMaze().getUnit(_.last(path));
            var damage=this.createDamage(target);
            battleField.unitAttack(context,this,target,damage);
        },
        /**
         * called by operAttack
         */
        createDamage:function(){
            return 2;
        },
        /**
         * unit on damage
         */
        onDamage:function(context,source,damage){
            this.hp-=damage;
            this.battleField.unitSetAttr(context,this,"hp",this.hp);
            if(this.hp<=0){
                this.alive=false;
                this.battleField.unitDie(context,this);
            }
        },
    });
    gBattle.BaseUnit=gBattle.SimpleUnit;
    gBattle.unitClassDict={}
    gBattle.unitImpl=function(props,staticProps){
        var aUnitClass=gBattle.BaseUnit.extend(props,staticProps);
        if(props.typeName){
            gBattle.unitClassDict[props.typeName]=aUnitClass;
        }else{
            console.warn("unit class defined without typeName");
        }
        return aUnitClass;
    }
    gBattle.unitExtend=function(baseClass,prop,staticProps){
        var aUnitClass=baseClass.extend(props,staticProps);
        if(props.typeName){
            gBattle.unitClassDict[props.typeName]=aUnitClass;
        }else{
            console.warn("unit class defined without typeName");
        }
        return aUnitClass;
    }
    //}}}
};

