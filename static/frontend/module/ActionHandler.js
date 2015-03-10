var gUI=gUI||{};
gUI.ActionHandler=gUtil.Class.extend({
  sender:{//default simple sender
  	sendMessage:function(message){
  		console.log("send:"+JSON.stringify(message));
  		console.log("sender not impl");
  	}
  },
  constructor:function(msgSender){
        gUtil.Class.apply(this,arguments);
  	if(msgSender){
  		this.sender=msgSender;
  	}
  },
  onPathing:function(pathes){
  	this.sender.sendMessage(pathes);
  }
});
