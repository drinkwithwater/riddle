var gViews=gViews||{};
gViews.GameLayer = cc.Layer.extend({
    LEVEL_AREA:0,
    LEVEL_SPRITE:1,
    LEVEL_PATH:2,
    LEVEL_CHOOSE:3,


    dx:50,
    dy:50,
    baseX:0,
    baseY:0,
    iLength:0,
    jLength:0,

    areaDraw:null,
    chooseDraw:null,
    pathDraw:null,

    userInputCtrl:null,

    actionHandler:null,
    viewManager:null,
    modelManager:null,
    idToSprite:null,
    showPath:function(path){
	    this.pathDraw.clear();
	    var pre=null;
	    for(var i=0,l=path.length;i<l;i++){
		    if(pre===null){
			    var center=this.pCenter(path[i].i,path[i].j);
			    this.pathDraw.drawDot(center,5,cc.color(255,255,255));
			    pre=path[i];
		    }else{
			    var from=this.pCenter(pre.i,pre.j);
			    var to=this.pCenter(path[i].i,path[i].j);
			    this.pathDraw.drawSegment(from,to,5,cc.color(255,255,255));
			    pre=path[i];
		    }
	    }
    },
    hidePath:function(){
	    this.pathDraw.clear();
    },
    doChoose:function(i,j){
	    this.chooseDraw.clear();
	    this.chooseDraw.drawRect(this.pLeftBottom(i,j),this.pRightTop(i,j),cc.color(0,0,0,0),2,cc.color(0,0,255));
    },
    unChoose:function(){
	    this.chooseDraw.clear();
    },
    showArea:function(){
	    var iLength=this.iLength;
	    var jLength=this.jLength;
	    var draw=this.areaDraw;
	    for(var i=0;i<iLength;i++){
		    for(var j=0;j<jLength;j++){
			    var fillColor=(i+j)%2==0?cc.color(255,255,0,30):cc.color(255,0,0,30);
			    draw.drawRect(this.pLeftBottom(i,j),this.pRightTop(i,j),fillColor,0);
		    }
	    }
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
    ctor:function () {
        this._super();
	    this.setAnchorPoint(cc.p(0,0));

        this.idToSprite={};
        //var size=cc.director.getWinSize();
	    this.userInputCtrl=new gViews.UserInputCtrl();

        this.areaDraw=new cc.DrawNode();
        this.addChild(this.areaDraw,this.LEVEL_AREA);


	    this.chooseDraw=new cc.DrawNode();
	    this.addChild(this.chooseDraw,this.LEVEL_CHOOSE);
	    var layer=this;
	    var user=this.userInputCtrl;
	    var listener=cc.EventListener.create({
		    event:cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,
		    onTouchBegan:function(touch,event){
			    gTest.target=event.getCurrentTarget();
			    var ij=layer.p2ij(touch.getLocation());
                return user.beginArea(ij.i,ij.j);
		    },
		    onTouchMoved:function(touch,event){
			    var ij=layer.p2ij(touch.getLocation());
			    user.moveArea(ij.i,ij.j);
		    },
		    onTouchEnded:function(touch,event){
			    var ij=layer.p2ij(touch.getLocation());
			    user.endArea(ij.i,ij.j);
		    }
	    });

	    cc.eventManager.addListener(listener,this.chooseDraw);

	    this.pathDraw=new cc.DrawNode();
	    this.addChild(this.pathDraw,this.LEVEL_PATH);
        return true;
    },
    render:function(){
        console.log("layer render");
        this.userInputCtrl.cancel();
        var layer=this;
        // update area

        // set i,j length
        var mazeModel=this.modelManager.maze$();
        this.iLength=mazeModel.get("iLength");
        this.jLength=mazeModel.get("jLength");

        // set dx,dy
        var size=cc.director.getWinSize();
        this.dx=size.height/(this.iLength+1);
        this.dy=this.dx;
        this.baseX=this.dx/2;
        this.baseY=this.dy/2

        this.setPosition(cc.p(this.baseX,this.baseY));

        // show area,unit
	    this.showArea();

        _.each(this.modelManager.unitDict,function(v,k){
            var sprite=new cc.Sprite(res.testpng);
            var pos=layer.pCenter(v.get("i"),v.get("j"));
            sprite.attr({
                x:pos.x,
                y:pos.y,
                anchorX:0.5,
                anchorY:0.5
            });
            layer.idToSprite[v.get("unitId")]=sprite;
            layer.addChild(sprite,layer.LEVEL_SPRITE);
        });
    },
    bind:function(gameTop){
	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.actionHandler=gameTop.getModule("frontendModule");
	    this.userInputCtrl.bind(this,gameTop);
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
    cellXY:function(i,j){
	    var xx=j;
	    var yy=this.iLength-1-i;
	    return cc.p(xx,yy);
    },
    pLeftBottom:function(i,j){
	    var cellXY=this.cellXY(i,j);
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
    pLeftMiddle:function(i,j){
    },
    pRightMiddle:function(i,j){
    },
    pTopMiddle:function(i,j){
    },
    pBottomMiddle:function(i,j){
    }
});

gViews.MainScene = cc.Scene.extend({
    gameLayer:null,
    bind:function(gameTop){
	    this.gameLayer=gameTop.getModule("viewModule").gameLayer;
    },
    onEnter:function () {
        this._super();
        this.addChild(this.gameLayer);
    }
});

