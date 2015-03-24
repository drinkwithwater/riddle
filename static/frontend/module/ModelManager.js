var gUI=gUI||{};
gUI.ModelManager=gUtil.Class.extend({

    name:"modelModule",
    boardModel:null,
    cellCollection:null,
    frontendModule:null,
    viewManager:null,
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.frontendModule=gameTop.getModule("frontendModule");
            this.viewManager=gameTop.getModule("viewModule");
        }
        /*
        this.boardModel=new gModels.BoardModel();
        this.cellCollection=new gModels.CellCollection();*/
        this.startByScriptName("default");
    },
    start:function(gameTop){
    },
    startByScriptName:function(scriptName){
        var battleScript=gScript.battleScript[scriptName];
        var iLength=battleScript.iLength;
        var jLength=battleScript.jLength;
        var unitArray=battleScript.unitArray;
        this.boardModel=new gModels.BoardModel({
            iLength:battleScript.iLength,
            jLength:battleScript.jLength
        });
        this.cellCollection=new gModels.CellCollection();
        for(var i=0;i<iLength;i++){
            for(var j=0;j<jLength;j++){
                var unitCode=unitArray[i][j];
                if(unitCode!=0){
                    var tempCell=new gModels.CellModel({i:i,j:j});
                    this.cellCollection.add(tempCell);
                }
            }
        }
        console.log(this.cellCollection);
    },


    
    onMessage:function(message){
    },
    destroy:function(){
    }
});
