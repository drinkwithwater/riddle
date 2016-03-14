var gameView=gameView||{};
gameView.BulletView =cc.Sprite.extend({
    BULLET_FILE:"bullet",
    gameLayer:null,
    ctor:function(gameLayer){
        var png=spriteRes[this.BULLET_FILE]||res.testpng;
        this._super(png);
        this.gameLayer=gameLayer;
        var cellSize=gameLayer.cellSize();
        var spriteWidth=cellSize.width*0.3;
        var spriteHeight=cellSize.height*0.3;
        this.attr({
            scaleY:spriteWidth/this.width,
            scaleX:spriteHeight/this.height,
            anchorX:0.5,
            anchorY:0.5,
        });
    }
});
gameView.BulletViewPool = cc.Node.extend({
    gameLayer:"GameLayer",
    idToBulletView:"dict",
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;

        this.idToBulletView={};
        this.shotBulletView(1);
    },
    shotBulletView:function(bulletId){
        var bulletView=new gameView.BulletView(this.gameLayer);
        this.addChild(bulletView,0);
        bulletView.attr({
            x:100,
            y:100,
        });
        bulletView.runAction(cc.moveTo(5,cc.p(200,200)));
        this.idToBulletView[bulletId]=bulletView;
        return this.bulletView;
    },
    deleteBullet:function(bulletId){
        var bulletView=this.idToBulletView[bulletId];
        bulletView.removeFromParent();
    },
    explodeBullet:function(bulletId){
        // run explode action..
        var bulletView=this.idToBulletView[bulletId];
        bulletView.runAction(cc.sequence(
            cc.scaleTo(0.1,2*bulletView.getScaleX(),2*bulletView.getScaleY()),
            cc.callFunc(function(){
                bulletView.removeFromParent();
            })
        ));
    }
});
