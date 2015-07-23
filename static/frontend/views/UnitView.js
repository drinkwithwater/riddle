var gViews=gViews||{}
gViews.UnitSpriteDict={
    wall:"/frontend/image/wall.png"
}
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
        if(modelJson.mp===0){
            modelJson.apicon="blacksword";
        }else if(modelJson.mp>0){
            modelJson.apicon="greensword";
        }
        if(modelJson.key){
            modelJson.hpicon="redshell";
        }else if(modelJson.group==gScript.GROUP_ATTACKER){
            modelJson.hpicon="blueshell";
        }else{
            modelJson.hpicon="blackshell";
        }
        var $this=$(this.el);
        $this.html(this.template(modelJson));
        // set i,j attr
        $this.attr("data-i",modelJson.i).attr("data-j",modelJson.j);
        // set left,top offset
        $this.css(this.boardView.cellPos(modelJson));
        // set image
        var imgUrl=gViews.UnitSpriteDict[this.model.typeName];
        if(imgUrl){
            $this.find(".typeimg").attr("src",imgUrl).show();
            $this.find(".typetext").hide();
        }else{
            $this.find(".typetext").show();
            $this.find(".typeimg").hide();
        }
        return this;
    }

});
