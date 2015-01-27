var gViews=gViews||{}
gViews.BoardView=Backbone.View.extend({
  events:{
    "click button":"click",
    "mouseover button":"over"
  },

  initialize:function(){
    this.template=_.template(gTemplates.board);
    this.model.bind("change",this.render,this);
  },

  render:function(msg){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  click:function(e){
    $(e.target).html("choose");
  },

  over:function(e){
  }

//state record
  defaults:{
    pathingList:[],
    pathingState:false
  },
  startPathing:function(point){
    //when leftmouse
  },
  inCellPathing:function(point){
    //when mouseover
    //check check if existed
    //check continus
  },
  outCellPathing:function(point){
  },
  finishPathing:function(point){
    //when pathingState==true && leftmouse
  },
  stopPathing:function(point){
    //when out of bound
    //when right mouse?
    //trigger
  }
});
