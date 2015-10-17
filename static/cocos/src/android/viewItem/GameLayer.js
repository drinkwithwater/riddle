var gViews=gViews||{};
gViews.GameLayer = cc.Layer.extend({
    LEVEL_AREA:0,
    LEVEL_SPRITE:1,
    LEVEL_ANIMATE:2,
    LEVEL_USER:3,
    LEVEL_MENU:4,


    dx:50,
    dy:50,
    baseX:0,
    baseY:0,
    iLength:0,
    jLength:0,


    // child node
    userInputCtrl:null,
    unitPool:null,
    animateNode:null,
    areaNode:null,

    // game module
    actionHandler:null,
    viewManager:null,
    modelManager:null,
    
    //
    actionQueue:null,
    ctor:function (gameTop) {
        this._super();

	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.actionHandler=gameTop.getModule("frontendModule");

	    this.userInputCtrl=new gViews.UserInputCtrl(this,gameTop);
        this.addChild(this.userInputCtrl,this.LEVEL_USER);
        
        this.unitPool=new gViews.UnitPool(this,gameTop);
        this.addChild(this.unitPool,this.LEVEL_SPRITE);
        
        this.animateNode=new gViews.AnimateNode(this,gameTop);
        this.addChild(this.animateNode,this.LEVEL_ANIMATE);

        //var size=cc.director.getWinSize();
        this.areaNode=new gViews.AreaNode(this,gameTop);
        this.addChild(this.areaNode,this.LEVEL_AREA);

        this.actionQueue=new gViews.ActionQueue();

	    this.setAnchorPoint(cc.p(0,0));
        return true;
    },
    valid:function(i,j){
        if(i<0||i>=this.iLength){
            return false;
        }
        if(j<0||j>=this.jLength){
            return false;
        }
        return true;
    },
    render:function(){
        console.log("layer render");
        
        // set i,j length
        var mazeModel=this.modelManager.maze$();
        this.iLength = mazeModel.get("iLength");
        this.jLength = mazeModel.get("jLength");

        // set dx,dy
        var size=cc.director.getWinSize();
        this.baseX=size.height/20;
        this.baseY=size.height/20;
        this.dx=(size.height-this.baseX*2)/(this.iLength);
        this.dy=this.dx;

        this.setPosition(cc.p(this.baseX,this.baseY));

        this.userInputCtrl.cancel();
        this.animateNode.destroy();
        
	    this.areaNode.render();
        this.unitPool.render();
    },

    xy2ij:function(x,y){
	    var cellSize={
		    dx:this.getScaleX()*this.dx,
		    dy:this.getScaleX()*this.dy,
	    }
	    var cellBase=this.getPosition();
	    var xx=Math.floor((x-cellBase.x)/cellSize.dx);
	    var yy=Math.floor((y-cellBase.y)/cellSize.dy);
	    return {i:this.iLength-1-yy,j:xx};
    },
    p2ij:function(p){
	    return this.xy2ij(p.x,p.y);
    },
    pLeftBottom:function(i,j){
	    var cellXY=(function(i,j){
	        var xx=j;
	        var yy=this.iLength-1-i;
	        return cc.p(xx,yy);
        }).call(this,i,j);
	    return cc.p(cellXY.x*this.dx,cellXY.y*this.dy)
    },
    pRightTop:function(i,j){
	    var base=this.pLeftBottom(i,j);
	    return cc.p(base.x+this.dx,base.y+this.dy);
    },
    pCenter:function(i,j){
	    var base=this.pLeftBottom(i,j);
	    return cc.p(base.x+this.dx/2,base.y+this.dy/2);
    },
    /*
    pLeftMiddle:function(i,j){
    },
    pRightMiddle:function(i,j){
    },
    pTopMiddle:function(i,j){
    },
    pBottomMiddle:function(i,j){
    },*/
    cellSize:function(){
        return {
            width:this.dx,
            height:this.dy
        }
    },
    run:function(){
        this.actionQueue.run();
    },
    getActionQueue:function(){
        return this.actionQueue;
    },
    getUnitPool:function(){
        return this.unitPool;
    },
    getAnimateNode:function(){
        return this.animateNode;
    },
    getAreaNode:function(){
        return this.areaNode;
    },
    destroy:function(){
        this.userInputCtrl.cancel();
        this.unitPool.destroy();
        this.areaNode.destroy();
        this.animateNode.destroy();
    }
});

gViews.MainScene = cc.Scene.extend({
    gameLayer:null,
    scriptMenu:null,
    
    bind:function(gameTop){
	    this.gameLayer=gameTop.getModule("viewModule").gameLayer;
	    this.scriptMenu=gameTop.getModule("viewModule").scriptMenu;
	    this.closeMenu=gameTop.getModule("viewModule").closeMenu;
    },
    onEnter:function () {
        this._super();
        this.addChild(this.gameLayer,1);
        this.addChild(this.scriptMenu,2);
        this.addChild(this.closeMenu,3);
    }
});


