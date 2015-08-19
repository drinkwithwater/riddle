var gModels=gModels||{}
gModels.TransferUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"transfer",
    triggerRange:function(){
        var modelManager=this.modelManager;
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var triggerRange=Number(this.get("triggerRange"));
        var rangeArray=[];
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i+1,j:j},
            {i:i+triggerRange+1,j:j}));
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i-1,j:j},
            {i:i-triggerRange-1,j:j}));
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i,j:j+1},
            {i:i,j:j+triggerRange+1}));
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i,j:j-1},
            {i:i,j:j-triggerRange-1}));
        return rangeArray;
    },
});
gModels.Transfer1UnitModel=gModels.unitModelExtend(gModels.TransferUnitModel,{
    typeName:"transfer1",
});
gModels.Transfer2UnitModel=gModels.unitModelExtend(gModels.TransferUnitModel,{
    typeName:"transfer2",
});
gModels.Updown1UnitModel=gModels.unitModelExtend(gModels.TransferUnitModel,{
    typeName:"updown1",
    triggerRange:function(){
        var modelManager=this.modelManager;
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var triggerRange=Number(this.get("triggerRange"));
        var rangeArray=[];
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i+1,j:j},
            {i:i+triggerRange+1,j:j}));
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i-1,j:j},
            {i:i-triggerRange-1,j:j}));
        return rangeArray;
    },
});
gModels.Updown2UnitModel=gModels.unitModelExtend(gModels.Updown1UnitModel,{
    typeName:"updown2",
});
gModels.Leftright1UnitModel=gModels.unitModelExtend(gModels.TransferUnitModel,{
    typeName:"leftright1",
    triggerRange:function(){
        var modelManager=this.modelManager;
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var triggerRange=Number(this.get("triggerRange"));
        var rangeArray=[];
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i,j:j+1},
            {i:i,j:j+triggerRange+1}));
        rangeArray=rangeArray.concat(gPoint.range(
            {i:i,j:j-1},
            {i:i,j:j-triggerRange-1}));
        return rangeArray;
    },
});
gModels.Leftright2UnitModel=gModels.unitModelExtend(gModels.Updown1UnitModel,{
    typeName:"leftright2",
});