module.exports=function(env){
    var gBattle=env.gBattle=env.gBattle||{};
    gBattle.BaseEvent=gUtil.Class.extend({
        type:"base",
        constructor:function(aDict){
            var self=this;
            _.each(aDict,function(v,k){
                self[k]=v;
            });
        }
    });
    gBattle.PosMoveEvent=gBattle.BaseEvent.extend({
        type:"move",
        srcPos:{},
        dstPos:{},
    });
};
