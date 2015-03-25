module.exports=function(env){
    var gBattle=env.gBattle=env.gBattle||{};
    gBattle.BaseEvent=gUtil.Class.extend({
        constructor:function(aDict){
            var self=this;
            _.each(aDict,function(v,k){
                self[k]=v;
            });
        }
    });
    gBattle.PosMoveEvent=gBattle.BaseEvent.extend({
        srcPos:{
            i:null,
            j:null
        },
        dstPos:{
            i:null,
            j:null
        },
        toMessage:function(){
            return new gMessage.SCPosMove(this);
        }
    });
};
