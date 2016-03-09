var gameView=gameView||{};
gameView.AnimateNode = cc.Node.extend({
    gameLayer:"GameLayer",
    drawList:"list",
    unitNode:"UnitViewPool",
    oneDraw:"cc.DrawNode",
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;

        this.unitNode=this.gameLayer.unitNode;
        this.oneDraw=new cc.DrawNode();
        this.addChild(this.oneDraw,1);
    },
    actionUnitAttack:function(srcUnitId,dstUnitIdSet){
        var srcView=this.unitNode.unit$(srcUnitId);
        var dstViewSet=_.map(dstUnitIdSet,this.unitNode.unit$,this.unitNode);
        var srcPoint=cc.p(srcView.x,srcView.y);
        _.each(dstViewSet,function(dstView){
            var dstPoint=cc.p(dstView.x,dstView.y);
            this.oneDraw.drawSegment(srcPoint,dstPoint,3,cc.color(255,255,255));
        },this);
        var oneDraw=this.oneDraw;
        this.oneDraw.runAction(cc.sequence(
            cc.fadeOut(0.3),
            cc.callFunc(function(){
                oneDraw.clear(),
                oneDraw.attr({
                    opacity:255
                })
            })
        ));
    },
});
