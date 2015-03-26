var gModels=gModels||{}
gModels.CellModel=Backbone.Model.extend({
    defaults:{
        i:null,
        j:null
    },
});
gModels.CellCollection=Backbone.Collection.extend({
    models:gModels.CellModel
});
