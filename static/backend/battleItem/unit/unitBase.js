module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle.SimpleUnit=gUtil.Class.extend({
        i:-1,
        j:-1,

        ap:2, // this attr is setting in NumericalScript.js
        hp:4, // this attr is setting in NumericalScript.js
        maxHp:4, // this attr is setting in NumericalScript.js
        attackRange:1, // this attr is setting in NumericalScript.js
        group:gScript.GROUP_MIDDLE, // this attr is setting in NumericalScript.js
        /* As unit may not be removed when killed,
           I need to record an alive flag to forbid it to 
           do something wrong when killed.
           */
        alive:true, 
	    ownerId:null,
        unitId:null,
	    battleField:null,
	    
	    pathingOper:function(path){
	        var dst=path[path.length-1];
	        var dstCell=this.battleField.maze.getCell(dst);
            // This implement do not check many things.

            // attack or move
            if(dstCell.hasUnit()){
                if(dstCell.getContent().group!=this.group){
                    return this.operAttack;
                }
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
        createDamage:function(target){
            return this.ap;
        },
        /**
         * unit on damage
         */
        onDamage:function(context,source,damage){
            if(this.alive){
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
        /**
         * unit on attack
         */
        onAttack:function(context,source,damage){
            if(typeof(this.attackTrigger)=="function"){
                this.attackTrigger(context,source,damage);
            }
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
        if(props.typeName){
            var num=gScript.unitNumericalDict[props.typeName];
            if(num){
                // extend hp, ap, range, group
                _.extend(props,num);
                // set max hp as hp
                props.maxHp=num.hp;
            }
            var aUnitClass=gBattle.BaseUnit.extend(props,staticProps);
            gBattle.unitClassDict[props.typeName]=aUnitClass;
        }else{
            var aUnitClass=gBattle.BaseUnit.extend(props,staticProps);
            console.warn("unit class defined without typeName");
        }
        return aUnitClass;
    }
    gBattle.unitExtend=function(baseClass,props,staticProps){
        if(props.typeName){
            var num=gScript.unitNumericalDict[props.typeName];
            if(num){
                _.extend(props,num);
                // set max hp as hp
                props.maxHp=num.hp;
            }
            var aUnitClass=baseClass.extend(props,staticProps);
            gBattle.unitClassDict[props.typeName]=aUnitClass;
        }else{
            var aUnitClass=baseClass.extend(props,staticProps);
            console.warn("unit class defined without typeName");
        }
        return aUnitClass;
    }
    //}}}
};

