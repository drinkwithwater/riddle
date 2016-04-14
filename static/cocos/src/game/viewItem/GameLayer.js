var gameView=gameView||{};
gameView.GameLayer = cc.Layer.extend({
    LEVEL_AREA:0,
    LEVEL_TRAIL:1,
    LEVEL_UNIT:2,
    LEVEL_USER:3,
    LEVEL_ANIMATE:4,
    LEVEL_BULLET:5,
    LEVEL_MENU:6,


    dx:50,
    dy:50,
    baseX:0,
    baseY:0,
    iLength:0,
    jLength:0,


    // child node
    userInputCtrl:null,
    trailNode:null,
    areaNode:null,
    animateNode:null,
    bulletNode:null,
    
    
    // game module
    controlManager:null,
    viewManager:null,
    modelManager:null,
    
    ctor:function (gameTop) {
        this._super();

	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.controlManager=gameTop.getModule("controlModule");

	    this.userInputCtrl=new gameView.UserInputCtrl(this,gameTop);
        this.addChild(this.userInputCtrl,this.LEVEL_USER);
        
        this.areaNode=new gameView.AreaNode(this,gameTop);
        this.addChild(this.areaNode,this.LEVEL_AREA);

        this.unitNode=new gameView.UnitViewPool(this,gameTop);
        this.addChild(this.unitNode,this.LEVEL_UNIT);

        this.animateNode=new gameView.AnimateNode(this,gameTop);
        this.addChild(this.animateNode,this.LEVEL_ANIMATE);
        
        this.bulletNode=new gameView.BulletViewPool(this,gameTop);
        this.addChild(this.bulletNode,this.LEVEL_BULLET);


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
        this.iLength = this.modelManager.iLength;
        this.jLength = this.modelManager.jLength;
        
        // set dx,dy
        var size=cc.director.getWinSize();
        //this.baseX=size.height/20;
        //this.baseY=size.height/20;
        this.baseX=0;
        this.baseY=0;
        this.dy=(size.height-this.baseY*2)/(this.jLength);
        this.dx=this.dy;

        this.setPosition(cc.p(this.baseX,this.baseY));

	    this.areaNode.render();
	    this.unitNode.render();
        
        this.attr({
            scaleX:0.5,
            scaleY:0.5
        });
        
    },

    xy2ij:function(x,y){
	    var cellSize={
		    dx:this.getScaleX()*this.dx,
		    dy:this.getScaleX()*this.dy,
	    }
	    var cellBase=this.getPosition();
        return {
            i:Math.floor((x-cellBase.x)/cellSize.dx),
            j:Math.floor((y-cellBase.y)/cellSize.dy)
        }
    },
    p2ij:function(p){
	    return this.xy2ij(p.x,p.y);
    },
    pLeftBottom:function(i,j){
	    return cc.p(i*this.dx,j*this.dy)
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
    getAreaNode:function(){
        return this.areaNode;
    },
    getTrailNode:function(){
        return this.trailNode;
    },
    destroy:function(){
        this.userInputCtrl.cancel();
        this.areaNode.destroy();
    },
});
gameView.OperationLayer = cc.Layer.extend({
    gameLayer:null,
    lastLocation1:null,
    lastLocation2:null,
    ctor:function(gameLayer){
        this._super();
        this.gameLayer=gameLayer;
        var operation=this;
	    var listener=cc.EventListener.create({
		    event:cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,
		    onTouchBegan:function(touch,event){
                operation.beginMove(touch.getLocation());
                return true;
		    },
		    onTouchMoved:function(touch,event){
                operation.move(touch.getLocation());
		    },
		    onTouchEnded:function(touch,event){
                operation.endMove(touch.getLocation());
		    }
	    });

        cc.eventManager.addListener(listener,this);
    },
    beginMove:function(location1,location2){
        this.lastLocation1=location1;
        this.lastLocation2=location2;
    },
    move:function(location1,location2){
        var x=this.gameLayer.getPositionX();
        var y=this.gameLayer.getPositionY();
        var scaleX=this.gameLayer.getScaleX();
        var scaleY=this.gameLayer.getScaleY();
        this.gameLayer.attr({
            x:x+(location1.x-this.lastLocation1.x),
            y:y+(location1.y-this.lastLocation1.y)
        });
        this.lastLocation1=location1;
        this.lastLocation2=location2;
    },
    endMove:function(location1,location2){
        var dx=location1.x-this.lastLocation1.x;
        var dy=location1.y-this.lastLocation1.y;
        if(dx==0 && dy==0){
            return ;
        }else{
            /* no effect when I use html ......
            var gameLayer=this.gameLayer;
            gameLayer.runAction(cc.moveTo(
                1,
                cc.p(gameLayer.getPositionX()+dx*10,gameLayer.getPositionY()+dy*10)
            ));*/
        }
    }
});

gameView.MainScene = cc.Scene.extend({
    gameLayer:null,
    operationLayer:null,
    
    bind:function(gameTop){
	    this.gameLayer=gameTop.getModule("viewModule").gameLayer;
	    this.operationLayer=new gameView.OperationLayer(this.gameLayer);
    },
    onEnter:function () {
        this._super();
        this.addChild(this.gameLayer,1);
        this.addChild(this.operationLayer,2);
    }
});


