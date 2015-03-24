module.exports=function(env){
  ///{{{
  var gInter=env.gInter=env.gInter||{};
  gInter.ClientModule=gUtil.Class.extend({
    // module
    name:"clientModule",
    init:function(){
    },
    start:function(){
    },

    //service
    listeners:[],
    addListener:function(listener){
      this.listeners.push(listener);
    },
    recvMessage:function(message){
    },
    sendMessage:function(message){
    }
  });
  gInter.LocalClientModule=gInter.ClientModule.extend({
    serverModule:null,
    init:function(core){
      this.serverModule=core.getModule("serverModule");
    },
    start:function(core){
    },
    recvMessage:function(message){
      var thisVar=this;
      _.each(this.listeners,function(listener){
        listener.onMessage(message);
      });
    },
    sendMessage:function(message){
      this.serverModule.recvMessage({id:0},message);
    }
  });
  gInter.WebClientModule=gInter.ClientModule.extend({
    init:function(core){
    },
    start:function(core){
    },
    recvMessage:function(message){
      var thisVar=this;
      _.each(this.listeners,function(listener){
        listener.onMessage(message);
      });
    },
    sendMessage:function(message){
      var thisVar=this;
      $.post(gConfig.SERVER_URL,JSON.stringify(message),function(responseText){
        thisVar.recvMessage(JSON.parse(responseText));
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
  };

  //}}}
};
