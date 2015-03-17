//dependence:underscore
module.exports=function(env){
    var gPoint=env.gPoint=env.gPoint||{};
    gPoint.isPoint=function(obj){
        if(typeof(obj.i)!="number"){return false;}
        if(typeof(obj.j)!="number"){return false;}
        return true;
    }
    gPoint.isPointArray=function(path){
        //TODO
        console.log("TODO");
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
}


