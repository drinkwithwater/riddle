var gViews=gViews||{};
gViews.UnitPool = cc.Node.extend({
    idToSprite:null,
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
    },
    render:function(){
        this.destroy();
        _.each(this.modelManager.unit$(),function(v,k){
            var unit=this.createUnitView(v);
            this.addChild(unit);
        },this);
    },
    destroy:function(){
        this.idToSprite={};
        this.removeAllChildren(true);
    },
    createUnitView:function(unitModel){
        var layer=this.gameLayer;
        var i=unitModel.get("i");
        var j=unitModel.get("j");
        var id=unitModel.get("unitId");
        var hp=unitModel.get("hp");
        var maxHp=unitModel.get("maxHp");
        var pos=layer.pCenter(i,j);
        var unit=new gViews.UnitView(id,this.gameTop);
        unit.attr({
            x:pos.x,
            y:pos.y,
            anchorX:0.5,
            anchorY:0.5,
        });
        unit.setHp(hp);
        unit.setMaxHp(maxHp);
        this.idToSprite[id]=unit;
        return unit;
    },
    deleteUnit:function(unitId){
        var unit=this.idToSprite[unitId];
        delete this.idToSprite[unitId];
        unit.gameTop=null;
        unit.unitModel=null;
        unit.unitPool=null;
    },
    sprite$:function(i,j){
        if(arguments.length==1){
            if(_.isString(i)){
                return this.idToSprite[i];
            }
            return undefined;
        }
        return undefined;
    },
    // direct call by model manager
    actionIdMove:function(unitId,dstIJ){
        //TODO do callback
        var dstPoint=this.gameLayer.pCenter(dstIJ.i,dstIJ.j);
        var unit=this.idToSprite[unitId];
        if(_.isObject(unit)){
            var action=new gViews.Action(unit,cc.moveTo(this.moveSpeed,dstPoint));
            this.gameLayer.actionQueue.enqueue(action);
        }else{
            console.log(unitId);
            console.error("unit with unitId not object");
        }
    },
    actionIdRemove:function(unitId){
        var unit=this.idToSprite[unitId];
        var unitPool=this;
        if(_.isObject(unit)){
            var action=new gViews.Action(unit,cc.callFunc(function(){
                unit.removeFromParent();
                unitPool.deleteUnit(unitId);
            }));
            this.gameLayer.actionQueue.enqueue(action);
        }else{
            console.log(unitId);
            console.error("unit with unitId not object");
        }
    },
    actionAttrSet:function(unitId,key,value){
        var unit=this.idToSprite[unitId];
        if(_.isObject(unit)){
            if(key=="hp"){
                var action=new gViews.Action(unit,cc.callFunc(function(){
                    unit.setHp(value);
                }));
                this.gameLayer.actionQueue.enqueue(action);
            }
        }else{
            console.log(unitId);
            console.error("unit with unitId not object");
        }
    },
});

