module.exports=function(env){
///{{{
var gInter=env.gInter=env.gInter||{};
gInter.ServerModule=gUtil.Class.extend({
  // module 
  name:"serverModule",
  init:function(){
  },
  start:function(){
  },
  
  //service
  listeners:[],
  addListener:function(listener){
    this.listeners.push(listener);
  },
  recvMessage:function(session,message){
  },
  sendMessage:function(session,message){
  }
});
gInter.LocalServerModule=gInter.ServerModule.extend({
  clientModule:null,
  init:function(core){
    this.clientModule=core.getService("clientModule");
  },
  recvMessage:function(session,message){
  	var thisVar=this;
  	_.each(this.listener,function(){
  		thisVar.listener[i].onMessage(message);
  	});
  },
  sendMessage:function(session,message){
    this.clientModule.recvMessage(message);
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
//}}}
};
