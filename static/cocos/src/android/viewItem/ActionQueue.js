var gViews=gViews||{};
gViews.Action=gUtil.Class.extend({
    sprite:"sprite",
    action:"ccAction",
    constructor:function(sprite,action){
        gViews.Action.__super__.constructor.call(this);
        this.sprite=sprite;
        this.action=action
        this.action.retain();
    },
    run:function(selector,selectorTarget){
        //TODO check sprite exist
        var action=this.action;
        if(_.isFunction(selector)){
            this.sprite.runAction(cc.sequence(
                action,
                cc.callFunc(selector,selectorTarget)
            ));
        }else{
            this.sprite.runAction(action);
        }
        action.release();
    },
});
gViews.ActionList=gUtil.Class.extend({
    actionList:"list",
    constructor:function(list){
        gViews.ActionList.__super__.constructor.call(this);
        this.actionList=list||[];
    },
    run:function(selector,selectorTarget){
        //TODO check sprite exist
        var actionList=this.actionList;
        for(var i=0,l=actionList.length;i<l;i++){
            var actionItem=actionList[i];
            if(i==0 && _.isFunction(selector)){
                actionItem.sprite.runAction(cc.sequence(
                    actionItem.action,
                    cc.callFunc(selector,selectorTarget)
                ));
            }else{
                actionItem.sprite.runAction(actionItem.action);
            }
            actionItem.action.release();
        }
    },
    push:function(action){
        action.retain();
        this.actionList.push(action);
    }
});
// data:{1:[headAction1,nodeAction1,nodeAction2],2:[headAction1],...}
gViews.ActionQueue=gUtil.Class.extend({
    queue:"dict",
    beginIndex:0,
    endIndex:-1,
    constructor:function(){
        gViews.ActionQueue.__super__.constructor.call(this);
        this.queue={};
        this.beginIndex=0;
        this.endIndex=-1;
    },
    enqueue:function(action){
        this.endIndex++;
        this.queue[this.endIndex]=action;
    },
    dequeue:function(){
        if(!this.isEmpty()){
            var re=this.queue[this.beginIndex];
            this.queue[this.beginIndex]=null;
            this.beginIndex++;
            return re;
        }
    },
    run:function(){
        var self=this;
        if(!this.isEmpty()){
            var action=this.dequeue();
            action.run(function(){
                self.run();
            });
        }
    },
    isEmpty:function(){
        return !(this.endIndex>=this.beginIndex);
    }
});