var gViews=gViews||{}
gViews.IRange=new gUtil.Interface({
    render:"",

    display:"",
    unDisplay:"",

});
gViews.AttackRangeView=Backbone.View.extend({
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
            self.attackRangeArea$(area).addClass("show");
        });
        console.log(JSON.stringify(self.range));
    },
    unDisplay:function(){
        var self=this;
        _.each(this.range,function(area){
            self.attackRangeArea$(area).removeClass("show");
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
    attackRangeArea$:function(_pointArgs){
        var $floorArea=this.floorArea$.apply(this,arguments);
        return $floorArea.find(".attackRangeArea");
    },
});

gViews.TriggerRangeView=Backbone.View.extend({
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
            self.triggerRangeArea$(area).addClass("show");
        });
    },
    unDisplay:function(){
        var self=this;
        _.each(this.range,function(area){
            self.triggerRangeArea$(area).removeClass("show");
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
    triggerRangeArea$:function(_pointArgs){
        var $floorArea=this.floorArea$.apply(this,arguments);
        return $floorArea.find(".triggerRangeArea");
    },
});
