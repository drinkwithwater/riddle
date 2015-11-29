var gAI=gAI||{};
gAI.type={
    TYPE_CIRCLE:1,
    TYPE_RECT:2,
    TYPE_LINE:3,
}
gAI.TypeNode = cc.Menu.extend({
    gameLayer:null,
    circleItem:null,
    rectItem:null,
    lineItem:null,
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        var winSize=cc.director.getWinSize();
        
        this.circleItem=new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function(){
                this.onChooseType(gAI.type.TYPE_CIRCLE);
            },this);
        this.addChild(this.circleItem);
        
        this.rectItem=new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function(){
                this.onChooseType(gAI.type.TYPE_RECT);
            },this);
        this.addChild(this.rectItem);
        
        this.lineItem=new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function(){
                this.onChooseType(gAI.type.TYPE_LINE);
            },this);
        this.addChild(this.lineItem);
        
        this.circleItem.attr({
                x:winSize.width-40,
                y:winSize.height-100,
                anchorX:0.5,
                anchorY:0.5,
            });
        this.rectItem.attr({
                x:winSize.width-40,
                y:winSize.height/2,
                anchorX:0.5,
                anchorY:0.5,
            });
        this.lineItem.attr({
                x:winSize.width-40,
                y:100,
                anchorX:0.5,
                anchorY:0.5,
            });
        
        this.attr({
            x:0,
            y:0,
        });
    },
    render:function(){
    },
    destroy:function(){
        this.areaDraw.clear();
    },
    onChooseType:function(type){
        this.gameLayer.userInputCtrl.setType(type);
    }
});

