var gInter=gInter||{};
gInter.ClientService=gUtil.Class.extend({
  listeners:[],
  addListener:function(listener){
    this.listeners.push(listener);
  },
  sendMessage:function(message){
  }
});
gInter.LocalClientModule=gInter.ClientSerivce.extend({
  serverModule:null,
  init:function(core){
    this.serverModule=core.getService("server");
  },
  recvMessage:function(message){
    for(var i=0,length=listeners.length;i<length;i++){
      listeners[i].onMessage(message);
    }
  },
  sendMessage:function(message){
    this.serverModule.recvMessage(message);
  }
});
gInter.WebClientModule=gInter.ClientSerivce.extend({
  init:function(core){
  },
  recvMessage:function(message){
    for(var i=0,length=listeners.length;i<length;i++){
      listeners[i].onMessage(message);
    }
  },
  sendMessage:function(message){
    var thisVar=this;
    $.post(gConfig.SERVER_URL,JSON.stringify(message),function(response){
      if(response.readyState==4 && response.status==200){
        thisVar.recvMessage(JSON.parse(response.responseText));
      }else{
        console.log("network error");
      }
    });
  }
});
gInter.IListener={
  listenMessages:{
  },
  onMessage:function(message){
    if(message.type){
      var func=this[this.listenMessages[message.type]];
      if(func){
        func.call(this,message);
      }
    }
  }
}
