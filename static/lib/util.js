//dependence:underscore
var module=module||{
    set exports(func){
        func(window);
    }
};//consistent module importing in local & web
module.exports=function(env){
    var gUtil=env.gUtil=env.gUtil||{};
    var Class=gUtil.Class=function(){
        this._id=_.uniqueId();
    }
    //copy from backbone.js
    var classExtend = function(protoProps, staticProps) {
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
    Class.extend=classExtend;
    var Message=gUtil.Message=function(aDict){
        var thisVar=this;
        if(aDict){
            _.each(aDict,function(v,k){
                thisVar[k]=v;
            });
        }
    }
    var messageExtend=function(protoProps){
        var BaseMessage=this;
        var msg=function(){
            var thisVar=this;
            _.each(protoProps,function(v,k){
                thisVar[k]=v;
            });
            _.each(new BaseMessage(),function(v,k){
                thisVar[k]=v;
            });
            if(_.has(protoProps,"constructor")){
                protoProps.constructor.apply(thisVar,arguments);
            }else{
                Message.apply(this,arguments);
            }
        }
        msg.extend=messageExtend;
        return msg;
    }
    Message.extend=messageExtend;
}


