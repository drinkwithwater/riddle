var gViews=gViews||{}
gViews.BoardView=Backbone.View.extend({
    events:{
        "mousedown .listenerArea":"mouseDownArea",
        "mouseup .listenerArea":"mouseUpArea",
        "mouseenter .listenerArea":"mouseEnterArea",
        "mouseleave .listenerArea":"mouseLeaveArea",
        "mouseleave div.listener":"mouseLeaveBoard",
        "mousemove div.listener":"mouseMoveBoard"
    },
    modelManager:null,
    viewManager:null,
    viewActionHandler:null,
    userInputCtrl:null,
    constructor:function(aDict){
  	    gViews.BoardView.__super__.constructor.call(this,aDict);
        this.modelManager=aDict.modelManager;
        this.viewManager=aDict.viewManager;
        this.viewActionHandler=aDict.viewActionHandler;
        //this should init after handler setted;
        this.userInputCtrl=new gViews.UserInputCtrl(this);
    },
    initialize:function(){
        this.template=_.template(gTemplates.board);
    },

    // from board template layout {{
    listenerArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .listenerArea");
    },
    floorArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .floorArea");
    },
    positionArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .positionArea");
    },
    bulletContainer$:function(){
        var container=this.$(".bulletContainer")
        if(arguments.length==0){
            return container;
        }else{
            console.warn("bulletContainer$ not implement for other arguments");
            return container;
            /*
            var pos=gPoint.wrapArgs(arguments);
            var s="[data-i="+pos.i+"]"+
                  "[data-j="+pos.j+"]";
            return container.find(s);*/
        }
    },
    unitContainer$:function(){
        var container=this.$(".unitContainer")
        if(arguments.length==0){
            return container;
        }else{
            var pos=gPoint.wrapArgs(arguments);
            var s="[data-i="+pos.i+"]"+
                  "[data-j="+pos.j+"]"+".unit";
            return container.find(s);
        }
    },
    baseOffset:function(){
        return this.$(".basePos").offset();
    },
    cellPos:function(){
        var cellOffset=
            this.positionArea$.apply(this,arguments).
            find(".cellPos").offset();
        var baseOffset=this.baseOffset();
        return {left:cellOffset.left-baseOffset.left,
                top:cellOffset.top-baseOffset.top};
    },
    centerPos:function(_pointArgs){
        var centerOffset=
            this.positionArea$.apply(this,arguments).
            find(".centerPos").offset();
        var baseOffset=this.baseOffset();
        return {left:centerOffset.left-baseOffset.left,
                top:centerOffset.top-baseOffset.top};
    },
    //}}
    floor$:function(){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .positionArea");
    },

    render:function(){
        var self=this;
        var mazeJson=this.modelManager.maze$().toJSON();
        this.$el.addClass("board");
        this.$el.html(this.template(mazeJson));

        this.userInputCtrl.render();

        return this;
    },
    afterRender:function(){
        // set svg width & height
        var width=this.$(".boardChild.listener").width();
        var height=this.$(".boardChild.listener").height();

        this.$(".boardChild svg").width(width);
        this.$(".boardChild svg").height(height);


        var self=this;
        // add cell
        var unitContainer=this.unitContainer$();
        unitContainer.html("");
        _.each(this.modelManager.unit$(),function(unit){
            var i=unit.get("i");
            var j=unit.get("j");
            var temp=self.viewManager.createUnitView({model:unit,boardView:self}).render().$el;
            temp.attr("data-i",i);
            temp.attr("data-j",j);
            unitContainer.append(temp);
            var cellPos=self.cellPos(i,j);
            temp.css(cellPos);
        },self);
        return this;
    },

    mouseDownArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        if(e.button==0){
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.userInputCtrl.mouseDown(area);
        }else if(e.button=2){
            // TODO right click down
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.userInputCtrl.cancel(area);
        }
    },
    mouseUpArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        if(e.button==0){
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.userInputCtrl.mouseUp(area);
        }else if(e.button=2){
            // TODO right click up
            var i=$listener.attr("data-i");
            var j=$listener.attr("data-j");
            var area={i:i,j:j};
            this.userInputCtrl.cancel(area);
        }
    },

    mouseEnterArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=$listener.attr("data-i");
        var j=$listener.attr("data-j");
        var area={i:i,j:j};
        this.userInputCtrl.mouseEnter(area);
    },

    mouseLeaveArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=$listener.attr("data-i");
        var j=$listener.attr("data-j");
        var area={i:i,j:j};
    },

    mouseLeaveBoard:function(e){
        this.userInputCtrl.mouseLeaveBoard();
    },

    mouseMoveBoard:function(e){
        var left=e.pageX-this.$(".basePos").offset().left;
        var top=e.pageY-this.$(".basePos").offset().top;
        var mousePos={left:left,top:top};
        this.userInputCtrl.mouseMove(mousePos);
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
