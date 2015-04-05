var gModels=gModels||{}
gModels.MazeModel=Backbone.Model.extend({
    defaults:{
        iLength:10,
        jLength:10
    },
    posToUnit:null,
    modelManager:null,
    constructor:function(aDict){
        gModels.MazeModel.__super__.constructor.call(this,{
            iLength:aDict.iLength,
            jLength:aDict.jLength
        });
        if(aDict.posToUnit){
            this.posToUnit=aDict.posToUnit;
        }else{
            var iLength=aDict.iLength;
            var jLength=aDict.jLength;
            this.posToUnit=new Array(iLength);
            for(var i=0;i<iLength;i++){
                this.posToUnit[i]=new Array(jLength);
            }
        }
        //TODO
    },
    getUnit:function(i,j){
        return this.posToUnit[i][j];
    },
    setUnit:function(i,j,unit){
        this.posToUnit[i][j]=unit;
    }
});
