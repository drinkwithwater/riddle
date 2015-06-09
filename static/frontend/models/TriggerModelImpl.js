var gModels=gModels||{}
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
gModels.WallUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"wall"
});
gModels.ObserverUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"observer"
});
gModels.RiderUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"rider"
});