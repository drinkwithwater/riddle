var gModels=gModels||{}
gModels.TriggerUnitModel=gModels.unitModelImpl({
    typeName:"trigger",
    pathingType:function(newArea,beforePath){
        return gUI.PATHING_TYPE_NONE=0;
    },
    canOper:function(){
        return false;
    },
    isTrigger:function(){
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
    triggerRange:function(){
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        return [{i:i,j:j}];
    },
    moveRange:function(){
        return [];
    }
});
gModels.WallUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"wall",
    triggerRange:function(){
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        return [{i:i,j:j}];
    },
});
gModels.ObserverUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"observer",
    triggerRange:function(){
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var r=Number(this.get("triggerRange"));
        return [{i:i,j:j},
                {i:i+r,j:j},
                {i:i-r,j:j},
                {i:i,j:j+r},
                {i:i,j:j-r}];
    },
});
gModels.RiderUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"rider",
    triggerRange:function(){
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var triggerRange=Number(this.get("triggerRange"));
        var rangeArray=[{i:i,j:j}];
        _.each(_.range(1,triggerRange+1),function(offset){
            rangeArray.push({i:i+offset,j:j});
            rangeArray.push({i:i,j:j+offset});
            rangeArray.push({i:i-offset,j:j});
            rangeArray.push({i:i,j:j-offset});
        });
        return rangeArray;
    },
});
