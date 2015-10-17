var gViews=gViews||{};
gViews.AreaNode = cc.Node.extend({
    LEVEL_AREA:1,
    LEVEL_RANGE:2,
    gameLayer:null,
    gameTop:null,
    areaDraw:null,
    rangeDraw:null,
    modelManager:null,
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        this.gameTop=gameTop;
        this.modelManager=gameTop.getModule("modelModule");
        
        this.areaDraw=new cc.DrawNode();
        this.addChild(this.areaDraw,this.LEVEL_AREA);
        
        this.rangeDraw=new cc.DrawNode();
        this.addChild(this.rangeDraw,this.LEVEL_RANGE);
    },
    render:function(){
        this.showArea();
        this.showRange();
    },
    destroy:function(){
        this.areaDraw.clear();
        this.rangeDraw.clear();
    },
    showArea:function(){
        this.areaDraw.clear();
        var gameLayer=this.gameLayer;
	    var iLength=gameLayer.iLength;
	    var jLength=gameLayer.jLength;
	    var draw=this.areaDraw;
	    for(var i=0;i<iLength;i++){
		    for(var j=0;j<jLength;j++){
			    var fillColor=(i+j)%2==0?cc.color(255,255,0,30):cc.color(255,0,0,30);
			    draw.drawRect(gameLayer.pLeftBottom(i,j),gameLayer.pRightTop(i,j),fillColor,0);
		    }
	    }
    },
    showRange:function(){
        var triggerAreas=[];
        _.each(this.modelManager.unitDict,function(unitModel){
            if(unitModel.getCategory()==="trigger"){
                var thisRanges=unitModel.triggerRange();
                triggerAreas=triggerAreas.concat(thisRanges);
            }else if(unitModel.getCategory()==="transfer"){
                // TODO
                /*
                var thisRanges=unitModel.triggerRange();
                transferAreas=transferAreas.concat(thisRanges);
                */
            }
        });
        var gameLayer=this.gameLayer;
        var cellSize=gameLayer.cellSize();
        var radius=(cellSize.width+cellSize.height)/8;
        var draw=this.rangeDraw;
        draw.clear();
        for(var i=0,l=triggerAreas.length;i<l;i++){
			var fillColor=cc.color(255,0,0,30);
            var area=triggerAreas[i];
            if(gameLayer.valid(area.i,area.j)){
			    draw.drawDot(gameLayer.pCenter(area.i,area.j),radius,fillColor);
            }
        }
    },
    actionRefreshRange:function(){
        var self=this;
        var action=new gViews.Action(this,cc.callFunc(function(){
            self.showRange();
        }));
        this.gameLayer.actionQueue.enqueue(action);
    }
});

