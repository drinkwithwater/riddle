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
}


