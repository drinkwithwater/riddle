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
gViews.BoardView=Backbone.View.extend({
    events:{
        "mousedown div.area.listener":"mouseDownArea",
        "mouseenter div.area.listener":"mouseEnterArea",
        "mouseleave div.area.listener":"mouseLeaveArea",
        "mouseleave div.board":"mouseLeaveBoard",
        "mousemove div.boardChild.listener":"mouseMoveBoard"
    },
    actionHandler:{
    },
    walkPath:null,
    flyPath:null,
    constructor:function(aDict){
  	    gViews.BoardView.__super__.constructor.call(this,aDict);
        this.walkPath=new gViews.WalkPath(this);
        this.flyPath=new gViews.WalkPath(this);
        this.actionHandler=aDict.actionHandler||(new gUI.ActionHandler());
    },
    initialize:function(){
        this.template=_.template(gTemplates.board);
    },

    area$:function(){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr#tr"+pos.i+" td#td"+pos.j+" div.area.viewer");
    },
    listenerArea$:function(){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr#tr"+pos.i+" td#td"+pos.j+" div.area.listener");
    },
    viewerArea$:function(){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr#tr"+pos.i+" td#td"+pos.j+" div.area.viewer");
    },
    line$:function(){
        return this.$("#pathingline");
    },
    drawer$:function(){
        return this.$(".boardChild.drawer svg");
    },

    render:function(msg){
        var self=this;
        var boardModel=this.model.toJSON();
        this.$el.html(this.template(boardModel));
        // add cell
        _.each(this.collection.models,function(cell){
            var i=cell.get("i");
            var j=cell.get("j");
            self.$("tr#tr"+i+" td#td"+j+" div.area.viewer").html(new gViews.CellView({model:cell}).render().el);
        },self);

        // set drawer width height
        return this;
    },
    afterRender:function(){
        var width=this.$(".boardChild.listener").width();
        var height=this.$(".boardChild.listener").height();
        this.$(".boardChild.drawer svg").width(width);
        this.$(".boardChild.drawer svg").height(height);
    },

    mouseDownArea:function(e){
        var $listener=this.$(e.target).closest("div.listener");
        if(e.button==0){
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.walkPath.click(area);
        }else if(e.button=2){
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.walkPath.cancel(area);
        }
    },

    mouseEnterArea:function(e){
        var $listener=this.$(e.target).closest("div.listener");
        var i=$listener.attr("data-i");
        var j=$listener.attr("data-j");
        var area={i:i,j:j};
        this.walkPath.over(area);
        this.area$(area).addClass("focus");
    },

    mouseLeaveArea:function(e){
        var $listener=this.$(e.target).closest("div.listener");
        var i=$listener.attr("data-i");
        var j=$listener.attr("data-j");
        var area={i:i,j:j};
        this.area$(area).removeClass("focus");
    },

    mouseLeaveBoard:function(e){
        this.walkPath.cancel(null);
    },

    mouseMoveBoard:function(e){
        this.line$().attr("x2",e.pageX
                          -this.drawer$().offset().left);
        this.line$().attr("y2",e.pageY
                          -this.drawer$().offset().top);
    },
    /*

    //detail operator
    pathing:{
        STATE_EMPTY:0,
        STATE_PATHING:1,
        CHECK_LEFT:1,
        CHECK_RIGHT:2,
        CHECK_UP:3,
        CHECK_DOWN:4,
        CHECK_EMPTY:5,//
        CHECK_BREAK:6,// not continuous
        state:0,
        pathes:[],
        getStart:function(){
	        return this.pathes[0];
        },
        getEnd:function(){
	        return this.pathes[this.pathes.length-1];
        },
        getChoose:function(){
	        return this.getStart();
        },
        checkExisted:function(area){
            for(var pi=0,length=this.pathes.length;pi<length;pi++){
	            var point=this.pathes[pi];
	            if(point.i==area.i && point.j==area.j){
		            return true;
	            }
            }
            return false;
        },
        checkDirect:function(area){
	        var endArea=this.getEnd();
	        if(!endArea){
		        return this.CHECK_EMPTY;
	        }
	        var di=area.i-endArea.i;
	        var dj=area.j-endArea.j;
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
    },
    overArea:function(area){
        var pathing=this.pathing;
        if(pathing.state==pathing.STATE_PATHING){
            if(pathing.checkExisted(area)){
	            this.cancelArea(area);
	            return;
            }
            //if cell can arrive: //TODO
            //else: this.cancelArea(area); return
            var end=pathing.getEnd();
            var direct=pathing.checkDirect(area);
            if(direct==pathing.CHECK_BREAK){
	            this.cancelArea(area);
	            return;
            }else if(direct==pathing.CHECK_UP){
	            this.area$(end).addClass("pathTop");
	            this.area$(area).addClass("pathBottom");
            }else if(direct==pathing.CHECK_DOWN){
	            this.area$(end).addClass("pathBottom");
	            this.area$(area).addClass("pathTop");
            }else if(direct==pathing.CHECK_LEFT){
	            this.area$(end).addClass("pathLeft");
	            this.area$(area).addClass("pathRight");
            }else if(direct==pathing.CHECK_RIGHT){
	            this.area$(end).addClass("pathRight");
	            this.area$(area).addClass("pathLeft");
            }
            pathing.pathes.push(area);
            this.area$(area).addClass("path");
        }else{
        }
    },
    clickArea:function(area){
        var pathing=this.pathing;
        if(pathing.state==pathing.STATE_PATHING){
            //if cell can arrive: //TODO
            //move or attack
            //else: this.cancelArea(area);
            this.actionHandler.onPathing(pathing.pathes);
            this.cancelArea(area);
        }else{
            //if cell can path: //TODO
            pathing.state=pathing.STATE_PATHING;
            pathing.pathes=[area];
            this.area$(area).addClass("path");
        }
    },
    cancelArea:function(area){
        var pathing=this.pathing;
        if(pathing.state==pathing.STATE_PATHING){
            for(var pi=0,l=pathing.pathes.length;pi<l;pi++){
                var areaPoint=pathing.pathes[pi];
                this.area$(areaPoint).removeClass("path");
                this.area$(areaPoint).removeClass("pathBottom");
                this.area$(areaPoint).removeClass("pathTop");
                this.area$(areaPoint).removeClass("pathRight");
                this.area$(areaPoint).removeClass("pathLeft");
            }
            pathing.pathes=[];
            pathing.state=pathing.STATE_EMPTY;
        }else{
        }
    }*/

});
