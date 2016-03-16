var gameView=gameView||{};
gameView.UnitViewPool = cc.Node.extend({
    LEVEL_RANGE:0,
    LEVEL_FUTURE:1,
    LEVEL_UNIT:2,
    RANGE_COLOR:cc.color(200,0,0),
    FUTURE_COLOR:cc.color(255,0,255),
    gameLayer:"gameLayer",
    modelManager:"modelManager",
    idToUnitView:"dict",
    rangeNode:"cc.DrawNode",
    futureNode:"cc.DrawNode",

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
            this.createUnitView(unitModel);
        },this);
        
        // range area
        this.rangeNode=new cc.DrawNode();
        this.addChild(this.rangeNode,this.LEVEL_RANGE);
        // future show
        this.futureNode=new cc.DrawNode();
        this.addChild(this.futureNode,this.LEVEL_FUTURE);
    },
    destroy:function(){
        this.idToUnitView={};
        this.removeAllChildren(true);
    },
    createUnitView:function(unitModel){
        var unitView=new gameView.UnitView(unitModel,this.gameLayer);
        this.idToUnitView[unitModel.unitId]=unitView;
        this.addChild(unitView,this.LEVEL_UNIT);

        var ij=unitModel.getPosition();
        var xy=this.gameLayer.pCenter(ij.i,ij.j);
        unitView.attr({
            x:xy.x,
            y:xy.y,
            anchorX:0.5,
            anchorY:0.5
        });
        unitView.setAttr("ap",unitModel.battleAttr.ap);
        unitView.setAttr("hp",unitModel.battleAttr.hp);
        return unitView;
    },
    deleteUnitView:function(unitId){
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
    unit$:function(id){
        return this.idToUnitView[id];
    },
    showFuture:function(unitId){
        var unitView=this.unit$(unitId);
        var futureList=unitView.unitModel.futureList;
        var lineWidth=this.gameLayer.cellSize().width/10;
        var pre=false;
        for(var i=0,l=futureList.length;i<l;i++){
            var point=futureList[i].position;
            console.log(point);
            if(_.isObject(point)){
                var pos=this.gameLayer.pCenter(point.i,point.j);
                if(pre){
                    this.futureNode.drawSegment(cc.p(pre.x,pre.y),cc.p(pos.x,pos.y),lineWidth,this.FUTURE_COLOR);
                }else{
                    this.futureNode.drawDot(cc.p(pos.x,pos.y),lineWidth/2,this.FUTURE_COLOR);
                }
                pre=pos;
            }else{
                break;
            }
        }
    },
    showRange:function(unitId){
        var unitView=this.unit$(unitId);
        var unitModel=unitView.unitModel;
        var range=unitModel.battleAttr.range;
        var rangePoints=gPoint.radioRange(unitModel.position,range);
        var radio=this.gameLayer.cellSize().width/4;
        _.each(rangePoints,function(point){
            var xyPos=this.gameLayer.pCenter(point.i,point.j);
            this.rangeNode.drawDot(cc.p(xyPos.x,xyPos.y),radio,this.RANGE_COLOR);
        },this);
    },
    hideRange:function(){
        this.rangeNode.clear();
    }
});
gameView.UnitView = cc.Node.extend({
    LEVEL_SPRITE:1,
    LEVEL_ATTR:2,


    unitModel:null,
    gameLayer:null,

    sprite:"cc.Sprite",
    hpLine:"gameView.HpLine",
    role:"cc.Sprite",
    attrNode:"gameView.AttrNode",
    
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


        /* hpLine
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
        this.hpLine.setScaleY(lineScale);*/
        
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
            y:spriteHeight/2,
            anchorX:1,
            anchorY:1,
        });
        this.role.setScaleX(roleScale);
        this.role.setScaleY(roleScale);

        // attr
        this.attrNode=new gameView.AttrNode(spriteWidth);
        this.addChild(this.attrNode,this.LEVEL_ATTR);
        this.attrNode.attr({
            x:-spriteHeight/2,
            y:-spriteHeight/2,
            anchorX:0,
            anchorY:0,
        });
    },
    setAttr:function(attrKey,attrValue){
        this.attrNode.setAttr(attrKey,attrValue);
    },
});
gameView.AttrNode = cc.Node.extend({
    hpNode:null,
    apNode:null,
    FONT_COLOR:cc.color(255,255,255),
    ctor:function(width){
        this._super();
        this.hpNode=new cc.LabelTTF("0","Arial",10);
        this.hpNode.setFontFillColor(this.FONT_COLOR);
        this.addChild(this.hpNode,0);
        this.hpNode.setString("2");
        this.hpNode.attr({
            x:width,
            y:0,
            anchorX:1,
            anchorY:0,
        });

        this.apNode=new cc.LabelTTF("0","Arial",10);
        this.apNode.setFontFillColor(this.FONT_COLOR);
        this.addChild(this.apNode,0);
        this.apNode.setString("1");
        this.apNode.attr({
            x:0,
            y:0,
            anchorX:0,
            anchorY:0,
        });
    },
    setAttr:function(attrKey,attrValue){
        var valString=String(attrValue);
        if(attrKey=="ap"){
            this.apNode.setString(valString);
        }else if(attrKey=="hp"){
            this.hpNode.setString(valString);
        }else{
            console.log("set attr exception : no this attr"+attrKey);
        }
    }
});
// ignore...
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
