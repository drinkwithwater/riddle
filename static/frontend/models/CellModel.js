var gModels=gModels||{}
gModels.CellModel=Backbone.Model.extend({
  defaults:{
    content:null
  },
  initialize:function(){
  }

});
gModels.CellCollection=Backbone.Collection.extend({
  models:gModels.CellModel
});
