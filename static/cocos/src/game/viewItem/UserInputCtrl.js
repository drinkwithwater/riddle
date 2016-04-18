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

    isTransforming:false,
    startTransforming:function(){
        if(!this.isTransforming){
            this.isTransforming=true;
            this.cancel();
        }
    },
    endTransforming:function(){
        if(this.isTransforming){
            this.isTransforming=false;
            this.cancel();
        }
    },

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
        this.addChild(this.pointDraw,1);

        
        this.selectId=false;
        
        var user=this;
	    var listener=cc.EventListener.create({
		    event:cc.EventListener.TOUCH_ALL_AT_ONCE,
		    onTouchesBegan:function(touches,event){
                var touch=touches[0];
                if(touches.length<=1 && !this.isTransforming){
			        var ij=gameLayer.p2ij(touch.getLocation());
                    user.beginArea(ij.i,ij.j);
                }
		    },
		    onTouchesMoved:function(touches,event){
                var touch=touches[0];
                if(touches.length<=1 && !this.isTransforming){
			        var ij=gameLayer.p2ij(touch.getLocation());
			        user.moveArea(ij.i,ij.j);
                }
		    },
		    onTouchesEnded:function(touches,event){
                var touch=touches[0];
                if(touches.length<=1 && !this.isTransforming){
			        var ij=gameLayer.p2ij(touch.getLocation());
			        user.endArea(ij.i,ij.j);
                }
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
                    unitModel.doBegin(i,j);
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
                var areas=this.fill(this.preArea,{i:i,j:j});
                this.doPoint(i,j);
                _.each(areas,function(area){
                    if(_.isNumber(this.selectId)){
                        var unitModel=this.modelManager.unit$(this.selectId);
                        if(unitModel){
                            var success=unitModel.doMove(area.i,area.j);
                            if(!success){
                                this.cancel();
                            }
                        }
                    }
                },this);
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
                unitModel.doEnd(i,j);
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

    //if the path isnot continuous, fill with some area;
    fill:function(srcArea,dstArea){
        var di=dstArea.i-srcArea.i;
        var dj=dstArea.j-srcArea.j;
        var signi=(di>0?1:-1);
        var signj=(dj>0?1:-1);
        var onAreas=[];
        while(di!=0||dj!=0){
            if(signi*di>signj*dj){
                di-=signi;
            }else{
                dj-=signj;
            }
            onAreas.push({i:dstArea.i-di,
                         j:dstArea.j-dj});
        }
        return onAreas;
    }
});
