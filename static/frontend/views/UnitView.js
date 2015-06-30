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
        modelJson.apicon="blacksword";
        if(modelJson.key){
            modelJson.hpicon="redshell";
        }else if(modelJson.group==gScript.GROUP_ATTACKER){
            modelJson.hpicon="blueshell";
        }else{
            modelJson.hpicon="blackshell";
        }
        $(this.el).html(this.template(modelJson));
        // set i,j attr
        $(this.el).attr("data-i",modelJson.i);
        $(this.el).attr("data-j",modelJson.j);
        // set left,top offset
        $(this.el).css(this.boardView.cellPos(modelJson));
        return this;
    }

});
