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

        this.dy=(size.height)/(this.jLength);
        this.dx=this.dy;

        this.setPosition(cc.p(0,0));

	    this.areaNode.render();
	    this.unitNode.render();
        
        
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
    moveTran:function(dx,dy){
        this.attr({
            x:this.getPositionX()+dx,
            y:this.getPositionY()+dy,
        });
    },
    scaleTran:function(before,after,point){
        var scale=after/before;
        var x=this.getPositionX();
        var y=this.getPositionY();
        this.attr({
            scaleX:this.getScaleX()*scale,
            scaleY:this.getScaleY()*scale,
            x:(x-point.x)*scale+point.x,
            y:(y-point.y)*scale+point.y,
        });
    },
    getUserNode:function(){
        return this.userInputCtrl;
    }
});
gameView.OperationLayer = cc.Layer.extend({
    gameLayer:null,
    lastLocation1:null,
    lastLocation2:null,
    rightDown:false,
    ctor:function(gameLayer){
        this._super();
        this.gameLayer=gameLayer;
        var operation=this;
	    var listener=null;
        if(cc.sys.isNative){
            listener=cc.EventListener.create({
                event:cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesBegan:function(touches,event){
                    if(touches.length<=1){
                        operation.beginTran(touches[0].getLocation());
                    }else{
                        operation.beginTran(touches[0].getLocation(),touches[1].getLocation());
                        operation.gameLayer.getUserNode().startTransforming();
                    }
                },
                onTouchesMoved:function(touches,event){
                    if(touches.length<=1){
                        if(operation.gameLayer.getUserNode().isTransforming){
                            operation.tran(touches[0].getLocation());
                        }else{
                            operation.beginTran(touches[0].getLocation());
                        }
                    }else{
                        if(operation.gameLayer.getUserNode().isTransforming){
                            operation.tran(touches[0].getLocation(),touches[1].getLocation());
                        }else{
                            operation.beginTran(touches[0].getLocation(),touches[1].getLocation());
                            operation.gameLayer.getUserNode().startTransforming();
                        }
                    }
                },
                onTouchesEnded:function(touches,event){
                    operation.gameLayer.getUserNode().endTransforming();
                }
            });
        }else{
            listener=cc.EventListener.create({
                event:cc.EventListener.MOUSE,
                onMouseMove:function(event){
                    if(operation.rightDown){
                        operation.tran({
                            x:event.getLocationX(),
                            y:event.getLocationY()
                        });
                        return true;
                    }else{
                        return false;
                    }
                },
                onMouseDown:function(event){
                    if(event.getButton()==cc.EventMouse.BUTTON_RIGHT){
                        operation.rightDown=true;
                        operation.beginTran({
                            x:event.getLocationX(),
                            y:event.getLocationY()
                        });
                        return true;
                    }else{
                        return false;
                    }
                },
                onMouseUp:function(event){
                    if(event.getButton()==cc.EventMouse.BUTTON_RIGHT){
                        operation.rightDown=false;
                        operation.tran({
                            x:event.getLocationX(),
                            y:event.getLocationY()
                        });
                        return true;
                    }else{
                        return false;
                    }
                },
                onMouseScroll:function(event){
                    var scroll=event.getScrollY();
                    var point={
                        x:event.getLocationX(),
                        y:event.getLocationY()
                    };
                    if(scroll>=0){
                        operation.gameLayer.scaleTran(1,1.25,point);
                    }else{
                        operation.gameLayer.scaleTran(1,0.8,point);
                    }
                    console.log("scroll:"+event.getScrollY());
                }
            });
        }

        cc.eventManager.addListener(listener,this);
        cc.eventManager.setPriority(listener,2);
    },
    beginTran:function(location1,location2){
        this.lastLocation1=location1;
        this.lastLocation2=location2;
    },
    tran:function(location1,location2){
        if(_.isObject(location2)){
            var a=xyPoint.euDistance(location1,this.lastLocation1);
            var b=xyPoint.euDistance(location2,this.lastLocation1);
            if(b<a){
                var temp=location1;
                location1=location2;
                location2=temp;
            }
        }
        this.gameLayer.moveTran(
            location1.x-this.lastLocation1.x,
            location1.y-this.lastLocation1.y
        );
        if(_.isObject(location2) && _.isObject(this.lastLocation2)){
            var beforeDistance=xyPoint.euDistance(
                this.lastLocation1,this.lastLocation2
            );
            var afterDistance=xyPoint.euDistance(
                location1,location2
            );
            
            this.gameLayer.scaleTran(beforeDistance,afterDistance,location1);
        }
        this.lastLocation1=location1;
        this.lastLocation2=location2;
    },
    endTran:function(location1,location2){
        // not used...
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


