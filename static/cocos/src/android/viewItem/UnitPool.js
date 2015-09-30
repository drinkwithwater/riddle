var gViews=gViews||{};
gViews.Action=gUtil.Class.extend({
    sprite:"sprite",
    actionCreate:"cc.action",
    actionArgs:"list",
    move:true,
    constructor:function(sprite,actionCreate,actionArgs){
        gViews.Action.__super__.constructor.call(this);
        this.sprite=sprite;
        this.actionCreate=actionCreate;
        this.actionArgs=actionArgs;
        this.move=(actionCreate==cc.moveTo||actionCreate==cc.moveBy);
    },
    run:function(selector,selectorTarget,data){
        //TODO check sprite exist
        var action=this.actionCreate.apply(cc,this.actionArgs);
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
gViews.UnitPool = gUtil.Class.extend({
    idToSprite:null,
    ijToSprite:null,
    gameLayer:null,
    actionQueue:null,
    moveSpeed:0.05,
    gameTop:null,
    constructor:function(gameLayer,gameTop){
        gViews.UnitPool.__super__.constructor.call(this);
        this.gameLayer=gameLayer;
        this.gameTop=gameTop;
        this.idToSprite={};
        this.ijToSprite=[];
        this.actionQueue=new gViews.ActionQueue();
    },
    createUnitView:function(unitModel){
        var layer=this.gameLayer;
        var i=unitModel.get("i");
        var j=unitModel.get("j");
        var id=unitModel.get("unitId");
        var pos=layer.pCenter(i,j);
        var sprite=new gViews.UnitView(id,this.gameTop);
        sprite.attr({
            x:pos.x,
            y:pos.y,
            anchorX:0.5,
            anchorY:0.5,
        });
        this.idToSprite[id]=sprite;
        if(!_.isArray(this.ijToSprite[i])){
            this.ijToSprite[i]=[];
        }
        this.ijToSprite[i][j]=sprite;
        return sprite;
    },
    deleteSprite:function(){
        console.log("delete operation not implement");
    },
    sprite$:function(i,j){
        if(arguments.length==2){
            if(_.isNumber(i)&&_.isNumber(j)){
                if(_.isArray(this.ijToSprite[i])){
                    return this.ijToSprite[i][j];
                }
                return undefined;
            }
            return undefined;
        }else if(arguments.length==1){
            if(_.isString(i)){
                return this.idToSprite[i];
            }
            return undefined;
        }
        return undefined;
    },
    // direct call by model manager
    actionIdMove:function(unitId,dstIJ,callback){
        //TODO do callback
        var dstPoint=this.gameLayer.pCenter(dstIJ.i,dstIJ.j);
        var sprite=this.idToSprite[unitId];
        if(_.isObject(sprite)){
            var action=new gViews.Action(sprite,cc.moveTo,[this.moveSpeed,dstPoint]);
            this.actionQueue.enqueue(action);
        }else{
            console.log(unitId);
            console.error("sprite with unitId not object");
        }
    },
    run:function(){
        this.actionQueue.run();
    }
});

