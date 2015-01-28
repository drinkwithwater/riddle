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
    var boardModel=this.model.toJSON();
    this.$el.html(this.template(boardModel));
    for(var i=0;i<boardModel.height;i++){
      for(var j=0;j<boardModel.width;j++){
        var cellModel=boardModel.cells[i][j];
        this.$("#tr"+i+" #td"+j).html(new gViews.CellView({model:cellModel}).render().el);
      }
    }
    return this;
  },

  click:function(e){
    var x=$(e.target).attr("data-x");
    var y=$(e.target).attr("data-y");
    console.log("x="+x);
    console.log("y="+y);
  },

  over:function(e){
  },

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
