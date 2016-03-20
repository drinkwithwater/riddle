//dependence:underscore
module.exports=function(env){
    var gPoint=env.gPoint=env.gPoint||{};
    gPoint.checkContinuous=function(path){
        for(var i=0,length=path.length;i<length-1;i++){
            var a=path[i];
            var b=path[i+1];
            if(gPoint.maDistance(a,b)!=1){
                return false;
            }
        }
        return true;
    }
    gPoint.isPoint=function(obj){
        if(typeof(obj.i)!="number"){return false;}
        if(typeof(obj.j)!="number"){return false;}
        return true;
    }
    gPoint.isPointArray=function(path){
        //TODO
        console.log("point array TODO");
        return true;
    }
    gPoint.wrapPoint=function(){
        var point={}
        if(arguments.length==1){
            point.i=arguments[0].i;
            point.j=arguments[0].j;
            return point;
        }else if(arguments.length=2){
            point.i=arguments[0];
            point.j=arguments[1];
            return point;
        }else{
            console.error("arguments unexcepted");
            return ;
        }
    }
    gPoint.wrapArgs=function(args,index){
        var index=index||0;
        var point={};

        var tailArgs=_.rest(args,index);
        if(tailArgs.length==2){
            point.i=tailArgs[0];
            point.j=tailArgs[1];
            return point;
        }else if(tailArgs.length==1){
            point.i=tailArgs[0].i;
            point.j=tailArgs[0].j;
            return point;
        }else{
            console.error("arguments unexcepted");
            return ;
        }
    }
    gPoint.maDistance=function(pa,pb){
        var abs=Math.abs;
        return abs(pa.i-pb.i)+abs(pa.j-pb.j);
    }
    gPoint.euDistance=function(pa,pb){
        var di=pa.i-pb.i;
        var dj=pa.j-pb.j;
        return Math.sqrt(di*di+dj*dj);
    }
    // from from+d,from+2d,...,to-d;
    // d=(0,1) or (1,0) or (-1,0) or (0,-1)
    gPoint.range=function(from,to){
        var path=[{i:from.i,j:from.j}];
        if(from.i!=to.i && from.j==to.j){
            var j=from.j;
            var di=(from.i<to.i?1:-1);
            for(var i=from.i+di;i!=to.i;i+=di){
                path.push({i:i,j:j})
            }
        }else if(from.j!=to.j && from.i==to.i){
            var i=from.i;
            var dj=(from.j<to.j?1:-1);
            for(var j=from.j+dj;j!=to.j;j+=dj){
                path.push({i:i,j:j})
            }
        }else return null;
        return path;
    }
    // e.g. radioRange((0,0),1)=
    // [(0,0),(1,0),(0,1),(-1,0),(0,-1)]
    gPoint.radioRange=function(center,range){
        if(range<=0) return [{i:center.i,j:center.j}];
        var rangeArray=[];
        // i=0;
        for(var j=-range;j<=range;j++){
            rangeArray.push({
                i:center.i,
                j:center.j+j
            });
        }
        // i:[1,range]+[-range,-1]
        for(var i=1;i<=range;i++){
            for(var j=-(range-i);j<=range-i;j++){
                rangeArray.push({
                    i:center.i+i,
                    j:center.j+j
                });
                rangeArray.push({
                    i:center.i-i,
                    j:center.j+j
                });
            }
        }
        return rangeArray;
    }
    // return (0,+-1) (+-1,0) (+-1,+-1)
    gPoint.direct=function(srcPoint,dstPoint){
        var di=dstPoint.i-srcPoint.i;
        var dj=dstPoint.j-srcPoint.j;
        if(di==0 && dj==0){
            return null;
        }else{
            var iplusj=di+dj;
            var iminusj=di-dj;
            // excited!!!
            iplusj=iplusj==0?0:(iplusj>0?1:-1);
            iminusj=iminusj==0?0:(iminusj>0?1:-1);
            di=(iplusj+iminusj);
            dj=(iplusj-iminusj);
            di=di==0?0:(di>0?1:-1);
            dj=dj==0?0:(dj>0?1:-1);
            return {i:dj,i:dj};
        }
    }
    // eliminate center
    gPoint.inDirect=function(delta,direct){
        if(direct.i===0){
            var pointDirect=gPoint.direct({i:0,j:0},delta);
            return pointDirect.j===direct.j;
        }else if(direct.j===0){
            var pointDirect=gPoint.direct({i:0,j:0},delta);
            return pointDirect.i===direct.i;
        }else{
            var di=delta.i;
            var dj=delta.j;
            if(di===0){
                dj=dj==0?0:(dj>0?1:-1);
                return dj===direct.j;
            }else if(dj===0){
                di=di==0?0:(di>0?1:-1);
                return di===direct.i;
            }else{
                di=di>0?1:-1;
                dj=dj>0?1:-1;
                return di===direct.i && dj===direct.j;
            }
        }
    }
    gPoint.directRange=function(center,direct,range){
        console.log("not implement");
    }
    // canMoveFunc =function(i,j){return true or false;}
    gPoint.shortestPath=function(from,to,canMoveFunc){
        var src={i:from.i, j:from.j};
        var dst={i:to.i, j:to.j};
        
        var hash=function(node){
            return node.i*1000+node.j;
        }
        var reHash=function(h){
            return {
                i:Math.floor(h/1000),
                j:h%1000
            }
        }
        src.g=0;
        src.h=gPoint.maDistance(src,dst);
        src.pre=null;
        var openFirst=0;
        var openLast=0;
        var open=[src];
        var getSmallestIndex=function(){
            var temp=open[openFirst];
            var index=openFirst;
            for(var i=openFirst+1;i<=openLast;i++){
                var point=open[i];
                if(point.g+point.h<temp.g+temp.h){
                    temp=point;
                    index=i;
                }
            }
            return index;
        }
        var closeHash={};
        var self=this;
        var expand=function(index){
            var point=open[index];
            var expandList=[
                {i:point.i+1,j:point.j},
                {i:point.i-1,j:point.j},
                {i:point.i,j:point.j+1},
                {i:point.i,j:point.j-1}
            ];
            expandList=_.filter(expandList,function(newPoint){
                var i=newPoint.i;
                var j=newPoint.j;
                if(!canMoveFunc(i,j)) return false;
                if(closeHash[hash(point)]) return false;
                return true;
            });
            _.each(expandList,function(newPoint){
                newPoint.g=point.g+1;
                newPoint.h=gPoint.maDistance(newPoint,dst);
                newPoint.pre=point;
                open.push(newPoint);
                openLast++;
            });
            open[index]=open[openFirst];
            open[openFirst]=point;
            openFirst++;
            closeHash[hash(point)]=point;
        }
        while(openFirst<=openLast){
            var chooseIndex=getSmallestIndex();
            var choose=open[chooseIndex];
            if(choose.h==1){
                var re=[dst];
                var temp=choose;
                while(true){
                    re.push(temp);
                    temp=temp.pre;
                    if(temp==null){
                        break;
                    }
                }
                return re.reverse();
            }else{
                expand(chooseIndex);
            }
        }
        return [];
    }
    
    var xyPoint=env.xyPoint=env.xyPoint||{};
    xyPoint.maDistance=function(pa,pb){
        var abs=Math.abs;
        return abs(pa.x-pb.x)+abs(pa.y-pb.y);
    }
    xyPoint.euDistance=function(pa,pb){
        var dx=pa.x-pb.x;
        var dy=pa.y-pb.y;
        return Math.sqrt(dx*dx+dy*dy);
    }
}


