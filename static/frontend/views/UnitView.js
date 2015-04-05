var gViews=gViews||{}
gViews.UnitView=Backbone.View.extend({

    boardView:null,
    constructor:function(aDict){
        gViews.UnitView.__super__.constructor.call(this,aDict);
        this.boardView=aDict.boardView;
    },
    initialize:function(){
        this.template=_.template(gTemplates.unit);
        $(this.el).addClass("unit");
        this.model.bind("change",this.render,this);
    },

    render:function(msg){
        var modelJson=this.model.toJSON();
        modelJson.typeName=this.model.typeName;
        $(this.el).html(this.template(modelJson));
        $(this.el).attr("data-i",modelJson.i);
        $(this.el).attr("data-j",modelJson.j);
        $(this.el).css(this.boardView.cellPos(modelJson));
        return this;
    }

});
