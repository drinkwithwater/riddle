var gUI=gUI||{};
gUI.ModelManager=gUtil.Class.extend({

    name:"modelModule",
    boardModel:null,
    cellCollection:null,
    frontendModule:null,
    viewManager:null,
    posToCell:null,
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
        this.posToCell=new Array(iLength);
        for(var i=0;i<iLength;i++){
            this.posToCell[i]=new Array(jLength);
            for(var j=0;j<jLength;j++){
                var unitCode=unitArray[i][j];
                if(unitCode!=0){
                    var tempCell=new gModels.CellModel({i:i,j:j});
                    this.cellCollection.add(tempCell);
                    this.posToCell[i][j]=tempCell;
                }
            }
        }
    },

    onBattleEvent:function(battleEvent){
        if(battleEvent.type=="pos_move"){
            var srcPos=battleEvent.srcPos;
            var dstPos=battleEvent.dstPos;
            var moveCell=this.posToCell[srcPos.i][srcPos.j];
            delete this.posToCell[srcPos.i][srcPos.j];
            this.posToCell[dstPos.i][dstPos.j]=moveCell;
            this.viewManager.animatePosMove(
                battleEvent.srcPos,
                battleEvent.dstPos,
                function(){
                    //call back: set model
                    moveCell.set("i",dstPos.i)
                    moveCell.set("j",dstPos.j)
                }
            );
        }else{
		    console.error("message type no handler: "+message.type);
        }
    },
    destroy:function(){
    }
});
