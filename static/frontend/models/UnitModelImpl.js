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
    attackArea:function(){
        return [];
    },
    moveArea:function(){
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
    attackArea:function(){
        return [];
    },
    moveArea:function(){
        return [];
    }
});