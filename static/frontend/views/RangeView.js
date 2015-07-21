var gViews=gViews||{}
gViews.IRange=new gUtil.Interface({
    render:"",

    display:"",
    unDisplay:"",

});
gViews.RangeView=Backbone.View.extend({
    range:[],
    boardView:null,
    constructor:function(boardView){
        this.boardView=boardView;
    },
    render:function(){
        this.$el=this.boardView.$("div.boardChild.floor")
        this.el=this.$el[0];
        return this;
    },
    display:function(range){
        this.unDisplay();
        var self=this;
        _.each(range,function(area){
            self.range.push(area);
            self.rangeArea$(area).addClass("show");
        });
    },
    unDisplay:function(){
        var self=this;
        _.each(this.range,function(area){
            self.rangeArea$(area).removeClass("show");
        });
        this.range=[];
    },
    getRange:function(){
        return this.range;
    },

    /***************************/
    /* not interface functions */
    /***************************/

    floorArea$:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments);
        return this.$("tr.tr"+pos.i+" td.td"+pos.j+" .floorArea");
    },
    rangeArea$:function(){
        return this.$();
    }
});
gViews.AttackRangeView=gViews.RangeView.extend({
    rangeArea$:function(_pointArgs){
        var $floorArea=this.floorArea$.apply(this,arguments);
        return $floorArea.find(".attackRangeArea");
    },
});

gViews.TriggerRangeView=gViews.RangeView.extend({
    rangeArea$:function(_pointArgs){
        var $floorArea=this.floorArea$.apply(this,arguments);
        return $floorArea.find(".triggerRangeArea");
    }
});

gViews.TransferRangeView=gViews.RangeView.extend({
    rangeArea$:function(_pointArgs){
        var $floorArea=this.floorArea$.apply(this,arguments);
        return $floorArea.find(".transferRangeArea");
    }
});
