var gAI=gAI||{}
gAI.PathData=gUtil.Class.extend({
    walkPath:"list",
    
    closurePath:"list",
    closureFlag:false,

    rectMin:"p",
    rectMax:"p",
    
    constructor:function(){
	    gAI.PathData.__super__.constructor.call(this);
	    this.walkPath=new Array();
        this.closureFlag=false;
        this.rectMin={i:100,j:100};
        this.rectMax={i:-1,j:-1};
    },
    start:function(area){
        this.walkPath.push(area);
        this.closureFlag=false;
        this.rectMin={i:area.i,j:area.j};
        this.rectMax={i:area.i,j:area.j};
    },
    rectPush:function(area){
        this.rectMin.i=Math.min(area.i,this.rectMin.i);
        this.rectMin.j=Math.min(area.j,this.rectMin.j);
        this.rectMax.i=Math.max(area.i,this.rectMax.i);
        this.rectMax.j=Math.max(area.j,this.rectMax.j);
    },
    overArea:function(area){
        // calculate walk path
        var srcArea=_.last(this.walkPath);
        var onAreas=this.fill(srcArea,area);
        var thisVar=this;
        var path=this.walkPath;
        for(var areaIndex=0,areaLength=onAreas.length;areaIndex<areaLength;areaIndex++){
            var onArea=onAreas[areaIndex];
            
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
                this.rectPush(onArea);
            }else{
                path.push(onArea);
                this.rectPush(onArea);
                var closurePath=path.slice(occurredIndex,path.length);
                if(closurePath.length>=2){
                    this.closurePath=closurePath;
                    this.closureFlag=true;
                    break;
                }else{
                    this.walkPath=path.slice(0,occurredIndex+1);
                }
            }
        }
    },
    cancel:function(){
        this.walkPath=[];
        this.closureFlag=false;
        this.rectMin={i:100,j:100};
        this.rectMax={i:-1,j:-1};
    },
    isClosed:function(){
        return this.closureFlag;
    },
    getWalkPath:function(){
        return this.walkPath;
    },
    getWalkFlyPath:function(range){
        var range=range||0;
        var walkPath=this.walkPath;
        var length=walkPath.length;
        if(length>=range+1){
            return {
                walk:walkPath.slice(0,length-range),
                fly:walkPath.slice(length-range-1)
            };
        }else{
            return {
                walk:[],
                fly:walkPath
            };
        }
    },
    
    getCircleClosurePath:function(){
        return this.closurePath;
    },
    
    getRect:function(){
        return {
            min:this.rectMin,
            max:this.rectMax
        }
    },
    getRectSize:function(){
        return gPoint.maDistance(this.rectMin,this.rectMax);
    },
    getRectClosurePath:function(){
        return this.rectRange(this.rectMin,this.rectMax);
    },

    outLine:function(){
        if(this.walkPath.length<=1){
            return false;
        }else{
            var first=this.walkPath[0];
            var second=this.walkPath[1];
            if(second.j==first.j){
                if(this.rectMax.j-first.j>1) return true;
                if(this.rectMin.j-first.j<-1) return true;
                return false;
            }else if(second.i==first.i){
                if(this.rectMax.i-first.i>1) return true;
                if(this.rectMin.i-first.i<-1) return true;
                return false;
            }else{
                return true;
            }
        }
    },
    getLineRange:function(){
        if(this.walkPath.length<=1){
            return undefined;
        }else{
            var first=this.walkPath[0];
            var second=this.walkPath[1];
            if(second.j==first.j){
                var jList=[first.j-1,first.j+1];
                var iList=second.i>first.i?
                    [first.i,this.rectMax.i]:[this.rectMin.i,first.i];
                return {
                    iList:iList,
                    jList:jList
                }
            }else if(second.i==first.i){
                var iList=[first.i-1,first.i+1];
                var jList=second.j>first.j?
                    [first.j,this.rectMax.j]:[this.rectMin.j,first.j];
                return {
                    iList:iList,
                    jList:jList
                }
            }else{
                return undefined;
            }
        }
    },
    getLineRect:function(){
        var ijList=this.getLineRange();
        if(ijList){
            var iList=ijList.iList;
            var jList=ijList.jList;
            var min={
                i:iList[0],
                j:jList[0]
            };
            var max={
                i:iList[1],
                j:jList[1]
            };
            return {max:max,min:min};
        }else {
            return undefined;
        }
    },
    getLineClosurePath:function(){
        var ijList=this.getLineRange();
        if(ijList){
            var iList=ijList.iList;
            var jList=ijList.jList;
            var a={
                i:iList[0],
                j:jList[0]
            };
            var b={
                i:iList[1],
                j:jList[1]
            };
            return this.rectRange(a,b);
        }else {
            return [];
        }
        
    },

    /***************************/
    /* not interface functions */
    /***************************/

    //check if pathes contain area
    checkExisted:function(area,range){
        var range=range||0;
        for(var pi=0,length=this.walkPath.length-range;pi<length;pi++){
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
    },
    rectRange:function(min,max){
        var re=[];
        
        var maxi=max.i;
        var maxj=max.j;
        
        var mini=min.i;
        var minj=min.j;
        
        re=re.concat(gPoint.range({
            i:mini,
            j:minj
        },{
            i:mini,
            j:maxj+1
        }));
        
        re=re.concat(gPoint.range({
            i:mini,
            j:maxj
        },{
            i:maxi+1,
            j:maxj
        }));
        
        re=re.concat(gPoint.range({
            i:maxi,
            j:maxj
        },{
            i:maxi,
            j:minj-1
        }));
        
        re=re.concat(gPoint.range({
            i:maxi,
            j:minj
        },{
            i:mini-1,
            j:minj
        }));
        return re;
    },
});
