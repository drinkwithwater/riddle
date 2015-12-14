var gMove=gMove||{};
gMove.TrailNode = cc.Node.extend({
    LEVEL_TRAIL:1,
    LEVEL_OPER:2,
    
    sprite:null,

    trailDraw:null,
    operDraw:null,
    
    gameLayer:null,
    gameTop:null,
    
    ctor:function(gameLayer,gameTop){
        this._super();
        this.gameLayer=gameLayer;
        this.gameTop=gameTop;
        
        this.trailDraw=new cc.DrawNode();
        this.addChild(this.trailDraw, this.LEVEL_TRAIL);
        
        this.operDraw=new cc.DrawNode();
        this.addChild(this.operDraw, this.LEVEL_OPER);
        
        this.attr({
            x:0,
            y:0
        });
    },
    showTrail:function(path){
        this.trailDraw.clear();
        var gameLayer=this.gameLayer;
	    var draw=this.trailDraw;
	    var pre=null;
	    for(var i=0,l=path.length;i<l;i++){
		    if(pre===null){
			    var center=gameLayer.pCenter(path[i].i,path[i].j);
			    draw.drawDot(center,10,cc.color(0,255,0));
			    pre=path[i];
		    }else{
			    var from=gameLayer.pCenter(pre.i,pre.j);
			    var to=gameLayer.pCenter(path[i].i,path[i].j);
			    draw.drawSegment(from,to,5,cc.color(0,255,0));
			    pre=path[i];
		    }
	    }
    },
    showOper:function(path){
        this.operDraw.clear();
        var gameLayer=this.gameLayer;
	    var draw=this.operDraw;
	    var pre=null;
	    for(var i=0,l=path.length;i<l;i++){
		    if(pre===null){
			    var center=gameLayer.pCenter(path[i].i,path[i].j);
			    draw.drawDot(center,5,cc.color(0,255,0));
			    pre=path[i];
		    }else{
			    var from=gameLayer.pCenter(pre.i,pre.j);
			    var to=gameLayer.pCenter(path[i].i,path[i].j);
			    draw.drawSegment(from,to,5,cc.color(255,255,0));
			    pre=path[i];
		    }
	    }
    }
});


