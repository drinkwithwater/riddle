var gViews=gViews||{}
gViews.IPath={
    render:"",

    start:"",
    overArea:"",
    overPos:"",
    cancel:"",

    getWalkPath:"",
    getWalkFlyPath:"",
};
gViews.PathData=gUtil.Class.extend({
    walkPath:"list",
    constructor:function(){
	    gViews.PathData.__super__.constructor.call(this);
	    this.walkPath=new Array();
    },
    start:function(area){
        this.walkPath.push(area);
    },
    overArea:function(area){
        // calculate walk path
        var srcArea=_.last(this.walkPath);
        var onAreas=this.fill(srcArea,area);
        var thisVar=this;
        var path=this.walkPath;
        _.each(onAreas,function(onArea){
            var notOccurred=true;
            var occurredIndex=0;
            for(var pi=0,pLength=path.length;pi<pLength;pi++){
                var pathArea=path[pi];
                if(pathArea.i==onArea.i && pathArea.j==onArea.j){
                    notOccurred=false;
                    occurredIndex=pi;
                    break;
                }
            }
            if(notOccurred){
                path.push(onArea);
            }else{
                thisVar.walkPath=path.slice(0,occurredIndex+1);
            }
        });
    },
    cancel:function(){
        this.walkPath=[];
    },
    getWalkPath:function(){
        return this.walkPath;
    },
    getWalkFlyPath:function(range){
        var walkPath=this.walkPath;
        var length=walkPath.length;
        return {
            walk:walkPath.slice(0,length-range),
            fly:walkPath.slice(length-range-1)
        };
    },

    /***************************/
    /* not interface functions */
    /***************************/

    //check if pathes contain area
    checkExisted:function(area){
        for(var pi=0,length=this.walkPath.length;pi<length;pi++){
	        var point=this.walkPath[pi];
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
    }
});
