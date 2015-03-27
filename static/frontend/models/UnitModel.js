var gModels=gModels||{}
gModels.UnitModel=Backbone.Model.extend({
    defaults:{
        i:null,
        j:null,
        unitId:null
    },
});
gModels.UnitCollection=Backbone.Collection.extend({
    models:gModels.UnitModel
});
