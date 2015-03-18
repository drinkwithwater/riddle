var gViews=gViews||{}
gViews.WalkPath=gUtil.Class.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    CHECK_LEFT:1,
    CHECK_RIGHT:2,
    CHECK_UP:3,
    CHECK_DOWN:4,
    CHECK_EMPTY:5,//
    CHECK_BREAK:6,// not continuous
    state:0,
    display:true,
    path:[],
    boardView:null,
    constructor:function(boardView){
        this.boardView=boardView;
    },
    click:function(area){
        if(this.state==this.STATE_EMPTY){
            this.state==this.STATE_PATHING;
            if(this.display){
                //TODO 
            }else{
                //TODO 
            }
        }else{
            //TODO
            //send message
            //check path valid;
        }
    },
    over:function(area){
        if(this.state==this.STATE_EMPTY){
            //do nothing
        }else{
            this.path.push(area);
            if(this.display){
            }else{
            }
        }
    },
    openDisplay:function(){
    },
    closeDisplay:function(){
    },
    cancel:function(area){
        var allClass="path pathLeft pathRight pathTop pathBottom"
        _.each(path,function(area){
            this.boardView.area$(area).removeClass("allClass");
        });
    },
    addRender:function(area,before){
	    var end=_.last(this.before);
        var direct=this.checkDirect(area);
        var boardView=this.boardView;
        if(direct==this.CHECK_RIGHT){
            boardView.area$(area);
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
            this.area$(area).addClass("path");
        }
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
    //check when pathing
    checkDirect:function(area){
	    var endArea=_.last(this.path);
	    if(!endArea){
	        return this.CHECK_EMPTY;
	    }
	    var di=area.i-endArea.i;
	    var dj=area.j-endArea.j;
	    if(di==0){
	        if(dj==-1) return this.CHECK_RIGHT;
	        if(dj==1) return this.CHECK_LEFT;
	    }
	    if(dj==0){
	        if(di==1) return this.CHECK_UP;
	        if(di==-1) return this.CHECK_DOWN;
	    }
	    return this.CHECK_BREAK;
    }
});
gViews.BoardView=Backbone.View.extend({
    events:{
        "mousedown div.area.listener":"mouseDownArea",
        "mouseenter div.area.listener":"mouseEnterArea",
        "mouseleave div.area.listener":"mouseLeaveArea",
        "mouseleave div.board":"mouseLeaveBoard"
    },
    actionHandler:{
    },
    constructor:function(aDict){
  	    gViews.BoardView.__super__.constructor.call(this,aDict);
        this.actionHandler=aDict.actionHandler||(new gUI.ActionHandler());
    },
    initialize:function(){
        this.template=_.template(gTemplates.board);
    },

    area$:function(){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr#tr"+pos.i+" td#td"+pos.j+" div.area");
    },

    render:function(msg){
        var self=this;
        var boardModel=this.model.toJSON();
        this.$el.html(this.template(boardModel));
        _.each(this.collection.models,function(cell){
            var i=cell.get("i");
            var j=cell.get("j");
            self.$("tr#tr"+i+" td#td"+j+" div.area.viewer").html(new gViews.CellView({model:cell}).render().el);
        },self);
        return this;
    },

    mouseDownArea:function(e){
        var $listener=this.$(e.target).closest("div.listener");
        if(e.button==0){
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.clickArea(area);
        }else if(e.button=2){
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.cancelArea(area);
        }
    },

    mouseEnterArea:function(e){
        var $listener=this.$(e.target).closest("div.listener");
        var i=$listener.attr("data-i");
        var j=$listener.attr("data-j");
        var area={i:i,j:j};
        this.overArea(area);
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
        this.cancelArea(null);
    },

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
    }

});
