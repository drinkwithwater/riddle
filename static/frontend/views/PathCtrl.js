var gViews=gViews||{}
gViews.PathCtrl=gUtil.Class.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    state:0,

    flyPath:null,
    walkPath:null,

    boardView:null,
    viewActionHandler:null,
    constructor:function(boardView){
        this.viewActionHandler=boardView.viewActionHandler;
        this.boardView=boardView;
        this.flyPath=new gViews.FlyPath(boardView);
        this.walkPath=new gViews.WalkPath(boardView);
    },
    render:function(){
        this.flyPath.render();
        this.walkPath.render();
    },
    mouseClick:function(area){
        if(this.state==this.STATE_EMPTY){
            this.walkPath.start(area);
            this.flyPath.start(area)
            this.state=this.STATE_PATHING;
        }else if(this.state==this.STATE_PATHING){
            var resultPath=this.walkPath.getPath();
            this.viewActionHandler.viewPathing(resultPath);
            this.cancel(area);
        }
    },
    mouseEnter:function(area){
        if(this.state==this.STATE_EMPTY){
            // do nothing 
        }else if(this.state==this.STATE_PATHING){
            this.walkPath.overArea(area);
            this.flyPath.overArea(area);
        }
    },
    mouseMove:function(mousePos){
        if(this.state==this.STATE_EMPTY){
            // do nothing
        }else if(this.state==this.STATE_PATHING){
            this.flyPath.overPos(mousePos);
            this.walkPath.overPos(mousePos);
        }
    },
    mouseLeaveBoard:function(){
        this.cancel(null);
    },

    cancel:function(area){
        this.flyPath.cancel(area);
        this.walkPath.cancel(area);
        this.state=this.STATE_EMPTY;
    }
});
