var gameView=gameView||{};
gameView.UnitView = cc.Node.extend({
    LEVEL_SPRITE:0,
    LEVEL_ATTR:1,


    unitModel:null,
    gameTop:null,

    sprite:null,
    hpLine:null,
    role:null,
    
    ctor:function(unitId,gameTop){
        this._super();
        this.gameTop=gameTop;
        this.unitModel=gameTop.getModule("modelModule").unit$(unitId);
        this.gameLayer=gameTop.getModule("viewModule").gameLayer;
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
