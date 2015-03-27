var gModels=gModels||{}
gModels.MazeModel=Backbone.Model.extend({
    defaults:{
        iLength:10,
        jLength:10
    },
    posToUnit:null,
    constructor:function(aDict){
        gModels.MazeModel.__super__.constructor.call(this,aDict);
        posToUnit=aDict.posToUnit;
        //TODO
    }
});
