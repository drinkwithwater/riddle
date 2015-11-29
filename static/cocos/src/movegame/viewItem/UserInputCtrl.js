var gAI=gAI||{};
gAI.UserInputNode=cc.Node.extend({
    LEVEL_PATH:1,
    LEVEL_CHOOSE:2,
    LEVEL_CLOSURE:3,

    gameLayer:null,
    pathDraw:null,
    
    closureDraw:null,
    chooseDraw:null,
    
    viewManager:null,
    modelManager:null,
    frontendModule:null,
    ctor:function(gameLayer,gameTop){
        this._super();

	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.frontendModule=gameTop.getModule("frontendModule");

        this.gameLayer=gameLayer;
        
        this.chooseDraw=new cc.DrawNode();
        this.addChild(this.chooseDraw,this.LEVEL_CHOOSE);

	    this.pathDraw=new cc.DrawNode();
	    this.addChild(this.pathDraw,this.LEVEL_PATH);
        
	    this.closureDraw=new cc.DrawNode();
	    this.addChild(this.closureDraw,this.LEVEL_CLOSURE);
    },
    doChoose:function(i,j){
        var gameLayer=this.gameLayer;
        this.chooseDraw.clear();
	    this.chooseDraw.drawRect(gameLayer.pLeftBottom(i,j),gameLayer.pRightTop(i,j),cc.color(0,0,0,0),2,cc.color(0,0,255));
    },
    unChoose:function(){
	    this.chooseDraw.clear();
    },
    showPath:function(path){
        var gameLayer=this.gameLayer;
        var walk=path.walk;
        var fly=path.fly;
        var pathDraw=this.pathDraw;
	    pathDraw.clear();
	    var pre=null;
	    for(var i=0,l=walk.length;i<l;i++){
		    if(pre===null){
			    //var center=this.pCenter(walk[i].i,walk[i].j);
			    //pathDraw.drawDot(center,5,cc.color(255,255,255));
			    pre=walk[i];
		    }else{
			    var from=gameLayer.pCenter(pre.i,pre.j);
			    var to=gameLayer.pCenter(walk[i].i,walk[i].j);
			    pathDraw.drawSegment(from,to,5,cc.color(0,255,0));
			    pre=walk[i];
		    }
	    }
        if(fly.length>=2){
            var from=gameLayer.pCenter(fly[0].i,fly[0].j);
            var to=gameLayer.pCenter(fly[fly.length-1].i,fly[fly.length-1].j);
            pathDraw.drawSegment(from,to,5,cc.color(255,255,0));
        }
    },
    showClosure:function(closurePath){
        var gameLayer=this.gameLayer;
        var closureDraw=this.closureDraw;
	    closureDraw.clear();
	    var pre=null;
	    for(var i=0,l=closurePath.length;i<l;i++){
		    if(pre===null){
			    //var center=this.pCenter(walk[i].i,walk[i].j);
			    //pathDraw.drawDot(center,5,cc.color(255,255,255));
			    pre=closurePath[i];
		    }else{
			    var from=gameLayer.pCenter(pre.i,pre.j);
			    var to=gameLayer.pCenter(closurePath[i].i,closurePath[i].j);
			    closureDraw.drawSegment(from,to,5,cc.color(111,0,111));
			    pre=closurePath[i];
		    }
	    }
    },
    showRect:function(){
    },
    hidePath:function(){
	    this.pathDraw.clear();
        this.fadeClosure();
    },
    fadeClosure:function(){
        var self=this;
        this.closureDraw.runAction(cc.sequence(
            cc.fadeOut(0.3),
            cc.callFunc(function(){
                self.closureDraw.clear();
                self.closureDraw.attr({
                    opacity:255
                });
            })
        ));
    }
});
gAI.UserInputCtrl=gAI.UserInputNode.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,

    chooseType:null,
    
    state:0,

    pathingType:null,

    pathData:null,

    preArea:null,

    ctor:function(gameLayer,gameTop){
        this._super(gameLayer,gameTop);
	    this.pathData=new gAI.PathData();
        
        var gameLayer=this.gameLayer;
        var user=this;
	    var listener=cc.EventListener.create({
		    event:cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,
		    onTouchBegan:function(touch,event){
			    gTest.target=event.getCurrentTarget();
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
        if(this.checkBegin(i,j)){
            this.state=this.STATE_PATHING;
	        this.pathData.start({i:i,j:j});
	        this.doChoose(i,j);
	        this.showPath(this.pathData.getWalkFlyPath(1));
	        this.preArea={i:i,j:j};
            return true;
        }else{
            return false;
        }
    },
    moveArea:function(i,j){
        var gameLayer=this.gameLayer;
        if(gameLayer.valid(i,j)&&this.state==this.STATE_PATHING){
            if(this.preArea===null){
                // not start
                return ;
            }else if(this.preArea.i===i&&this.preArea.j===j){
                // at the same cell
                return ;
            }else{
                this.pathData.overArea({i:i,j:j});
                this.showPath(this.pathData.getWalkFlyPath(0));
                this.preArea={i:i,j:j};
                var checkResult=this.checkOut(false);
                if(checkResult){
                    this.cancel();
                    return ;
                }
            }
        }else{
            this.cancel();
            return ;
        }
    },
    endArea:function(){
        if(this.state==this.STATE_PATHING){
            this.checkOut(true);
            this.cancel();
        }else{
            this.cancel();
        }
    },
    checkBegin:function(i,j){
        var gameLayer=this.gameLayer;
        if(!gameLayer.valid(i,j)){
            return false;
        }else{
            var iIn=1<i && i<gameLayer.iLength-2;
            var jIn=1<j && j<gameLayer.jLength-2;
            if(this.chooseType==gAI.type.TYPE_LINE){
                if(iIn && jIn){
                    return false;
                }else if(!iIn && !jIn){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }
    },
    checkOut:function(finished){
        if(this.chooseType==gAI.type.TYPE_CIRCLE){
            if(this.pathData.isClosed()){
                var path=this.pathData.getCircleClosurePath();
                this.showClosure(path);
                this.frontendModule.closurePathing(path);
                return true;
            }else{
                return false;
            }
        }else if(this.chooseType==gAI.type.TYPE_RECT){
            if(!finished && this.pathData.getRectSize()>=8){
                this.showClosure(this.pathData.getRectClosurePath());
                var rect=this.pathData.getRect();
                this.frontendModule.rectWrap(rect.min,rect.max);
                return true;
            }else if(finished && this.pathData.getRectSize()<=8){
                this.showClosure(this.pathData.getRectClosurePath());
                var rect=this.pathData.getRect();
                this.frontendModule.rectWrap(rect.min,rect.max);
                return true;
            }else{
                return false;
            }
        }else if(this.chooseType==gAI.type.TYPE_LINE){
            if(!finished && this.pathData.outLine()){
                this.showClosure(this.pathData.getLineClosurePath());
                var rect=this.pathData.getLineRect();
                if(rect){
                    this.frontendModule.rectWrap(rect.min,rect.max);
                }else{
                    console.log("line rect illegal");
                }
                return true;
            }else if(finished){
                this.showClosure(this.pathData.getLineClosurePath());
                var rect=this.pathData.getLineRect();
                if(rect){
                    this.frontendModule.rectWrap(rect.min,rect.max);
                }else{
                    console.log("line rect illegal");
                }
                return true;
            }else{
                return false;
            }
        }
        return false;
    },
    movePos:function(x,y){
    },
    cancel:function(){
        this.state=this.STATE_EMPTY;
        this.pathData.cancel();
	    this.hidePath();
	    this.unChoose();
    },
    setType:function(type){
        this.chooseType=type;
    }

});
