var gUI=gUI||{};
gUI.IViewCallModel=new gUtil.Interface({
    unit$:"",
    maze$:""
});
gUI.ModelManager=gUtil.Class.extend({

    name:"modelModule",
    frontendModule:null,
    viewManager:null,

    //component
    mazeModel:null,
    unitCollection:null,
    unitDict:null,
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.frontendModule=gameTop.getModule("frontendModule");
            this.viewManager=gameTop.getModule("viewModule");
        }

        this.createFromScriptName("default");
    },

    start:function(gameTop){
    },

    createFromScriptName:function(scriptName){
        var aDict=gModels.createFromScriptName(scriptName);
        this.mazeModel=aDict.mazeModel;
        this.unitDict=aDict.unitDict;
        this.unitCollection=aDict.unitCollection;
        this.posToUnit=this.mazeModel.posToUnit;
        var thisVar=this;
        _.each(this.unitCollection.models,function(unitModel){
            unitModel.modelManager=thisVar;
        });
        this.mazeModel.modelManager=thisVar;
    },


    
    //get by id or i,j or pos
    unit$:function(){
        if(arguments.length==0){
            return this.unitCollection.models;
        }else if(arguments.length==1){
            var arg0=arguments[0];
            if(typeof(arg0)=="object"){
                return  this.mazeModel.getUnit(arg0.i,arg0.j);
            }else if(typeof(arg0)=="string"){
                return this.unitDict[unitId];
            }else if(typeof(arg0)=="number"){
                return this.unitDict[unitId];
            }
        }else if(arguments.length==2){
            return this.mazeModel.getUnit(arguments[0],arguments[1]);
        }
    },
    maze$:function(){
        return this.mazeModel;
    },


    eventHandlers:{
        "pos_move":"eventPosMove",
        "unit_attack":"eventUnitAttack",
        "attr_set":"eventAttrSet",
    },

    onBattleEvent:function(battleEvent,callback){
        var handlerFunc=this[this.eventHandlers[battleEvent.type]];
        if(handlerFunc){
            handlerFunc.call(this,battleEvent,callback);
        }else{
		    console.error("battle type no handler: "+battleEvent.type);
        }
    },
    eventPosMove:function(posMoveEvent,callback){
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
                if(typeof(callback)=="function"){
                    callback();
                }
            }
        );
    },
    eventUnitAttack:function(unitAttackEvent,callback){
        var unitPos=unitAttackEvent.unitPos;
        var targetPos=unitAttackEvent.targetPos;
        this.viewManager.animateBulletMove(unitPos,targetPos,callback);
    },
    eventAttrSet:function(attrSetEvent,callback){
        var unit=this.unit$(attrSetEvent.unitPos);
        var attr=attrSetEvent.attrSet;
        unit.set(attr.key,attr.value);
        if(typeof(callback)=="function"){
            callback();
        }
    },
    destroy:function(){
    }
});
