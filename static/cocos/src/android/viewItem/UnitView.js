var gViews=gViews||{};
gViews.UnitView = cc.Node.extend({
    LEVEL_SPRITE:0,
    LEVEL_ATTR:1,

    unitModel:null,

    spritePool:null,

    sprite:null,
    hpLine:null,
    
    gameTop:null,
    ctor:function(unitId,gameTop){
        this._super();
        this.gameTop=gameTop;
        this.model=gameTop.getModule("modelModule").unit$(unitId);
        this.gameLayer=gameTop.getModule("viewModule").gameLayer;
        // sprite
        var png=spriteRes[this.model.typeName]||res.testpng;
        this.sprite=new cc.Sprite(png);
        this.addChild(this.sprite, this.LEVEL_SPRITE);
        var cellSize=this.gameLayer.cellSize();
        this.sprite.setScaleX(cellSize.width/this.sprite.width);
        this.sprite.setScaleY(cellSize.height/this.sprite.height);
        // hpLine
        this.hpLine=new cc.ProgressTimer(new cc.Sprite(res.bannerpng));
        this.hpLine.setType(cc.ProgressTimer.TYPE_BAR);
        this.hpLine.setMidpoint(cc.p(0,0.5));
        this.hpLine.setBarChangeRate(cc.p(1,0));
        this.hpLine.setPercentage(50);
        this.hpLine.setScaleX(0.1);
        this.hpLine.setScaleY(0.1);
        this.addChild(this.hpLine, this.LEVEL_ATTR);
    },
});
