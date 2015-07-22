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
        return [{i:i,j:j}];
    },
    triggerRange:function(){
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        return [];
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
        return [];
    },
});
gModels.ObserverUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"observer",
    triggerRange:function(){
        var modelManager=this.modelManager;
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var triggerRange=Number(this.get("triggerRange"));
        var rangeArray=[];
        var putDirect=function(di,dj){
            var putI=i;
            var putJ=j;
            for(var count=0;count<triggerRange;count++){
                putI+=di;
                putJ+=dj;
                var occurUnitModel=modelManager.unit$({i:putI,j:putJ});
                if(_.isObject(occurUnitModel)) break;
                else rangeArray.push({i:putI,j:putJ})
            }
        }
        putDirect(1,0);
        putDirect(0,1);
        putDirect(-1,0);
        putDirect(0,-1);
        return rangeArray;
        //TODO
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
        var modelManager=this.modelManager;
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var triggerRange=Number(this.get("triggerRange"));
        var rangeArray=[];
        var putDirect=function(di,dj){
            var putI=i;
            var putJ=j;
            for(var count=0;count<triggerRange;count++){
                putI+=di;
                putJ+=dj;
                var occurUnitModel=modelManager.unit$({i:putI,j:putJ});
                if(_.isObject(occurUnitModel)) break;
                else rangeArray.push({i:putI,j:putJ})
            }
        }
        putDirect(1,0);
        putDirect(0,1);
        putDirect(-1,0);
        putDirect(0,-1);
        return rangeArray;
    },
});
gModels.TransferUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"transfer",
    triggerRange:function(){
        var modelManager=this.modelManager;
        var i=Number(this.get("i"));
        var j=Number(this.get("j"));
        var triggerRange=Number(this.get("triggerRange"));
        var rangeArray=[];
        var putDirect=function(di,dj){
            var putI=i;
            var putJ=j;
            for(var count=0;count<triggerRange;count++){
                putI+=di;
                putJ+=dj;
                var occurUnitModel=modelManager.unit$({i:putI,j:putJ});
                if(_.isObject(occurUnitModel)) break;
                else rangeArray.push({i:putI,j:putJ})
            }
        }
        putDirect(1,0);
        putDirect(0,1);
        putDirect(-1,0);
        putDirect(0,-1);
        return rangeArray;
    },
});
gModels.BoxUnitModel=gModels.unitModelExtend(gModels.TriggerUnitModel,{
    typeName:"box",
});
