var gAI=gAI||{};
gAI.UnitView = cc.Node.extend({
    LEVEL_SPRITE:0,

    sprite:null,
    
    gameLayer:null,
    gameTop:null,
    
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        // sprite
        var png=res.testpng;
        this.sprite=new cc.Sprite(png);
        this.addChild(this.sprite, this.LEVEL_SPRITE);

        this.sprite.attr({
            anchorX:0.5,
            anchorY:0.5
        });
        var cellSize=this.gameLayer.cellSize();
        var spriteWidth=cellSize.width*0.9;
        var spriteHeight=cellSize.height*0.9;
        this.sprite.setScaleX(spriteWidth/this.sprite.width);
        this.sprite.setScaleY(spriteHeight/this.sprite.height);
    }
});


