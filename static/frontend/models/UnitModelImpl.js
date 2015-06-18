var gModels=gModels||{}
gModels.WalkerUnitModel=gModels.unitModelImpl({
    typeName:"walker",
    pathingType:function(newArea,beforePath){
        var focusUnit=this.modelManager.unit$(newArea);
        if(focusUnit){
            return gUI.PATHING_TYPE_SHOOT_ATTACK;
        }else{
            return gUI.PATHING_TYPE_WALK_MOVE;
        }
    },
    canOper:function(){
        return true;
    },
    isTrigger:function(){
        return false;
    },
    attackRange:function(){
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        return [{i:i,j:j},
                {i:i+1,j:j},
                {i:i-1,j:j},
                {i:i,j:j+1},
                {i:i,j:j-1}];
    },
    moveRange:function(){
        return [];
    }
});
gModels.FlierUnitModel=gModels.unitModelImpl({
    typeName:"flier",
    pathingType:function(newArea,beforePath){
        var focusUnit=this.modelManager.unit$(newArea);
        if(focusUnit){
            return gUI.PATHING_TYPE_SHOOT_ATTACK;
        }else{
            return gUI.PATHING_TYPE_FLY_MOVE;
        }
    },
    canOper:function(){
        return true;
    },
    isTrigger:function(){
        return false;
    },
    attackRange:function(){
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        return [{i:i,j:j},
                {i:i+1,j:j},
                {i:i-1,j:j},
                {i:i,j:j+1},
                {i:i,j:j-1}];
    },
    moveRange:function(){
        return [];
    }
});
gModels.BerserkerUnitModel=gModels.unitModelExtend(gModels.WalkerUnitModel,{
    typeName:"berserker"
});
gModels.HitterUnitModel=gModels.unitModelExtend(gModels.WalkerUnitModel,{
    typeName:"hitter"
});
gModels.AssassinUnitModel=gModels.unitModelExtend(gModels.WalkerUnitModel,{
    typeName:"assassin"
});
