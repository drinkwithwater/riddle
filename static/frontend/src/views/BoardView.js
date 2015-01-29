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

  render:function(msg){
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
    if(e.button==0){
      var i=$(e.target).attr("data-i");
      var j=$(e.target).attr("data-j");
      clickArea({i:i,j:j});
    }else if(e.button=2){
      var i=$(e.target).attr("data-i");
      var j=$(e.target).attr("data-j");
      cancelArea({i:i,j:j});
    }
  },

  enterArea:function(e){
    var i=$(e.target).attr("data-i");
    var j=$(e.target).attr("data-j");
    this.overArea({i:i,j:j});
    $(e.target).addClass("focus");
    console.log(e.target);
  },
  leaveArea:function(e){
    var i=$(e.target).attr("data-i");
    var j=$(e.target).attr("data-j");
    $(e.target).removeClass("focus");
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
    focus:null
  },
  overArea:function(area){
    var pathing=this.pathing;
    if(pathing.state==pathing.STATE_PATHING){
      //if cell can arrive: //TODO
      pathing.pathes.push(area);
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
      pathing.choose=area;
      pathing.focus=area;
    }
  },
  cancelArea:function(area){
    var pathing=this.pathing;
    if(pathing.state==pathing.STATE_PATHING){
      pathing.state=pathing.STATE_EMPTY;
      pathing.pathes=[];
      pathing.choose=null;
      pathing.focus=null;
    }else{
    }
  },

});
