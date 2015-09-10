var gViews=gViews||{};
gViews.UserInputCtrl=gUtil.Class.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    state:0,

    srcUnit:null,
    pathingType:null,

    gameLayer:null,

    pathData:null,

    preArea:null,
    modelManager:null,
    constructor:function(){
	    gViews.UserInputCtrl.__super__.constructor.call(this);
	    this.pathData=new gViews.PathData();
    },
    bindLayer:function(gameLayer){
	    this.gameLayer=gameLayer;
    },
    beginArea:function(i,j){
	    this.pathData.start({i:i,j:j});
	    this.gameLayer.doChoose(i,j);
	    this.preArea={i:i,j:j};
    },
    moveArea:function(i,j){
	    if(this.preArea===null){
		    return ;
	    }else if(this.preArea.i!=i||this.preArea.j!=j){
		    this.pathData.overArea({i:i,j:j});
		    this.gameLayer.showPath(this.pathData.getWalkPath());
		    this.preArea={i:i,j:j};
	    }
    },
    endArea:function(i,j){
	    this.pathData.cancel();
	    this.gameLayer.hidePath();
	    this.gameLayer.unChoose();
    },
    movePos:function(x,y){
    }

});
var GameLayer = cc.Layer.extend({


    dx:50,
    dy:50,
    baseX:0,
    baseY:0,
    iLength:5,
    jLength:5,

    drawNode:null,
    areaDraw:null,
    chooseDraw:null,
    pathDraw:null,

    userInputCtrl:null,
    showPath:function(path){
	    this.pathDraw.clear();
	    var pre=null;
	    for(var i=0,l=path.length;i<l;i++){
		    if(pre===null){
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
    refresh:function(){
	var drawNode=this.drawNode;
	drawNode.drawRect(cc.p(dx,dy))
    },
    ctor:function () {
        this._super();
        var size=cc.director.getWinSize();
	this.userInputCtrl=new gViews.UserInputCtrl();
	this.userInputCtrl.bindLayer(this);

        this.areaDraw=new cc.DrawNode();
        this.addChild(this.areaDraw,0);
	this.showArea();

	this.chooseDraw=new cc.DrawNode();
	this.addChild(this.chooseDraw,1);
	var layer=this;
	var user=this.userInputCtrl;
	var listener=cc.EventListener.create({
		event:cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,
		onTouchBegan:function(touch,event){
			gTest.target=event.getCurrentTarget();
			var ij=layer.p2ij(touch.getLocation());
			user.beginArea(ij.i,ij.j);
			return true;
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
	this.addChild(this.pathDraw,2);
        return true;
    },
    xy2ij:function(x,y){
	    var xx=Math.floor(x/this.dx);
	    var yy=Math.floor(y/this.dy);
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
	    return cc.p(base.x+this.dx-1,base.y+this.dy-1);
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

var MainScene = cc.Scene.extend({
    gameLayer:null,
    size:null,
    onEnter:function () {
        this._super();
        this.size=cc.director.getWinSize();
        var layer = new GameLayer();
        this.addChild(layer);
        this.gameLayer=layer;
    }
});

