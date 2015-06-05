var gModels=gModels||{}
gModels.UnitCollection=Backbone.Collection.extend({
    models:gModels.UnitModel
});
gModels.UnitModel=Backbone.Model.extend({
    defaults:{
        i:null,
        j:null,
        hp:10,
        ap:2,
        unitId:null
    },
    modelManager:null,
    pathingType:function(newArea,beforePath){
        var focusUnit=this.modelManager.unit$(newArea);
        if(focusUnit){
            return gUI.PATHING_TYPE_SHOOT_ATTACK;
        }else{
            return gUI.PATHING_TYPE_WALK_MOVE;
        }
    },
    canOper:function(){
        return false;
    },
    attackRange:function(){
        return [];
    },
    moveRange:function(){
        return [];
    }
});
gModels.SimpleUnitModel=gModels.UnitModel;
gModels.BaseUnitModel=gModels.UnitModel;
