var gMove=gMove||{};
gMove.GameLayer = cc.Layer.extend({
    LEVEL_AREA:0,
    LEVEL_SPRITE:1,
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
    unitNode:null,
    areaNode:null,
    scoreNode:null,
    
    typeNode:null,
    
    testNode:null,

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

	    this.userInputCtrl=new gMove.UserInputCtrl(this,gameTop);
        this.addChild(this.userInputCtrl,this.LEVEL_USER);
        
        //var size=cc.director.getWinSize();
        this.areaNode=new gMove.AreaNode(this,gameTop);
        this.addChild(this.areaNode,this.LEVEL_AREA);

        this.unitNode=new gMove.UnitView(this,gameTop);
        this.addChild(this.unitNode,this.LEVEL_SPRITE);

        this.testNode=new cc.DrawNode();
        this.addChild(this.testNode,this.LEVEL_SPRITE);

        this.scoreNode=new cc.LabelTTF("0","Arial",38);
        this.scoreNode.setFontFillColor(cc.color(255,255,255));
        this.addChild(this.scoreNode,this.LEVEL_SPRITE);

        this.typeNode=new gMove.TypeNode(this,gameTop);
        this.addChild(this.typeNode,this.LEVEL_SPRITE);
        
	    this.setAnchorPoint(cc.p(0,0));
        return true;
    },
    shining:function(ijArray,bright){
        if(!bright){
            bright=255;
        }else{
            bright=Math.floor(255*bright);
        }
        var self=this;
        var xyArray=_.map(ijArray,function(ij){
            return self.pCenter(ij.i,ij.j);
        })
        this.testNode.clear();
        this.testNode.drawDot(xyArray[0],this.dx/3,cc.color(bright,bright,bright));
        /*
        this.testNode.runAction(cc.sequence(
            cc.fadeOut(0.5),
            cc.callFunc(function(){
                self.testNode.clear();
                self.testNode.attr({
                    opacity:255
                });
            })
        ));*/
    },
    setScore:function(score){
        this.scoreNode.setString(String(score));
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
        this.dx=(size.height-this.baseX*2)/(this.iLength);
        this.dy=this.dx;

        this.setPosition(cc.p(this.baseX,this.baseY));

        this.userInputCtrl.cancel();
        
	    this.areaNode.render();
        this.scoreNode.attr({
            x:size.width-this.baseX,
            y:size.height-this.baseY,
            anchorX:1,
            anchorY:1
        });
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
    pFloat:function(i,j){
	    var cellXY=(function(i,j){
	        var xx=j;
	        var yy=this.iLength-i;
	        return cc.p(xx,yy);
        }).call(this,i,j);
	    return cc.p(cellXY.x*this.dx,cellXY.y*this.dy)
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
    getUnitNode:function(){
        return this.unitNode;
    },
    destroy:function(){
        this.userInputCtrl.cancel();
        this.areaNode.destroy();
    }
});

gMove.MainScene = cc.Scene.extend({
    gameLayer:null,
    scriptMenu:null,
    
    bind:function(gameTop){
	    this.gameLayer=gameTop.getModule("viewModule").gameLayer;
    },
    onEnter:function () {
        this._super();
        this.addChild(this.gameLayer,1);
    }
});


