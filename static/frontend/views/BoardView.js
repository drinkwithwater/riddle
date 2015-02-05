var gViews=gViews||{}
gViews.BoardView=Backbone.View.extend({
  events:{
    "mousedown div.area":"mouseDown",
    "mouseenter div.area":"enterArea",
    "mouseleave div.area":"leaveArea",
    "mouseleave table.board":"leaveBoard"
  },
  actionHandler:{
  },
  constructor:function(aDict){
  	gViews.BoardView.__super__.constructor.call(this,aDict);
    this.actionHandler=aDict.actionHandler||(new gUI.ActionHandler());
  },
  initialize:function(){
    this.template=_.template(gTemplates.board);
    //this.model.bind("change",this.render,this);
    //this.cells;
    if(!this.model){
      console.warn("gViews.BoardView init without model");
    }
    if(!this.collection){
      console.warn("gViews.BoardView init without collection");
    }
  },

  area$:function(){
    var i=null;
    var j=null;
    if(arguments.length==1){
      if(typeof(arguments[0])=="object"){
        i=arguments[0].i;
        j=arguments[0].j;
      }
    }else if(arguments.length==2){
      i=arguments[0];
      j=arguments[1];
    }
    if(i && j){
      return this.$("tr#tr"+i+" td#td"+j+" div.area");
    }else{
      return this.$();
    }
  },

  render:function(msg){
    var self=this;
    var boardModel=this.model.toJSON();
    this.$el.html(this.template(boardModel));
    _.each(this.collection.models,function(cell){
      var i=cell.get("i");
      var j=cell.get("j");
      this.$("tr#tr"+i+" td#td"+j+" div.area").html(new gViews.CellView({model:cell}).render().el);
    },this);
    return this;
  },

  mouseDown:function(e){
    var $area=this.$(e.target).closest("div.area");
    if(e.button==0){
      var i=$area.attr("data-i");
      var j=$area.attr("data-j");
      this.clickArea({i:i,j:j});
    }else if(e.button=2){
      var i=$area.attr("data-i");
      var j=$area.attr("data-j");
      this.cancelArea({i:i,j:j});
    }
  },

  enterArea:function(e){
    var $area=$(e.target).closest("div.area");
    var i=$area.attr("data-i");
    var j=$area.attr("data-j");
    $area.addClass("focus");
    this.overArea({i:i,j:j});
  },

  leaveArea:function(e){
    var $area=$(e.target).closest("div.area");
    var i=$area.attr("data-i");
    var j=$area.attr("data-j");
    $area.removeClass("focus");
  },

  leaveBoard:function(e){
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
