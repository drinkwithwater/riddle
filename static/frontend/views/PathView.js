var gViews=gViews||{}
gViews.FlyPath=gUtil.Class.extend({
    STATE_EMTPY:0,
    STATE_PATHING:1,
    state:0,
    display:true,
    path:[],
    boardView:null,
    constructor:function(boardView){
        this.boardView=boardView;
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
    constructor:function(boardView){
        this.boardView=boardView;
        this.state=this.STATE_EMPTY;
        this.render.boardView=this.boardView;
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
            //check path valid;
            this.cancel(area);
        }
    },
    over:function(area){
        if(this.state==this.STATE_EMPTY){
            //do nothing
        }else if(this.state==this.STATE_PATHING){
            if(this.display){
                this.render.addRender(area,this.path);
            }
            this.path.push(area);
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
            var all="path pathLeft pathRight pathTop pathBottom";
            var boardView=this.boardView;
            _.each(path,function(area){
                boardView.area$(area).removeClass(all);
            });
        },
        //called when add an area
        addRender:function(newArea,beforePath){
            var endArea=_.last(beforePath);
            var direct=this.checkDirect(newArea,endArea);
            var boardView=this.boardView;
            if(direct==this.CHECK_UP){
                boardView.area$(endArea).addClass("pathTop");
                boardView.area$(newArea).addClass("pathBottom");
            }else if(direct==this.CHECK_DOWN){
                boardView.area$(endArea).addClass("pathBottom");
                boardView.area$(newArea).addClass("pathTop");
            }else if(direct==this.CHECK_LEFT){
                boardView.area$(endArea).addClass("pathLeft");
                boardView.area$(newArea).addClass("pathRight");
            }else if(direct==this.CHECK_RIGHT){
                boardView.area$(endArea).addClass("pathRight");
                boardView.area$(newArea).addClass("pathLeft");
            }else if(direct==this.CHECK_EMPTY){
                //do nothing
            }else if(direct==this.CHECK_BREAK){
                //just do this now;
                //the path may be broken
            }
            boardView.area$(newArea).addClass("path");
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