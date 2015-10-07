var gViews=gViews||{};
gViews.UnitPool = cc.Node.extend({
    idToSprite:null,
    ijToSprite:null,
    gameLayer:null,
    moveSpeed:0.05,
    gameTop:null,
    modelManager:null,
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        this.gameTop=gameTop;
        this.modelManager=gameTop.getModule("modelModule");
        this.idToSprite={};
        this.ijToSprite=[];
    },
    render:function(){
        _.each(this.modelManager.unit$(),function(v,k){
            var unit=this.createUnitView(v);
            this.addChild(unit);
        },this);
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
            var action=new gViews.Action(sprite,cc.moveTo(this.moveSpeed,dstPoint),true);
            this.gameLayer.actionQueue.enqueue(action);
        }else{
            console.log(unitId);
            console.error("sprite with unitId not object");
        }
    },
    actionIdRemove:function(unitId){
    },
});

