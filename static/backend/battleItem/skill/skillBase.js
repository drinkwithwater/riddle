//this module's not used
module.exports=function(env){
    var gBattle=env.gBattle=env.gBattle||{}

    /////////////////
    ///// Skill /////
    /////////////////
    gBattle.BaseSkill=gUtil.Class.extend({
      owner:null,
      range:10,
      kid:null
    })
    //game instanceof GamePool
    gBattle.AttackSkill=gBattle.BaseSkill.extend({
      checkValid:function(path,battle){
        return true;
      },
      effect:function(path,battle){
      }
    })
    gBattle.MoveSkill=gBattle.BaseSkill.extend({
      checkValid:function(path,battle){
        return true;
      },
      effect:function(path,battle){
      }
    })
    gBattle.TriggerSkill=gBattle.BaseSkill.extend({
      effect:function(battle){
      }
    })

    ///////////////////
    ///// Trigger /////
    ///////////////////
    gLogic.BaseTrigger=function(){
      this.ownerUnit=null;
      this.game=null;
      this.range=10;
    }
    gLogic.AttackTrigger=function(){
    }
    gLogic.ThroughTrigger=function(){
      this.checkArea=function(pos){
        var distance=gUtil.posAbs(pos,this.ownerUnit)
        if(distance>range) return false;
        else return true;
      }
      this.effect=function(showList,unit){
      }
    }
}