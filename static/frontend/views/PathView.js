var gViews=gViews||{}
gViews.FlyPath=gUtil.Class.extend({
    STATE_EMTPY:0,
    STATE_PATHING:1,
    state:0,
    display:true,
    path:[],
    boardView:null,
    viewActionHandler:null,
    constructor:function(boardView){
        this.boardView=boardView;
        this.viewActionHandler=this.boardView.viewActionHandler;

        this.state=this.STATE_EMPTY;
    },
    click:function(area){
        if(this.state==this.STATE_EMPTY){
            this.state=this.STATE_PATHING;
            if(this.display){
            }
            this.path.push(area);
        }else if(this.state==this.STATE_PATHING){
            //TODO
            //send message
            //check path valid;
            this.cancel(area);
        }
    },
    over:function(area){
    },
    cancel:function(area){
    },
    openDisplay:function(area){
    },
    closeDisplay:function(area){
    },
    render:{
    }
});
gViews.WalkPath=gUtil.Class.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    state:0,
    display:true,
    path:[],
    boardView:null,
    viewActionHandler:null,
    constructor:function(boardView){
        this.boardView=boardView;
        this.render.boardView=this.boardView;
        this.viewActionHandler=this.boardView.viewActionHandler;

        this.state=this.STATE_EMPTY;
    },
    click:function(area){
        if(this.state==this.STATE_EMPTY){
            this.state=this.STATE_PATHING;
            if(this.display){
                this.render.addRender(area,this.path);
            }
            this.path.push(area);
        }else if(this.state==this.STATE_PATHING){
            //TODO
            //send message
            this.viewActionHandler.viewPathing(this.path);
            //check path valid;
            console.log(JSON.stringify(this.path));
            this.cancel(area);
        }
    },
    over:function(area){
        if(this.state==this.STATE_EMPTY){
            //do nothing
        }else if(this.state==this.STATE_PATHING){
            var srcArea=_.last(this.path);
            var onAreas=this.fill(srcArea,area);
            var thisVar=this;
            _.each(onAreas,function(onArea){
                if(thisVar.display){
                    thisVar.render.addRender(onArea,thisVar.path);
                }
                thisVar.path.push(onArea);
            });
        }
    },
    openDisplay:function(){
        this.display=true;
        this.render.openRender(this.path);
    },
    closeDisplay:function(){
        this.display=false;
        this.render.closeRender(this.path);
    },
    cancel:function(area){
        if(this.display){
            this.render.closeRender(this.path);
        }
        this.path=[];
        this.state=this.STATE_EMPTY;
    },
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
    render:{
        CHECK_LEFT:1,
        CHECK_RIGHT:2,
        CHECK_UP:3,
        CHECK_DOWN:4,
        CHECK_EMPTY:5,//
        CHECK_BREAK:6,// not continuous
        boardView:null,
        openRender:function(path){
            var beforePath=new Array();
            var render=this;
            _.each(path,function(area){
                render.addRender(area,beforePath);
                beforePath.push(area);
            });
        },
        closeRender:function(path){
            var boardView=this.boardView;
            _.each(path,function(area){
                boardView.walkPathArea$(area).find(".walkPathLine").removeClass("choosePath");
            });
        },
        //called when add an area
        addRender:function(newArea,beforePath){
            var endArea=_.last(beforePath);
            var direct=this.checkDirect(newArea,endArea);
            var boardView=this.boardView;
            if(direct==this.CHECK_UP){
                boardView.walkPathArea$(endArea).find(".topPath").addClass("choosePath");
                boardView.walkPathArea$(newArea).find(".bottomPath").addClass("choosePath");
            }else if(direct==this.CHECK_DOWN){
                boardView.walkPathArea$(endArea).find(".bottomPath").addClass("choosePath");
                boardView.walkPathArea$(newArea).find(".topPath").addClass("choosePath");
            }else if(direct==this.CHECK_LEFT){
                boardView.walkPathArea$(endArea).find(".leftPath").addClass("choosePath");
                boardView.walkPathArea$(newArea).find(".rightPath").addClass("choosePath");
            }else if(direct==this.CHECK_RIGHT){
                boardView.walkPathArea$(endArea).find(".rightPath").addClass("choosePath");
                boardView.walkPathArea$(newArea).find(".leftPath").addClass("choosePath");
            }else if(direct==this.CHECK_EMPTY){
                //do nothing
            }else if(direct==this.CHECK_BREAK){
                //just do this now;
                //the path may be broken
            }
            boardView.walkPathArea$(newArea).find(".centerPath").addClass("choosePath");
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
    }
});
