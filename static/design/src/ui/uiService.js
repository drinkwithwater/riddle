var g_ui=g_ui||{};
g_ui.UIService=function(){
	var logicService=null;
	//
	this.init=function(context){
		logicService=context.getService("logic");
	};
	this.triggerAction=function(){
	}
}
