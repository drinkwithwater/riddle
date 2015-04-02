var gModels=gModels||{}
gModels.UnitModel=Backbone.Model.extend({
    defaults:{
        i:null,
        j:null,
        unitId:null
    },
    pathingType:function(pathed,area){
        return PATHING_TYPE_NOTHING_MOVE;
    },
    attackArea:function(){
        return [];
    },
    moveArea:function(){
        return [];
    }
});
gModels.UnitCollection=Backbone.Collection.extend({
    models:gModels.UnitModel
});
