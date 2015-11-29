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
}


