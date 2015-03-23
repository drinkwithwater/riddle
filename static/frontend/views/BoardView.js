var gViews=gViews||{}
gViews.BoardView=Backbone.View.extend({
    events:{
        "mousedown .listenerArea":"mouseDownArea",
        "mouseenter .listenerArea":"mouseEnterArea",
        "mouseleave .listenerArea":"mouseLeaveArea",
        "mouseleave div.board":"mouseLeaveBoard",
        "mousemove div.listener":"mouseMoveBoard"
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

    //TODO {{
    listenerArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .listenerArea");
    },
    walkPathArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .walkPathArea");
    },
    floorArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .floorArea");
    },
    positionArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .positionArea");
    },
    //}}
    bulletContainer$:function(){
        var container=this.$(".bulletContainer")
        if(arguments.length==0){
            return container;
        }else{
            var pos=gPoint.wrapArgs(arguments);
            var s="[data-i="+pos.i+"]"+
                  "[data-j="+pos.j+"]";
            return container.find(s);
        }
    },
    cellContainer$:function(){
        var container=this.$(".cellContainer")
        if(arguments.length==0){
            return container;
        }else{
            var pos=gPoint.wrapArgs(arguments);
            var s="[data-i="+pos.i+"]"+
                  "[data-j="+pos.j+"]";
            return container.find(s);
        }
    },
    line$:function(_pointArgs){
        return this.$("#pathingline");
    },
    drawer$:function(_pointArgs){
        return this.$(".boardChild.drawer svg");
    },
    baseAbsPos:function(){
        return this.$(".basePos").offset();
    },
    unitPos:function(_pointArgs){
        var unitAbsPos=
            this.positionArea$.apply(this,arguments).
            find(".unitPos").offset();
        var baseAbsPos=this.baseAbsPos();
        return {left:unitAbsPos.left-baseAbsPos.left,
                top:unitAbsPos.top-baseAbsPos.top};
    },
    centerPos:function(_pointArgs){
    },

    render:function(msg){
        var self=this;
        var boardModel=this.model.toJSON();
        this.$el.html(this.template(boardModel));

        // set drawer width height
        return this;
    },
    afterRender:function(){
        var width=this.$(".boardChild.listener").width();
        var height=this.$(".boardChild.listener").height();
        this.$(".boardChild.drawer svg").width(width);
        this.$(".boardChild.drawer svg").height(height);

        var self=this;
        // add cell
        var cellContainer=this.cellContainer$();
        cellContainer.html("");
        _.each(this.collection.models,function(cell){
            var i=cell.get("i");
            var j=cell.get("j");
            self.$("tr#tr"+i+" td#td"+j+" div.area.viewer").html(new gViews.CellView({model:cell}).render().el);
            var temp=new gViews.CellView({model:cell}).render().$el;
            temp.css("position","absolute");
            temp.css(self.unitPos(i,j));
            temp.attr("data-i",i);
            temp.attr("data-j",j);
            cellContainer.html(temp);
        },self);
    },

    mouseDownArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
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

    focusArea:null,
    mouseEnterArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=$listener.attr("data-i");
        var j=$listener.attr("data-j");
        var area={i:i,j:j};
        this.walkPath.over(area);
        this.focusArea=area;
    },

    mouseLeaveArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=$listener.attr("data-i");
        var j=$listener.attr("data-j");
        var area={i:i,j:j};
    },

    mouseLeaveBoard:function(e){
        this.walkPath.cancel(null);
    },

    mouseMoveBoard:function(e){
        var offsetPosX=e.pageX-this.$(".basePos").offset().left;
        var offsetPosY=e.pageY-this.$(".basePos").offset().top;
        /*
        this.line$().attr("x2",e.pageX
                          -this.drawer$().offset().left);
        this.line$().attr("y2",e.pageY
                          -this.drawer$().offset().top);
                          */
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
