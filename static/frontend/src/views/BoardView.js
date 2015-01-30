var gViews=gViews||{}
gViews.BoardView=Backbone.View.extend({
  events:{
    "mousedown div.area":"mouseDown",
    "mouseenter div.area":"enterArea",
    "mouseleave div.area":"leaveArea",
    "mouseleave table.board":"leaveBoard"
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
    state:0,
    pathes:[],
    choose:null,
  },
  overArea:function(area){
    var pathing=this.pathing;
    if(pathing.state==pathing.STATE_PATHING){
      //if cell can arrive: //TODO
      pathing.pathes.push(area);
      this.area$(area).addClass("path");
      //else: this.cancelArea(area);
    }else{
    }
  },
  clickArea:function(area){
    var pathing=this.pathing;
    if(pathing.state==pathing.STATE_PATHING){
      //if cell can arrive: //TODO
      //move or attack
      //else: this.cancelArea(area);
      this.cancelArea(area);
    }else{
      //if cell can path: //TODO
      pathing.state=pathing.STATE_PATHING;
      pathing.pathes=[area];
      pathing.choose=area;
      this.area$(pathing.choose).addClass("path");
      this.area$(pathing.choose).addClass("choose");
    }
  },
  cancelArea:function(area){
    var pathing=this.pathing;
    if(pathing.state==pathing.STATE_PATHING){
      for(var pi=0,l=pathing.pathes.length;pi<l;pi++){
        var areaPoint=pathing.pathes[pi];
        this.area$(areaPoint).removeClass("path");
      }
      if(pathing.choose){
        this.area$(pathing.choose).removeClass("choose");
      }
      pathing.pathes=[];
      pathing.choose=null;
      pathing.state=pathing.STATE_EMPTY;
    }else{
    }
  },

});
