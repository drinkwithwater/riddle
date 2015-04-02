var gViews=gViews||{}
gViews.IPath=new gUtil.Interface({
    render:"",

    click:"",
    over:"",
    mouseMove:"",

    cancel:"",
    
    show:"",
    hide:"",

    getPath:"",
});
gViews.FlyPath=gUtil.Class.extend({
    display:true,
    path:{
        srcPos:{},
        dstPos:{},
    },
    boardView:null,
    viewActionHandler:null,
    constructor:function(boardView){
        this.boardView=boardView;
        this.viewActionHandler=this.boardView.viewActionHandler;
    },
    render:function(){
        this.$el=this.boardView.$("div.boardChild.flyPath")
        this.el=this.$el[0];
        return this;
    },
    start:function(area){
        // set start area
        this.path.srcPos=area;
        // render
        var centerPos=this.boardView.centerPos(area);
        this.line$().attr("x1",centerPos.left);
        this.line$().attr("y1",centerPos.top);
        this.line$().attr("x2",centerPos.left);
        this.line$().attr("y2",centerPos.top);
    },
    overArea:function(area){
        this.path.dstPos=area;
    },
    overPos:function(mousePos){
        this.line$().attr("x2",mousePos.left);
        this.line$().attr("y2",mousePos.top);
    },
    cancel:function(area){
        this.closeRender();
        this.path={srcPos:{},dstPos:{}};
    },
    show:function(area){
        this.$el.show();
    },
    hide:function(area){
        this.$el.hide();
    },
    getPath:function(){
        return this.path;
    },

    /***************************/
    /* not interface functions */
    /***************************/
    
    line$:function(){
        return this.$el.find("line#flyPathLine");
    },
    closeRender:function(){
        this.line$().attr("x1",0);
        this.line$().attr("y1",0);
        this.line$().attr("x2",0);
        this.line$().attr("y2",0);
    }
});
gViews.WalkPath=Backbone.View.extend({
    display:true,
    path:[],
    boardView:null,
    viewActionHandler:null,
    constructor:function(boardView){
        gViews.WalkPath.__super__.constructor.call(this);
        this.boardView=boardView;
        this.viewActionHandler=this.boardView.viewActionHandler;

    },
    render:function(){
        this.$el=this.boardView.$("div.boardChild.walkPath")
        this.el=this.$el[0];
        return this;
    },
    start:function(area){
        // add an area
        this.path.push(area);
        // render
        this.addRender(area,this.path);
    },
    overArea:function(area){
        var srcArea=_.last(this.path);
        var onAreas=this.fill(srcArea,area);
        var thisVar=this;
        _.each(onAreas,function(onArea){
            thisVar.addRender(onArea,thisVar.path);
            thisVar.path.push(onArea);
        });
    },
    overPos:function(mousePos){
    },
    cancel:function(area){
        this.closeRender(this.path);
        this.path=[];
    },
    show:function(){
        this.display=true;
        this.$el.show();
    },
    hide:function(){
        this.display=false;
        this.$el.hide();
    },
    getPath:function(){
        return this.path;
    },

    /***************************/
    /* not interface functions */
    /***************************/

    //check if pathes contain area
    checkExisted:function(area){
        for(var pi=0,length=this.path.length;pi<length;pi++){
	        var point=this.path[pi];
	        if(point.i==area.i && point.j==area.j){
		        return true;
	        }
        }
        return false;
    },

    //if the path isnot continuous fill with some area;
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
    },

    CHECK_LEFT:1,
    CHECK_RIGHT:2,
    CHECK_UP:3,
    CHECK_DOWN:4,
    CHECK_EMPTY:5,//
    CHECK_BREAK:6,// not continuous
    walkPathArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .walkPathArea");
    },
    // remove all render class
    closeRender:function(path){
        _.each(path,function(area){
            this.walkPathArea$(area).find(".walkPathLine").removeClass("choosePath");
        },this);
    },
    // called when add an area
    addRender:function(newArea,beforePath){
        var endArea=_.last(beforePath);
        var direct=this.checkDirect(newArea,endArea);
        if(direct==this.CHECK_UP){
            this.walkPathArea$(endArea).find(".topPath").addClass("choosePath");
            this.walkPathArea$(newArea).find(".bottomPath").addClass("choosePath");
        }else if(direct==this.CHECK_DOWN){
            this.walkPathArea$(endArea).find(".bottomPath").addClass("choosePath");
            this.walkPathArea$(newArea).find(".topPath").addClass("choosePath");
        }else if(direct==this.CHECK_LEFT){
            this.walkPathArea$(endArea).find(".leftPath").addClass("choosePath");
            this.walkPathArea$(newArea).find(".rightPath").addClass("choosePath");
        }else if(direct==this.CHECK_RIGHT){
            this.walkPathArea$(endArea).find(".rightPath").addClass("choosePath");
            this.walkPathArea$(newArea).find(".leftPath").addClass("choosePath");
        }else if(direct==this.CHECK_EMPTY){
            //do nothing
        }else if(direct==this.CHECK_BREAK){
            //just do this now;
            //the path may be broken
        }
        this.walkPathArea$(newArea).find(".centerPath").addClass("choosePath");
    },
    checkDirect:function(dstArea,srcArea){
	    if(!srcArea){
	        return this.CHECK_EMPTY;
	    }
	    var di=dstArea.i-srcArea.i;
	    var dj=dstArea.j-srcArea.j;
	    if(di==0){
	        if(dj==1) return this.CHECK_RIGHT;
	        if(dj==-1) return this.CHECK_LEFT;
	    }
	    if(dj==0){
	        if(di==-1) return this.CHECK_UP;
	        if(di==1) return this.CHECK_DOWN;
	    }
	    return this.CHECK_BREAK;
    }
});
