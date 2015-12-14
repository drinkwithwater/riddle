var gMove=gMove||{};
gMove.MoveGameModelManager=gUtil.Class.extend({

    name:"modelModule",
    frontendModule:null,
    viewManager:null,

    
    iLength:6,
    jLength:8,

    score:0,
    tempScore:0,
    maxTempScore:0,
    trailModel:null,
    
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.frontendModule=gameTop.getModule("frontendModule");
            this.viewManager=gameTop.getModule("viewModule");
        }

    },

    // use A*
    shortpath:function(src,dst){
        var hash=function(node){
            return node.i*100+node.j;
        }
        var reHash=function(h){
            return {
                i:Math.floor(h/100),
                j:h%100
            }
        }
        src.g=0;
        src.h=gPoint.maDistance(src,dst);
        src.pre=null;
        var openFirst=0;
        var openLast=0;
        var open=[src];
        var getSmallestPoint=function(){
            var temp=open[openFirst];
            for(var i=openFirst+1;i<=openLast;i++){
                var point=open[i];
                if(temp.g+temp.h<point.g+point.h){
                    temp=point;
                }
            }
            return temp;
        }
        var closeHash={};
        var self=this;
        var expand=function(point){
            var expandList=[
                {i:point.i+1,j:point.j},
                {i:point.i-1,j:point.j},
                {i:point.i,j:point.j+1},
                {i:point.i,j:point.j-1}
            ];
            expandList=_.filter(expandList,function(newPoint){
                var i=newPoint.i;
                var j=newPoint.j;
                if(!self.valid(i,j)) return false;
                if(self.trailModel.trailContain(i,j)) return false;
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
            openFirst++;
        }
        while(openFirst<=openLast){
            var choose=getSmallestPoint();
            if(choose.h==0){
                // TODO
                var re=[];
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
                expand(choose);
            }
        }
        return [];
    },
    start:function(gameTop){
        this.trailModel=new gMove.TrailModel();
    },
    doShow:function(){
        var trailPath=this.trailModel.getTrailPath();
        var operPath=this.trailModel.getOperPath();
        this.viewManager.animateShowTrailPath(trailPath);
        this.viewManager.animateShowOperPath(operPath);
    },

    
    trail$:function(){
        return this.trailModel;
    },
    valid:function(i,j){
        if(i>=0 && i<this.iLength && j>=0 && j<this.jLength){
            return true;
        }else{
            return false;
        }
    },
    
    doScore:function(increase){
        if(increase){
            this.score+=1;
            this.tempScore+=1;
            if(this.maxTempScore<this.tempScore){
                this.maxTempScore=this.tempScore;
            }
            this.viewManager.animateShowScore(this.score);
            this.viewManager.animateShowTempScore(this.tempScore,this.maxTempScore);
        }else{
            this.tempScore=0;
            this.viewManager.animateShowScore(this.score);
            this.viewManager.animateShowTempScore(this.tempScore,this.maxTempScore);
        }
    },

    startOper:function(i,j){
        this.trailModel.resetOper();
        this.trailModel.oper(i,j);
        this.doShow();
        this.doScore(false);
    },
    moveOper:function(i,j){
        if(this.valid(i,j)){
            if(!this.trailModel.trailContain(i,j)){
                return ;
            }
            var increase=this.trailModel.oper(i,j);
            this.doScore(increase);
            var last=_.last(this.trailModel.getTrailPath());
            var next={};
            while(true){
                var rd=this.randomDirect();
                next.i=last.i+rd.i;
                next.j=last.j+rd.j;
                if(this.valid(next.i,next.j) &&
                   !this.trailModel.trailContain(next.i,next.j)){
                    break;
                }
            }
            this.trailModel.next(next.i,next.j);
            this.doShow();
        }
    },
    randomDirect:function(){
        var a={i:0, j:1};
        var b={i:0, j:-1};
        var c={i:1, j:0};
        var d={i:-1, j:0};
        var r=Math.random()
        if(r<0.25){
            return a;
        }else if(r<0.5){
            return b;
        }else if(r<0.75){
            return c;
        }else {
            return d;
        }
    },
    
    destroy:function(){
    }
});
gMove.TrailModel=gUtil.Class.extend({
    trailPath:null,
    operPath:null,
    constructor:function(){
        this.trailPath=new Array(3);
        this.operPath=[];
        for(var i=0;i<3;i++){
            this.trailPath[i]={
                i:i,
                j:0
            };
        }
    },
    next:function(i,j){
        var temp=_.rest(this.trailPath);
        temp.push({
            i:i,
            j:j
        });
        this.trailPath=temp;
    },
    oper:function(i,j){
        var inTrail=false;
        var inOper=false;
        _.each(this.trailPath,function(point){
            if(point.i==i && point.j==j){
                inTrail=true;
            }
        });
        _.each(this.operPath,function(point){
            if(point.i==i && point.j==j){
                inOper=true;
            }
        });
        if(inTrail && !inOper){
            this.operPath.push({
                i:i,
                j:j
            });
            var restartIndex=this.operPath.length-3;
            restartIndex=restartIndex>=0?restartIndex:0;
            this.operPath=_.rest(this.operPath,restartIndex);
            return true;
        }else{
            this.operPath=[];
            return false;
        }
    },
    getTrailPath:function(){
        return this.trailPath;
    },
    getOperPath:function(){
        return this.operPath;
    },
    trailContain:function(i,j){
        var inTrail=false;
        _.each(this.trailPath,function(point){
            if(point.i==i && point.j==j){
                inTrail=true;
            }
        });
        return inTrail;
    },
    resetOper:function(){
        this.operPath=[]
    },
    isFirst:function(i,j){
        var first=this.trailPath[0];
        return first.i==i && first.j==j;
    },
});
