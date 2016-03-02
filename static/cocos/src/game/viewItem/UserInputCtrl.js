var gameView=gameView||{};
gameView.UserInputCtrl=cc.Node.extend({
    STATE_EMPTY:0,
    STATE_POINT:1,
    
    state:0,

    pointDraw:"drawNode",
    
    viewManager:null,
    modelManager:null,
    controlModule:null,

    pathingType:null,

    preArea:null,
    doPoint:function(i,j){
        var gameLayer=this.gameLayer;
        this.pointDraw.clear();
	    this.pointDraw.drawRect(gameLayer.pLeftBottom(i,j),gameLayer.pRightTop(i,j),cc.color(0,0,0,0),2,cc.color(0,0,255));
    },
    unPoint:function(){
        this.pointDraw.clear();
    },

    ctor:function(gameLayer,gameTop){
        this._super();
        
        this.gameLayer=gameLayer;
        
	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.controlModule=gameTop.getModule("controlModule");

        this.pointDraw=new cc.DrawNode();
        this.addChild(this.pointDraw,this.LEVEL_POINT);
        
        var user=this;
	    var listener=cc.EventListener.create({
		    event:cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,
		    onTouchBegan:function(touch,event){
			    var ij=gameLayer.p2ij(touch.getLocation());
                return user.beginArea(ij.i,ij.j);
		    },
		    onTouchMoved:function(touch,event){
			    var ij=gameLayer.p2ij(touch.getLocation());
			    user.moveArea(ij.i,ij.j);
		    },
		    onTouchEnded:function(touch,event){
			    var ij=gameLayer.p2ij(touch.getLocation());
			    user.endArea(ij.i,ij.j);
		    }
	    });

	    cc.eventManager.addListener(listener,this);
    },
    beginArea:function(i,j){
        var gameLayer=this.gameLayer;
        if(gameLayer.valid(i,j)){
            this.doPoint(i,j);
            this.preArea={
                i:i,
                j:j
            }
            return true;
        }else{
            return false;
        }
    },
    moveArea:function(i,j){
        var gameLayer=this.gameLayer;
        if(gameLayer.valid(i,j)){
            if(this.preArea.i==i && this.preArea.j==j){
                return ;
            }else{
                this.doPoint(i,j);
                this.preArea={
                    i:i,
                    j:j
                }
            }
        }else{
            this.cancel();
            return ;
        }
    },
    endArea:function(){
        this.cancel();
    },
    movePos:function(x,y){
    },
    cancel:function(){
        this.unPoint();
    },
});
