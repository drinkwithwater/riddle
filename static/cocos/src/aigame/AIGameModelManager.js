var gAI=gAI||{};
gAI.AIGameModelManager=gUtil.Class.extend({

    name:"modelModule",
    frontendModule:null,
    viewManager:null,

    // component
    mazeModel:null,
    unitModel:null,

    
    iLength:10,
    jLength:14,
    speed:0.5,

    hitCount:0,
    
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.frontendModule=gameTop.getModule("frontendModule");
            this.viewManager=gameTop.getModule("viewModule");
        }

    },

    start:function(gameTop){
        this.unitModel=new gAI.UnitModel(this);
    },
    run:function(){
        this.viewManager.animateUnitSet(this.unitModel.getPos());
    },

    
    //get by id or i,j or pos
    unit$:function(){
        return this.unitModel;
    },
    maze$:function(){
        return this.mazeModel;
    },
    
    runTime:function(time){
        var v=(1+Math.random())*this.speed;
        var angel=Math.random()*Math.PI*2;
        var di=v*Math.cos(angel);
        var dj=v*Math.sin(angel);
        this.unitModel.move(di,dj);
        this.viewManager.animateUnitMove(
            this.unitModel.getPos(),
            time);
    },
    checkIn:function(path,unitPos){
        if(path.length<=3){
            for(var index=1;index<path.length;index++){
                var point=path[index];
                var delta=gPoint.maDistance(point,unitPos);
                if(delta==0){
                    return 0.5;
                }
            }
            return false;
        }else{
            // find mini
            var iarray=_.map(path,function(point){return point.i;});
            var mini=_.min(iarray);
            // find mini's direction
            var state=0;
            for(var index=1;index<path.length;index++){
                var pre=path[index-1];
                var cur=path[index];
                if(pre.i==mini && cur.i==mini){
                    state=cur.j-pre.j;
                    break;
                }
            }
            // check in
            var FirstPoint=function(direct){
                this.direct=direct;
                this.delta=-1;
                this.index=-1;
                this.tryPut=function(point,index,delta){
                    if(!delta){
                        delta=gPoint.maDistance(point,unitPos);
                    }
                    var di=point.i-unitPos.i;
                    var dj=point.j-unitPos.j;
                    var pointDirect={
                        i:di==0?0:(di>0?1:-1),
                        j:dj==0?0:(dj>0?1:-1)
                    }
                    if(pointDirect.i==this.direct.i &&
                       pointDirect.j==this.direct.j){
                        if(this.index==-1){
                            this.delta=delta;
                            this.index=index;
                        }else if(delta<this.delta){
                            this.delta=delta;
                            this.index=index;
                        }
                    }
                }
            }
            var firstPoint=new Array(4);
            firstPoint[0]=new FirstPoint({i:-1,j:0});
            firstPoint[1]=new FirstPoint({i:0,j:1});
            firstPoint[2]=new FirstPoint({i:1,j:0});
            firstPoint[3]=new FirstPoint({i:0,j:-1});
            for(var index=1;index<path.length;index++){
                var point=path[index];
                var delta=gPoint.maDistance(point,unitPos);
                if(delta==0){
                    return 0.5;
                }else{
                    _.each(firstPoint,function(first){
                        first.tryPut(point,index,delta);
                    });
                }
            }
            var increaseCount=0;
            for(var i=0;i<4;i++){
                var pre=i==0?firstPoint[3]:firstPoint[i-1];
                var cur=firstPoint[i];
                if(cur.index==-1){
                    return false;
                }else{
                    if(cur.index>pre.index){
                        increaseCount++;
                    }else{
                        increaseCount--;
                    }
                }
            }
            if(state==1){
                if(increaseCount==2){
                    return 1;
                }else{
                    return false;
                }
            }else if(state==-1){
                if(increaseCount==-2){
                    return 1;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    },
    closurePathing:function(path){
        
        var unitPos=this.unitModel.getPosInt();
        var score=this.checkIn(path,unitPos);
        if(score){
            var ijArray=[this.unitModel.getPosInt()];
            this.hitCount+=score;
            this.viewManager.animateTest(ijArray,score);
            //this.viewManager.animateShowScore(this.hitCount);
        }
    },
    rectCheckIn:function(min,max,pos){
        var iIn=min.i<pos.i && pos.i<max.i;
        var jIn=min.j<pos.j && pos.j<max.j;
        var iOn=min.i==pos.i || pos.i==max.i;
        var jOn=min.j==pos.j || pos.j==max.j;
        if(iIn && jIn){
            return 1;
        }else if(iOn && jIn){
            return 0.5;
        }else if(iIn && jOn){
            return 0.5;
        }else if(iOn && jOn){
            return 0.5;
        }else{
            return 0;
        }
    },
    rectWrap:function(min,max){
        var unitPos=this.unitModel.getPosInt();
        var score=this.rectCheckIn(min,max,unitPos);
        if(score){
            var ijArray=[this.unitModel.getPosInt()];
            this.hitCount+=score;
            this.viewManager.animateTest(ijArray,score);
            //this.viewManager.animateShowScore(this.hitCount);
        }
    },
    destroy:function(){
    }
});

gAI.UnitModel=gUtil.Class.extend({
    i:0,
    j:0,
    modelManager:null,
    cellIn:2,
    constructor:function(modelManager){
        this.modelManager=modelManager;
        this.i=modelManager.iLength/2;
        this.j=modelManager.jLength/2;
    },
    move:function(di,dj){
        var i=this.i+di;
        var j=this.j+dj;
        if(i>=this.modelManager.iLength-this.cellIn || i<=this.cellIn){
            this.i-=di;
        }else {
            this.i+=di;
        }
        if(j>=this.modelManager.jLength-this.cellIn || j<=this.cellIn){
            this.j-=dj;
        }else{
            this.j+=dj;
        }
    },
    getPos:function(){
        return {i:this.i,j:this.j};
    },
    getPosInt:function(){
        return {
            i:Math.floor(this.i),
            j:Math.floor(this.j)
        };
    }
});