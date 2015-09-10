module.exports=function(env){
    ///{{{
    var gUtil=env.gUtil=env.gUtil||{}
    //check if path is continuous
    //path:[{i:1,j:2}]
    gUtil.continuous=function(path){
        for(var i=0,l=path.length;i+1<l;i++){
            a=path[i];
            b=path[i+1];
            if(a.i===b.i){
                if(a.j-b.j===1||a.j-b.j===-1) continue;
                else return false;
            }else if(a.j===b.j){
                if(a.i-b.i===1||a.i-b.i===-1) continue;
                else return false;
            }else{
                return false;
            }
        }
        return true;
    }
    gUtil.abs=function(a){
	    return (a>=0?a:-a);
    }
    gUtil.posAbs=function(a,b){
        var l=a.i-b.i;
        var w=a.j-b.j;
        l=(l>=0?l:-l);
        w=(w>=0?w:-w);
        return l+w;
    }
    //}}}
};
