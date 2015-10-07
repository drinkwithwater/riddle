var gViews=gViews||{};
gViews.Action=gUtil.Class.extend({
    sprite:"sprite",
    action:"ccAction",
    move:true,
    constructor:function(sprite,action,move){
        gViews.Action.__super__.constructor.call(this);
        this.sprite=sprite;
        this.action=action
        this.move=move;
    },
    run:function(selector,selectorTarget,data){
        //TODO check sprite exist
        var action=this.action;
        if(_.isFunction(selector)){
            this.sprite.runAction(cc.sequence(
                action,
                cc.callFunc(selector,selectorTarget,data)
            ));
        }else{
            this.sprite.runAction(action);
        }
    },
    isMove:function(){
        return this.move;
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
        this.queue[++this.endIndex]=action;
    },
    dequeue:function(){
        if(!this.isEmpty()){
            var re=this.queue[this.beginIndex];
            delete this.queue[this.beginIndex]
            this.beginIndex++;
            return re;
        }
    },
    run:function(){
        if(!this.isEmpty()){
            var action=this.dequeue();
            if(action.isMove()){
                action.run(this.run,this);
            }else{
                action.run();
                this.run();
            }
        }
    },
    isEmpty:function(){
        return !(this.endIndex>=this.beginIndex);
    }
});