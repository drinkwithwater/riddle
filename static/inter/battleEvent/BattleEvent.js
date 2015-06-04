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
        srcPos:{
            i:null,
            j:null
        },
        dstPos:{
            i:null,
            j:null
        },
    });
    gEvent.UnitAttackEvent=gEvent.eventImpl({
        type:"unit_attack",
        unitPos:{
            i:null,
            j:null
        },
        targetPos:{
            i:null,
            j:null
        },
    });
    gEvent.UnitHarmEvent=gEvent.eventImpl({
        type:"unit_harm",
        unitPos:{
            i:null,
            j:null
        },
        targetPos:{
            i:null,
            j:null
        },
    });
    gEvent.UnitDieEvent=gEvent.eventImpl({
        type:"unit_die",
        unitPos:{
            i:null,
            j:null
        }
    });
    gEvent.AttrSetEvent=gEvent.eventImpl({
        type:"attr_set",
        unitPos:{
            i:null,
            j:null
        },
        attrSet:{}
    });
};
