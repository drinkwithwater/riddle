var gUI=gUI||{};
gUI.SimpleActionHandler=gUtil.Class.extend({
  battle:null,
  constructor:function(battleField){
        gUtil.Class.apply(this,arguments);
  	if(msgSender){
  		this.battle=battleField;
  	}
  },
  onPathing:function(path){
      this.battle.onPlayerMove(path);
  }
});
