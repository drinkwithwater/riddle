var gViews=gViews||{}
gViews.MenuView=Backbone.View.extend({
    events:{
        "mousedown #start":"startScript",
    },
    scriptNames:[],
    viewActionHandler:null,
    constructor:function(aDict){
  	    gViews.MenuView.__super__.constructor.call(this,aDict);
        this.scriptNames=aDict.scriptNames;
        this.viewActionHandler=aDict.viewActionHandler;
    },
    initialize:function(){
        this.template=_.template(gTemplates.menu);
    },


    render:function(msg){
        this.$el.html(this.template({
            scriptNames:this.scriptNames
        }));

        return this;
    },
    startScript:function(e){
        var scriptName=this.$("#script").val();
        this.viewActionHandler.viewStart(scriptName);
        //TODO send start game message ;
    }
});
