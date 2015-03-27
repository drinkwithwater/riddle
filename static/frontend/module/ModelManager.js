var gUI=gUI||{};
gUI.ModelManager=gUtil.Class.extend({

    name:"modelModule",
    mazeModel:null,
    unitCollection:null,
    frontendModule:null,
    viewManager:null,
    posToUnit:null,
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
        this.mazeModel=new gModels.MazeModel({
            iLength:battleScript.iLength,
            jLength:battleScript.jLength
        });
        this.unitCollection=new gModels.UnitCollection();
        this.posToUnit=new Array(iLength);
        for(var i=0;i<iLength;i++){
            this.posToUnit[i]=new Array(jLength);
            for(var j=0;j<jLength;j++){
                var unitCode=unitArray[i][j];
                if(unitCode!=0){
                    var unitId=gScript.createCommonId(i,j);
                    var tempUnit=new gModels.UnitModel({
                        unitId:unitId,
                        i:i,
                        j:j
                    });
                    this.unitCollection.add(tempUnit);
                    this.posToUnit[i][j]=tempUnit;
                }
            }
        }
    },

    eventHandlers:{
        "pos_move":"eventPosMove"
    },

    onBattleEvent:function(battleEvent){
        var handlerFunc=this[this.eventHandlers[battleEvent.type]];
        if(handlerFunc){
            handlerFunc.call(this,battleEvent);
        }else{
		    console.error("battle type no handler: "+battleEvent.type);
        }
    },
    eventPosMove:function(posMoveEvent){
        var srcPos=posMoveEvent.srcPos;
        var dstPos=posMoveEvent.dstPos;
        var moveUnit=this.posToUnit[srcPos.i][srcPos.j];
        delete this.posToUnit[srcPos.i][srcPos.j];
        this.posToUnit[dstPos.i][dstPos.j]=moveUnit;
        this.viewManager.animatePosMove(
            srcPos,
            dstPos,
            function(){
                //call back: set model
                moveUnit.set("i",dstPos.i)
                moveUnit.set("j",dstPos.j)
            }
        );
    },
    destroy:function(){
    }
});
