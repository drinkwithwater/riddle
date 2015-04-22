var gModels=gModels||{}
gModels.unitModelDict={}
gModels.unitModelImpl=function(props,staticProps){
    var aClass=gModels.BaseUnitModel.extend(props,staticProps);
    if(props.typeName){
        gModels.unitModelDict[props.typeName]=aClass;
    }else{
        console.warn("a unit class define without type name");
    }
    return aClass;
};
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
gModels.TriggerUnitModel=gModels.unitModelImpl({
    typeName:"trigger",
    pathingType:function(newArea,beforePath){
        return gUI.PATHING_TYPE_NONE=0;
    },
    canOper:function(){
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