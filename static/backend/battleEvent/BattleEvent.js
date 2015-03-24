module.exports=function(env){
    var gBattle=env.gBattle=env.gBattle||{};
    gBattle.BaseEvent=gUtil.Class.extend({
        type:"base"
    });
    gBattle.MoveEvent=gUtil.Class.extend({
        type:"move",
        srcPos:{},
        dstPos:{},
    });
};
