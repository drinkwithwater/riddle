var gUI=gUI||{};
gUI.SimpleActionHandler=gUtil.Class.extend({
  battle:null,
  constructor:function(battleField){
        gUtil.Class.apply(this,arguments);
	this.battle=battleField;
  },
  onPathing:function(path){
      this.battle.onPosPathing(path);
  }
});
