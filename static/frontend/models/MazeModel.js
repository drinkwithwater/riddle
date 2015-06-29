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
    valid:function(i,j){
        if(typeof(i)!="number") return false;
        if(typeof(j)!="number") return false;
        if(i<0) return false;
        if(i>=this.get("iLength")) return false;
        if(j<0) return false;
        if(j>=this.get("jLength")) return false;
        return true;
    },
    getUnit:function(i,j){
        if(this.valid(i,j)) return this.posToUnit[i][j];
        else return null;
    },
    setUnit:function(i,j,unit){
        if(this.valid(i,j)) this.posToUnit[i][j]=unit;
        else{
            console.warn("maze set unit position not valid");
        }
    },
    removeUnit:function(unit){
        var i=unit.get("i");
        var j=unit.get("j");
        if(this.valid(i,j)) this.posToUnit[i][j]=null;
        else{
            console.warn("maze remove unit position not valid");
        }
    }
});
