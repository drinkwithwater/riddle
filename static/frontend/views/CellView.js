var gViews=gViews||{}
gViews.CellView=Backbone.View.extend({

    initialize:function(){
        this.template=_.template(gTemplates.cell);
        $(this.el).addClass("cell");
        this.model.bind("change",this.render,this);
    },

    render:function(msg){
        var modelJson=this.model.toJSON();
        $(this.el).html(this.template(modelJson));
        $(this.el).attr("data-i",modelJson.i);
        $(this.el).attr("data-j",modelJson.j);
        return this;
    }

});
