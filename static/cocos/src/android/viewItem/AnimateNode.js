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
    destroy:function(){
        this.spriteList=[];
        this.removeAllChildren(true);
    },
    getEmptySprite:function(){
        var reSprite=null;
        for(var i=0,l=this.spriteList.length;i<l;i++){
            if(!this.spriteList[i].isUsing()){
                reSprite=this.spriteList[i];
                break;
            }
        }
        if(reSprite===null){
            var reSprite=new gViews.AnimateSprite(res.testpng);
            reSprite.retain();
            this.addChild(reSprite);
            this.spriteList.push(reSprite);
        }
        return reSprite;
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
        ));
        this.gameLayer.getActionQueue().enqueue(action);
    },
    animatePosArrayAttack:function(posArray){
        var actionList=new gViews.ActionList();
        for(var i=0,l=posArray.length;i<l;i++){
            var pos=posArray[i];
            var sprite=this.getEmptySprite();
            var point=this.gameLayer.pCenter(pos.i,pos.j);
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
            ));
            actionList.push(action);
        }
        this.gameLayer.getActionQueue().enqueue(actionList);
    }
});
