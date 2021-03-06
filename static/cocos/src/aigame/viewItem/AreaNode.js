var gAI=gAI||{};
gAI.AreaNode = cc.Node.extend({
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
        var side=2;
        this.areaDraw.clear();
        var gameLayer=this.gameLayer;
	    var iLength=gameLayer.iLength;
	    var jLength=gameLayer.jLength;
	    var draw=this.areaDraw;
	    for(var i=0;i<iLength;i++){
		    for(var j=0;j<jLength;j++){
                if(i<side || j<side || i>iLength-1-side || j>jLength-1-side){
			        var fillColor=(i+j)%2==0?cc.color(255,255,0,50):cc.color(255,0,0,50);
                }else{
			        var fillColor=(i+j)%2==0?cc.color(255,255,0,30):cc.color(255,0,0,30);
                }
			    draw.drawRect(gameLayer.pLeftBottom(i,j),gameLayer.pRightTop(i,j),fillColor,0);
		    }
	    }
    }
});

