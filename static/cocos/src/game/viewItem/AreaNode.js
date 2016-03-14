var gameView=gameView||{};
gameView.AreaNode = cc.Node.extend({
    LEVEL_AREA:1,
    gameLayer:null,
    areaDraw:null,
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        
        this.areaDraw=new cc.DrawNode();
        this.addChild(this.areaDraw,this.LEVEL_AREA);
    },
    render:function(){
        this.showArea();
    },
    destroy:function(){
        this.areaDraw.clear();
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
});

