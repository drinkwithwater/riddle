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
    gEvent.typeToClassName={
        "pos_move":"PosMoveEvent",
    }
    gEvent.createFromMessageItem=function(item){
        //TODO type error deal
        var EventClass=gEvent[typeToClassName[json.type]];
        return new EventClass(item);
    }
    gEvent.PosMoveEvent=gEvent.BaseEvent.extend({
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
