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
    this.clientModule=core.getModule("clientModule");
  },
  recvMessage:function(session,message){
  	console.debug("server recv to:"+session.id+",message:"+JSON.stringify(message));
  	var thisVar=this;
  	_.each(this.listeners,function(listener){
  		listener.onMessage(session,message);
  	});
  },
  sendMessage:function(session,message){
  	console.debug("server send to:"+session.id+",message:"+JSON.stringify(message));
    if(session.id==0){
      this.clientModule.recvMessage(message);
    }else{
      console.error("sendMessage exception:session error");
    }
  }
});
gInter.IClientListener={
  onMessage:function(message){
  }
}
gInter.IServerListener={
  onMessage:function(session,message){
  }
}
//}}}
};
