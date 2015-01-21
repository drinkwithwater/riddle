var gViews=gViews||{}
gViews.CellView=Backbone.View.extend({

  initialize:function(){
    this.template=_.template(gTemplates.cell)
    this.model.bind("change",this.render,this);
  },

  render:function(msg){
    $(this.el).html(this.template(this.model.toJSON()))
    return this;
  }

});
