module.exports=function(env){
    //{{{
    var gBattle=env.gBattle=env.gBattle||{}
    gBattle._NormalSample={
        i:-1, j:-1, maxHp:20, hp:20, ownerId:null, unitId:null, battleField:null,
        pathingOper:null,operMove:null, operAttack:null,
        createDamage:null, onDamage:null,
    }
    gBattle.FlierUnit=gBattle.unitImpl({
        typeName:"flier"
        /*TODO
        pathingOper:function(){
        },
        operMove:function(){
        }
        */
    });
    gBattle.WalkerUnit=gBattle.unitImpl({
        typeName:"walker"
        /*TODO
        pathingOper:function(){
        },
        operMove:function(){
        }
        */
    });
    gBattle.BerserkerUnit=gBattle.unitImpl({
        maxHp:20,
        hp:20,
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
    gBattle.HitterUnit=gBattle.unitImpl({
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
    gBattle.AssassinUnit=gBattle.unitImpl({
        typeName:"assassin",
        first:true,
        createDamage:function(){
            if(this.first){
                this.first=false;
                return 3;
            }else{
                return 1;
            }
        }
    });
    //}}}
}
