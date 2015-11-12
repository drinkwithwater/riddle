module.exports=function(env){
    var gEvent=env.gEvent=env.gEvent||{};
    gEvent.BaseEvent=gUtil.Class.extend({
        constructor:function(aDict){
            this.type=this.type;
            var self=this;
            _.each(aDict,function(v,k){
                self[k]=v;
            });
        },
        isInstance:function(obj){
            if(obj.type){
                return obj.type==this.type;
            }
            return false;
        }
    });
    gEvent.eventClassDict={}
    gEvent.eventImpl=function(props,staticProps){
        var aEventClass=gEvent.BaseEvent.extend(props,staticProps);
        if(props.type){
            gEvent.eventClassDict[props.type]=aEventClass;
        }else{
            console.warn("a event class define without type");
        }
        return aEventClass;
    }
    gEvent.createFromMessageItem=function(item){
        //TODO type error deal
        var EventClass=gEvent.eventClassDict[item.type];
        return new EventClass(item);
    };
    gEvent.PosMoveEvent=gEvent.eventImpl({
        type:"pos_move",
        unitId:null,
        srcPos:null,
        dstPos:null,
    });
    gEvent.UnitAttackEvent=gEvent.eventImpl({
        type:"unit_attack",
        unitId:null,
        unitPos:null,
        targetPos:null,
    });
    gEvent.UnitRangeAttackEvent=gEvent.eventImpl({
        type:"unit_range_attack",
        unitId:null,
        unitPos:null,
        targetPosArray:null,
    });
    gEvent.UnitHarmEvent=gEvent.eventImpl({
        type:"unit_harm",
        unitId:null,
        unitPos:null,
        targetPos:null,
    });
    gEvent.UnitDieEvent=gEvent.eventImpl({
        type:"unit_die",
        unitId:null,
        unitPos:null,
    });
    gEvent.AttrSetEvent=gEvent.eventImpl({
        type:"attr_set",
        unitId:null,
        unitPos:null,
        attrSet:{
            key:null,
            value:null
        }
    });
    gEvent.BattleWin=gEvent.eventImpl({
        type:"battle_win",
    });
    gEvent.UnitTurnEvent=gEvent.eventImpl({
        type:"unit_turn",
        unitId:null,
        direct:{
            i:null,
            j:null
        }
    });
};
