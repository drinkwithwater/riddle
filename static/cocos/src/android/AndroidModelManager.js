var gUI=gUI||{};
gUI.IViewCallModel=new gUtil.Interface({
    unit$:"",
    maze$:""
});
gUI.ModelManager=gUtil.Class.extend({

    name:"modelModule",
    frontendModule:null,
    viewManager:null,

    // component
    mazeModel:null,
    unitCollection:null,
    // unitId to unit
    unitDict:null,
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.frontendModule=gameTop.getModule("frontendModule");
            this.viewManager=gameTop.getModule("viewModule");
        }

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
        // set modelManager to this
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
            if(_.isObject(arg0)){
                return this.mazeModel.getUnit(arg0.i,arg0.j);
            }else if(_.isString(arg0)){
                return this.unitDict[unitId];
            }else if(_.isNumber(arg0)){
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
        "battle_win":"eventBattleWin",
        "pos_move":"eventPosMove",
        "unit_attack":"eventUnitAttack",
        "unit_harm":"eventUnitHarm",
        "unit_die":"eventUnitDie",
        "attr_set":"eventAttrSet",
    },

    onBattleEventArray:function(eventArray){
        for(var i=0,l=eventArray.length;i<l;i++){
            this.onBattleEvent(eventArray[i]);
        }
        var spritePool=this.viewManager.getSpritePool().run();
    },
    onBattleEvent:function(battleEvent){
        var handlerFunc=this[this.eventHandlers[battleEvent.type]];
        if(handlerFunc){
            handlerFunc.call(this,battleEvent);
        }else{
		    console.error("battle type no handler: "+battleEvent.type);
        }
    },
    eventBattleWin:function(battleWinEvent,callback){
        alert("You Win !!");
        if(typeof(callback)=="function"){
            callback();
        }
    },
    eventPosMove:function(posMoveEvent,callback){
        var srcPos=posMoveEvent.srcPos;
        var dstPos=posMoveEvent.dstPos;
        var unitId=posMoveEvent.unitId;
        var moveUnit=this.posToUnit[srcPos.i][srcPos.j];
        var viewManager=this.viewManager;
        delete this.posToUnit[srcPos.i][srcPos.j];
        this.posToUnit[dstPos.i][dstPos.j]=moveUnit;
        moveUnit.set("i",dstPos.i);
        moveUnit.set("j",dstPos.j);
        this.mazeModel.openLight(
            dstPos,
            moveUnit.get("attackRange"),
            function(pos){
                viewManager.moveLight(pos);
        });
        var spritePool=this.viewManager.getSpritePool();
        spritePool.actionIdMove(
            unitId,
            dstPos,
            function(){
                //call back: set model
                viewManager.refreshTriggerRange();
            }
        );
    },
    eventUnitAttack:function(unitAttackEvent,callback){
        var unitPos=unitAttackEvent.unitPos;
        var targetPos=unitAttackEvent.targetPos;
        this.viewManager.animateBulletMove(unitPos,targetPos,callback);
    },
    eventUnitHarm:function(unitHarmEvent,callback){
        var targetPos=unitHarmEvent.targetPos;
        this.viewManager.animateHarm(targetPos,callback);
    },
    eventUnitDie:function(unitDieEvent,callback){
        var unitPos=unitDieEvent.unitPos;
        var unit=this.unit$(unitPos);
        // remove unit from 3 items
        this.unitCollection.remove(unit)
        delete this.unitDict[unit.get("unitId")];
        this.mazeModel.removeUnit(unit);
        this.viewManager.refreshTriggerRange();
        this.viewManager.animateUnitDie(unitPos,callback);
    },
    eventAttrSet:function(attrSetEvent,callback){
        var unit=this.unit$(attrSetEvent.unitPos);
        var attr=attrSetEvent.attrSet;
        if(unit) unit.set(attr.key,attr.value);
        if(typeof(callback)=="function"){
            callback();
        }
    },
    destroy:function(){
    }
});
