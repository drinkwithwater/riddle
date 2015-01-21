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

});
