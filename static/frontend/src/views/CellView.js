var views=views||{}
views.CellView=Backbone.View.extend({

  initialize:function(){
    this.template=_.template(templates.cell)
    this.model.bind("change",this.render,this);
  },

  render:function(msg){
    $(this.el).html(this.template(this.model.toJSON()))
    return this;
  }

});
