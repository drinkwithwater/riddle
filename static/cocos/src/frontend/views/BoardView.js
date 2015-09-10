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
    triggerRangeView:null,
    transferRangeView:null,
    constructor:function(aDict){
  	    gViews.BoardView.__super__.constructor.call(this,aDict);
        this.modelManager=aDict.modelManager;
        this.viewManager=aDict.viewManager;
        this.viewActionHandler=aDict.viewActionHandler;
        // this should init after handler setted;
        this.userInputCtrl=new gViews.UserInputCtrl(this);
        this.triggerRangeView=new gViews.TriggerRangeView(this);
        this.transferRangeView=new gViews.TransferRangeView(this);
    },
    initialize:function(){
        this.template=_.template(gTemplates.board);
    },

    // from board template layout {{
    listenerArea$:function(_pointArgs){
        var $listener=this.$listener
            =this.$listener||this.$(".boardChild.listener");
        var pos=gPoint.wrapArgs(arguments);
        return $listener.find("tr.tr"+pos.i+" td.td"+pos.j+" .listenerArea");
    },
    positionArea$:function(_pointArgs){
        var $position=this.$position
            =this.$position||this.$(".boardChild.position");
        var pos=gPoint.wrapArgs(arguments);
        return $position.find("tr.tr"+pos.i+" td.td"+pos.j+" .positionArea");
    },
    lightArea$:function(_pointArgs){
        var $light=this.$light
            =this.$light||this.$(".boardChild.light");
        var pos=gPoint.wrapArgs(arguments);
        return $light.find("tr.tr"+pos.i+" td.td"+pos.j+" .lightArea");
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
    cellPos:function(_pointArgs){
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

    render:function(){
        var self=this;
        var mazeJson=this.modelManager.maze$().toJSON();
        this.$el.addClass("board");
        this.$el.html(this.template(mazeJson));

        this.userInputCtrl.render();
        this.triggerRangeView.render();
        this.transferRangeView.render();

        return this;
    },
    afterRender:function(){
        this.userInputCtrl.cancel();
        
        // set svg width & height by rendered ui
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
        // refresh trigger range
        this.refreshTriggerRange();
        this.refreshLight();
        return this;
    },
    refreshTriggerRange:function(){
        var triggerRangeView=this.triggerRangeView;
        var transferRangeView=this.transferRangeView;
        var triggerAreas=[];
        var transferAreas=[];
        _.each(this.modelManager.unitDict,function(unitModel){
            if(unitModel.getCategory()==="trigger"){
                var thisRanges=unitModel.triggerRange();
                triggerAreas=triggerAreas.concat(thisRanges);
            }else if(unitModel.getCategory()==="transfer"){
                var thisRanges=unitModel.triggerRange();
                transferAreas=transferAreas.concat(thisRanges);
            }
        });
        triggerRangeView.display(triggerAreas);
        transferRangeView.display(transferAreas);
    },
    refreshLight:function(){
        var mazeModel=this.modelManager.maze$();
        var thisVar=this;
        mazeModel.forEachLight(function(light,pos){
            if(!light){
                thisVar.lightArea$(pos).addClass("dark");
            }
        });
    },

    mouseDownArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=Number($listener.attr("data-i"));
        var j=Number($listener.attr("data-j"));
        if(e.button==0){
            var area={i:i,j:j};
            this.userInputCtrl.mouseDown(area);
        }else if(e.button=2){
            // TODO right click down
            var area={i:i,j:j};
            this.userInputCtrl.cancel(area);
        }
    },
    mouseUpArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=Number($listener.attr("data-i"));
        var j=Number($listener.attr("data-j"));
        if(e.button==0){
            var area={i:i,j:j};
            this.userInputCtrl.mouseUp(area);
        }else if(e.button=2){
            // TODO right click up
            var area={i:i,j:j};
            this.userInputCtrl.cancel(area);
        }
    },

    mouseEnterArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=Number($listener.attr("data-i"));
        var j=Number($listener.attr("data-j"));
        var area={i:i,j:j};
        this.userInputCtrl.mouseEnter(area);
    },

    mouseLeaveArea:function(e){
        var $listener=this.$(e.target).closest(".listenerArea");
        var i=Number($listener.attr("data-i"));
        var j=Number($listener.attr("data-j"));
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
});
