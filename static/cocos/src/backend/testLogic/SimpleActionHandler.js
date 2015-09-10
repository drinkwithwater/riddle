var gUI=gUI||{};
gUI.SimpleActionHandler=gUtil.Class.extend({
    battle:null,
    constructor:function(battleField){
        gUtil.Class.apply(this,arguments);
	    this.battle=battleField;
    },
    onPathing:function(path){
        var result=this.battle.onPosPathing(path);
        console.log("pathing result : "+JSON.stringify(result));
    }
});
