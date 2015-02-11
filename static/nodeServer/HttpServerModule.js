module.exports=function(env){
///{{{
var gInter=env.gInter=env.gInter||{}
var http=require("http");
var url=require("url");
var util=require("util");
gInter.HttpServerModule=gInter.ServerModule.extend({
	httpServer:null,
	cidBuffer:{},
	init:function(){
		this.httpServer=new http.Server();
	},
	start:function(){
		var thisVar=this;
        server.on("request",function(req,res){
          console.log(req.url);
          var messageStr="";
          var session={res:res,sendMessage:{},cid:null};
          req.on("data",function(chunk){
          	messageStr+=chunk.toString();
          });
          req.on("end",function(){
          	console.log(messageStr);
          	var message=JSON.parse(messageStr);
          	if(!session.cid){
	          	session.cid=message.cid;
          	}
          	thisVar.recvMessage(session,message);
            //flush buffer
			if(session.cid){
				 var aBuffer =(buffer[session.cid]||[]);
	             var res=session.res;
	             res.writeHead(200,{
	               'Content-Type':'text/html:charset=UTF-8',
	               'Access-Control-Allow-Methods':'POST',
	               'Access-Control-Allow-Origin':'*'
	             });
	             res.write(JSON.stringify(aBuffer));
	             res.end();
	             delete aBuffer[session.cid];
			}
          });
        });
        server.listen(gConfig.SERVER_PORT);
	},
	recvMessage:function(session,message){
        _.each(this.listeners,function(listener){
        	listener.onMessage(session,message);
        });
	},
	sendMessage:function(session,message){
		var buffer=this.cidBuffer;
		var aBuffer =(buffer[session.cid]||[]);
		if(message){
            aBuffer.push(message)
		}
		buffer[session.cid]=aBuffer;
	}
});

//}}}
};