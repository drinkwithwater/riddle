module.exports=function(env){
    var gEvent=env.gEvent=env.gEvent||{};
    gEvent.BaseEvent=gUtil.Class.extend({
        constructor:function(aDict){
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
            gModels.unitModelDict[props.type]=aEventClass;
        }else{
            console.warn("a event class define without type");
        }
        return aEventClass;
    }
    gEvent.createFromMessageItem=function(item){
        //TODO type error deal
        var EventClass=gEvent.eventClassDict[json.type];
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
};
