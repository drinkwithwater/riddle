var gameView=gameView||{};
gameView.UnitViewPool = cc.Node.extend({
    gameLayer:"gameLayer",
    modelManager:"modelManager",
    idToUnitView:"dict",
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        this.modelManager=gameTop.getModule("modelModule");
        this.idToUnitView={};
    },
    render:function(){
        this.destroy();
        var unitModels=this.modelManager.unit$();
        _.each(unitModels,function(unitModel){
            var unitView=this.createUnitView(unitModel);
            this.idToUnitView[unitModel.unitId]=unitView;
            this.addChild(unitView);
        },this);
    },
    destroy:function(){
        this.idToUnitView={};
        this.removeAllChildren(true);
    },
    createUnitView:function(unitModel){
        var unitView=new gameView.UnitView(unitModel,this.gameLayer);
        var ij=unitModel.getPosition();
        var xy=this.gameLayer.pCenter(ij.i,ij.j);
        unitView.attr({
            x:xy.x,
            y:xy.y,
            anchorX:0.5,
            anchorY:0.5
        });
        return unitView;
    },
    removeUnit:function(unitId){
        var unit=this.idToUnitView[unitId];
        delete this.idToUnitView[unitId];
        unit.gameLayer=null;
        unit.unitModel=null;
        unit.removeFromParent();
    },
    actionUnitIdMove:function(unitId,dstIJ,duration){
        var dstPoint=this.gameLayer.pCenter(dstIJ.i,dstIJ.j);
        var unit=this.idToUnitView[unitId];
        if(_.isObject(unit)){
            unit.stopAllActions();
            unit.runAction(cc.moveTo(duration,dstPoint));
        }else{
            console.error("unitView with unitId not existed"+unitId);
        }
    },
});
gameView.UnitView = cc.Node.extend({
    LEVEL_SPRITE:0,
    LEVEL_ATTR:1,


    unitModel:null,
    gameLayer:null,

    sprite:"cc.Sprite",
    hpLine:"gameView.HpLine",
    role:"cc.Sprite",
    
    ctor:function(unitModel,gameLayer){
        this._super();
        this.unitModel=unitModel;
        this.gameLayer=gameLayer;
        // sprite
        var png=spriteRes[this.unitModel.typeName]||res.testpng;
        this.sprite=new cc.Sprite(png);
        this.addChild(this.sprite, this.LEVEL_SPRITE);
        var cellSize=this.gameLayer.cellSize();
        var spriteWidth=cellSize.width*0.9;
        var spriteHeight=cellSize.height*0.9;
        this.sprite.setScaleX(spriteWidth/this.sprite.width);
        this.sprite.setScaleY(spriteHeight/this.sprite.height);

        // hpLine
        this.hpLine=new gameView.HpLine();
        this.addChild(this.hpLine, this.LEVEL_ATTR);
        var lineScale=spriteWidth/this.hpLine.maxHpLine.width;
        this.hpLine.attr({
            x:0,
            y:spriteHeight/2.2,
            anchorX:0,
            anchorY:0,
        });
        this.hpLine.setScaleX(lineScale);
        this.hpLine.setScaleY(lineScale);
        
        // role
        if(this.unitModel.canOper()){
            this.role=new cc.Sprite(itemRes.blueShell);
        }else{
            this.role=new cc.Sprite(itemRes.blackShell);
        }
        this.addChild(this.role, this.LEVEL_ATTR);
        var roleScale=spriteWidth*0.2/this.role.width;
        this.role.attr({
            x:spriteHeight/2,
            y:-spriteHeight/2,
            anchorX:1,
            anchorY:0,
        });
        this.role.setScaleX(roleScale);
        this.role.setScaleY(roleScale);
    },
    setHp:function(hp){
        this.hpLine.setHp(hp);
    },
    setMaxHp:function(maxHp){
        this.hpLine.setMaxHp(maxHp);
    }
});

gameView.HpLine = cc.Node.extend({
    hpLine:null,
    maxHpLine:null,
    ctor:function(){
        this._super();
        this.hpLine=new cc.ProgressTimer(new cc.Sprite(itemRes.hp));
        this.hpLine.setType(cc.ProgressTimer.TYPE_BAR);
        this.hpLine.setMidpoint(cc.p(0,0.5));
        this.hpLine.setBarChangeRate(cc.p(1,0));
        this.hpLine.setPercentage(50);
        this.addChild(this.hpLine,2);
        this.maxHpLine=new cc.ProgressTimer(new cc.Sprite(itemRes.maxHp));
        this.maxHpLine.setType(cc.ProgressTimer.TYPE_BAR);
        this.maxHpLine.setMidpoint(cc.p(0,0.5));
        this.maxHpLine.setBarChangeRate(cc.p(1,0));
        this.maxHpLine.setPercentage(100);
        this.addChild(this.maxHpLine,1);
    },
    setHp:function(hp){
        this.hpLine.setPercentage(hp*10);
    },
    setMaxHp:function(maxHp){
        this.maxHpLine.setPercentage(maxHp*10);
    }
});
