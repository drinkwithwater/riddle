var gViews=gViews||{}
gViews.IRange=new gUtil.Interface({
    render:"",

    display:"",
    unDisplay:"",

});
gViews.RangeView=Backbone.View.extend({
    display:true,
    range:[],
    boardView:null,
    viewActionHandler:null,
    constructor:function(boardView){
        this.boardView=boardView;
        this.viewActionHandler=this.boardView.viewActionHandler;
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
            self.floorArea$(area).addClass("show");
        });
        console.log(JSON.stringify(self.range));
    },
    unDisplay:function(){
        var self=this;
        _.each(this.range,function(area){
            self.floorArea$(area).removeClass("show");
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
});