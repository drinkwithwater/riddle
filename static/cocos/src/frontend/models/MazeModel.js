var gModels=gModels||{}
gModels.MazeModel=Backbone.Model.extend({
    defaults:{
        iLength:10,
        jLength:10
    },
    posToUnit:null,
    posToLight:null,
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
    // for light {{{
    initWithLighter:function(){
        var iLength=this.get("iLength");
        var jLength=this.get("jLength");
        this.posToLight=new Array(iLength);
        for(var i=0;i<iLength;i++){
            this.posToLight[i]=new Array(jLength);
            for(var j=0;j<jLength;j++){
                this.posToLight[i][j]=false;
            }
        }
        for(var i=0;i<iLength;i++){
            for(var j=0;j<jLength;j++){
                var ijUnit=this.posToUnit[i][j];
                if(_.isObject(ijUnit)){
                    if(ijUnit.typeName=="lighter"){
                        this.openLight({
                            i:ijUnit.get("i"),
                            j:ijUnit.get("j"),
                        },ijUnit.get("attackRange"));
                    }else if(ijUnit.get("key")){
                        this.posToLight[i][j]=true;
                    }
                }
            }
        }
    },
    openLight:function(center,range,callback){
        var posToLight=this.posToLight;
        if(posToLight===null){
            return ;
        }
        var rangeArray=gPoint.radioRange(center,range);
        for(var x=0,l=rangeArray.length;x<l;x++){
            var pos=rangeArray[x];
            if(this.valid(pos.i,pos.j)){
                var lighted=posToLight[pos.i][pos.j];
                if(lighted){
                    continue;
                }else{
                    posToLight[pos.i][pos.j]=true;
                    var lightedUnit=this.getUnit(pos.i,pos.j);
                    if(_.isObject(lightedUnit)){
                        if(lightedUnit.getCategory()=="normal"){
                            this.openLight(
                                pos,
                                lightedUnit.get("attackRange"),
                                callback
                            );
                        }
                    }
                    if(_.isFunction(callback)){
                        callback(pos);
                    }
                }
            }
        }
    },
    forEachLight:function(callback){
        var posToLight=this.posToLight;
        if(posToLight===null){
            return ;
        }
        var iLength=this.get("iLength");
        var jLength=this.get("jLength");
        for(var i=0;i<iLength;i++){
            for(var j=0;j<jLength;j++){
                callback(posToLight[i][j],{i:i,j:j});
            }
        }
    },
    getLight:function(i,j){
        var posToLight=this.posToLight;
        if(posToLight===null){
            return true;
        }
        if(this.valid(i,j)){
            return posToLight[i][j];
        }else{
            console.error("position invalid at wrong place")
        }
        
    },
    // }}}
    
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
