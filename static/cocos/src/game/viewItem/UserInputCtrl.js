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
    selectId:"int",
    doPoint:function(i,j){
        this.preArea={
            i:i,
            j:j
        }
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

        
        this.selectId=false;
        
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
            var unitModel=this.modelManager.unit$(i,j);
            if(_.isObject(unitModel)){
                if(unitModel.canOper()){
                    unitModel.doStand(i,j);
                    this.selectId=unitModel.unitId;
                }else{
                    this.gameLayer.unitNode.showRange(unitModel.unitId);
                }
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
                if(_.isNumber(this.selectId)){
                    var unitModel=this.modelManager.unit$(this.selectId);
                    if(unitModel){
                        var success=unitModel.doMove(i,j);
                        if(!success){
                            this.cancel();
                        }
                    }
                }
            }
        }else{
            this.cancel();
            return ;
        }
    },
    endArea:function(i,j){
        if(_.isNumber(this.selectId)){
            var unitModel=this.modelManager.unit$(this.selectId);
            if(unitModel){
                // todo
                unitModel.doStand(i,j);
            }
        }
        this.cancel();
    },
    movePos:function(x,y){
    },
    cancel:function(){
        this.selectId=false;
        this.unPoint();
        this.gameLayer.unitNode.hideRange();
    },
});
