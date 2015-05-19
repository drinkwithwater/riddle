var gUI=gUI||{};
var gTemplates=gTemplates||{};
gUI.FrontendModule=gUtil.Class.extend({
    clientModule:null,
    modelManager:null,
    viewManager:null,

    gameTop:null,

    name:"frontendModule",
    init:function(gameTop){
        if(gameTop){
	        this.clientModule=gameTop.getModule("clientModule");
	        this.modelManager=gameTop.getModule("modelModule");
	        this.viewManager=gameTop.getModule("viewModule");
	        this.clientModule.addListener(this);
            this.gameTop=gameTop;
        }
    },
    start:function(gameTop){
    },


    viewPathing:function(path){
        var msg=new gMessage.CSPathing({
            path:path
        });
        this.clientModule.sendMessage(msg);
    },
    viewStart:function(scriptName){
        var msg=new gMessage.CSStart({
            scriptName:scriptName
        });
        this.clientModule.sendMessage(msg);
    },
    
    onMessage:function(message){
        var handlerFunc=this[this.messageHandlers[message.type]];
        if(handlerFunc){
            handlerFunc.call(this,message);
        }else{
		    console.error("message type no handler: "+message.type);
        }
    },
    messageHandlers:{
        "start_script":"messageStartScript",
        "show_event_array":"messageShowEventArray"
    },
    messageStartScript:function(message){
        var scriptName=message.scriptName;
        if(typeof(scriptName)=="string"){
            this.modelManager.destroy();
            this.viewManager.destroy();
            this.modelManager.createFromScriptName(scriptName);
            this.viewManager.reRender();
        }else{
            //TODO
            //init battle from many data;
            //or used for recover battle;
        }
    },
    messageShowEventArray:function(message){
        var thisVar=this;
        //TODO change message to event
        _.each(message.eventArray,function(showEvent){
            thisVar.modelManager.onBattleEvent(showEvent);
        });
    },
});
