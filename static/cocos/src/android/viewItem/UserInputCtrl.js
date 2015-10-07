var gViews=gViews||{};
gViews.UserInputNode=cc.Node.extend({
    LEVEL_PATH:1,
    LEVEL_CHOOSE:2,
    gameLayer:null,
    pathDraw:null,
    chooseDraw:null,
    ctor:function(gameLayer,gameTop){
        this._super();

	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.frontendModule=gameTop.getModule("frontendModule");

        this.gameLayer=gameLayer;
        
        this.chooseDraw=new cc.DrawNode();
        this.addChild(this.chooseDraw,this.LEVEL_PATH);

	    this.pathDraw=new cc.DrawNode();
	    this.addChild(this.pathDraw,this.LEVEL_PATH);
        
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
    hidePath:function(){
	    this.pathDraw.clear();
    },
});
gViews.UserInputCtrl=gViews.UserInputNode.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    state:0,

    srcUnit:null,
    pathingType:null,


    pathData:null,

    preArea:null,

    modelManager:null,
    viewManager:null,
    frontendModule:null,
    ctor:function(gameLayer,gameTop){
        this._super(gameLayer,gameTop);
	    this.pathData=new gViews.PathData();
        
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
        if(gameLayer.valid(i,j)){
            var chooseUnit=this.modelManager.unit$(i,j);
            this.srcUnit=chooseUnit;
            if(_.isObject(chooseUnit)){
                this.state=this.STATE_PATHING;
	            this.pathData.start({i:i,j:j});
	            this.doChoose(i,j);
	            this.showPath(this.pathData.getWalkFlyPath(1));
	            this.preArea={i:i,j:j};
                return true;
            }else{
                return false;
            }
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
                var dstUnit=this.modelManager.unit$(i,j);
                if(_.isObject(dstUnit)){
                    var r=this.srcUnit.get("attackRange");
                    this.showPath(this.pathData.getWalkFlyPath(r));
                }else{
                    this.showPath(this.pathData.getWalkFlyPath(0));
                }
                this.preArea={i:i,j:j};
            }
        }else{
            this.cancel();
            return ;
        }
    },
    endArea:function(i,j){
        if(this.gameLayer.valid(i,j)){
            this.frontendModule.viewPathing(this.pathData.getWalkPath());
            this.cancel();
        }else{
            this.cancel();
        }
    },
    movePos:function(x,y){
    },
    cancel:function(){
        this.state=this.STATE_EMPTY;
        this.pathData.cancel();
	    this.hidePath();
	    this.unChoose();
    }

});
