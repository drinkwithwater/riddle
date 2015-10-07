var gViews=gViews||{};
gViews.AnimateSprite = cc.Sprite.extend({
    using:null,
    ctor:function(){
        this._super.apply(this,arguments);
        this.using=false;
    },
    isUsing:function(){
        return this.using;
    },
    setUsing:function(){
        this.using=true;
    },
    setUnUsing:function(){
        this.using=false;
    }
});
gViews.AnimateNode = cc.Node.extend({
    gameLayer:null,
    gameTop:null,
    
    spriteList:"list",
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        this.gameTop=gameTop;
        
        this.spriteList=[];
    },
    getEmptySprite:function(){
        for(var i=0,l=this.spriteList.length;i<l;i++){
            if(!this.spriteList[i].isUsing()){
                return this.spriteList[i];
            }
        }
        var newSprite=new gViews.AnimateSprite(res.testpng);
        this.addChild(newSprite);
        this.spriteList.push(newSprite);
        return newSprite;
    },
    testAnimate:function(i,j){
        var sprite=this.getEmptySprite();
        var point=this.gameLayer.pCenter(i,j);
        sprite.setUsing();
        sprite.attr({
            x:point.x,
            y:point.y,
            scaleX:0,
            scaleY:0,
            anchorX:0.5,
            anchorY:0.5,
            visible:true,
            opacity:255,
        });
        sprite.runAction(cc.sequence(
            cc.scaleTo(0.1,1,1),
            cc.fadeOut(0.1),
            cc.callFunc(sprite.setUnUsing,sprite)
        ));
    },
    animatePosAttack:function(i,j){
        var sprite=this.getEmptySprite();
        var point=this.gameLayer.pCenter(i,j);
        sprite.setUsing();
        sprite.attr({
            x:point.x,
            y:point.y,
            scaleX:0,
            scaleY:0,
            anchorX:0.5,
            anchorY:0.5,
            visible:true,
            opacity:255,
        });
        var action=new gViews.Action(sprite, cc.sequence(
            cc.scaleTo(0.1,1,1),
            cc.fadeOut(0.1),
            cc.callFunc(sprite.setUnUsing,sprite)
        ), false);
        this.gameLayer.getActionQueue().enqueue(action);
    }
});
