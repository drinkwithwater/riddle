var gViews=gViews||{}
gViews.UnitView=Backbone.View.extend({

    initialize:function(){
        this.template=_.template(gTemplates.unit);
        $(this.el).addClass("unit");
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
