//dependence:underscore
var module=module||{
	set exports(func){
	func(window); 
}};//web module define in this;
module.exports=function(env){
	var gUtil=env.gUtil=env.gUtil||{};
	var Class=gUtil.Class=function(){
	}
	//copy from backbone.js
	var extend = function(protoProps, staticProps) {
		var parent = this;
		var cls;

		// The constructor function for the new subclass is either defined by you
		// (the "constructor" property in your `extend` definition), or defaulted
		// by us to simply call the parent's constructor.
		if (protoProps && _.has(protoProps, 'constructor')) {
			cls = protoProps.constructor;
		} else {
			cls = function(){ return parent.apply(this, arguments); };
		}

		// Add static properties to the constructor function, if supplied.
		_.extend(cls, parent, staticProps);

		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function.
		var ClsProto = function(){ this.constructor = cls; };
		ClsProto.prototype = parent.prototype;
		cls.prototype = new ClsProto;

		// Add prototype properties (instance properties) to the subclass,
		// if supplied.
		if (protoProps) _.extend(cls.prototype, protoProps);

		// Set a convenience property in case the parent's prototype is needed
		// later.
		cls.__super__ = parent.prototype;

		return cls;
	};
	Class.extend=extend;
	var Message=gUtil.Message=function(){
	}
	Message.impl=function(protoProps){
		var msg=function(){
			var thisVar=this;
			_.each(protoProps,function(v,k){
				thisVar[k]=v;
			});
			if(_.has(protoProps,"constructor")){
				protoProps.constructor.apply(thisVar,arguments);
			}else{
				if(typeof(arguments[0])=="object"){
                    _.each(arguments[0],function(v,k){
                        thisVar[k]=v;
                    });
				}
			}
		}
		return msg;
	}
}


