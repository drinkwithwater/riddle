var gUI=gUI||{};
var resultSth;
gUI.SimpleActionHandler=gUtil.Class.extend({
    battle:null,
    constructor:function(battleField){
        gUtil.Class.apply(this,arguments);
	    this.battle=battleField;
    },
    onPathing:function(path){
        var result=this.battle.onPosPathing(path);
        resultSth=result;
        console.log("pathing result : "+JSON.stringify(result));
    }
});
