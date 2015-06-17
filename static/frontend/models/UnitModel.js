var gModels=gModels||{}
gModels.UnitCollection=Backbone.Collection.extend({
    models:gModels.UnitModel
});
gModels.UnitModel=Backbone.Model.extend({
    defaults:{
        i:null,
        j:null,
        maxHp:4,
        hp:4,
        ap:2,
        attackRange:1,
        group:gScript.GROPU_ATTACKER,
        unitId:null
    },
    modelManager:null,
    constructor:function(){
        gModels.UnitModel.__super__.constructor.apply(this,arguments);
        if(_.isString(this.typeName)){
            var num=gScript.unitNumericalDict[this.typeName];
            if(_.isObject(num)){
                this.set(num);
                this.set("maxHp",num.hp);
            }
        }
    },
    pathingType:function(newArea,beforePath){
        var focusUnit=this.modelManager.unit$(newArea);
        if(focusUnit){
            return gUI.PATHING_TYPE_SHOOT_ATTACK;
        }else{
            return gUI.PATHING_TYPE_WALK_MOVE;
        }
    },
    canOper:function(){
        return false;
    },
    attackRange:function(){
        return [];
    },
    moveRange:function(){
        return [];
    }
});
gModels.SimpleUnitModel=gModels.UnitModel;
gModels.BaseUnitModel=gModels.UnitModel;

gModels.unitModelDict={}
gModels.unitModelImpl=function(props,staticProps){
    var aClass=gModels.BaseUnitModel.extend(props,staticProps);
    if(props.typeName){
        gModels.unitModelDict[props.typeName]=aClass;
    }else{
        console.warn("a unit class define without type name");
    }
    return aClass;
}
gModels.unitModelExtend=function(baseModel,props,staticProps){
    var aClass=baseModel.extend(props,staticProps);
    if(props.typeName){
        gModels.unitModelDict[props.typeName]=aClass;
    }else{
        console.warn("a unit class define without type name");
    }
    return aClass;
}
