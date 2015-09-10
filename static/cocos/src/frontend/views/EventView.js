var gViews=gViews||{}
gViews.MoveAction=gUtil.Class.extend({
    state:0,
    display:true,
    fromArea:null,
    toArea:null,
    boardView:null,
    constructor:function(boardView){
        this.boardView=boardView;
    },
    click:function(area){
        if(this.state==this.STATE_EMPTY){
            this.state=this.STATE_PATHING;
            if(this.display){
            }
            this.path.push(area);
        }else if(this.state==this.STATE_PATHING){
            //TODO
            //send message
            //check path valid;
            this.cancel(area);
        }
    },
    over:function(area){
    },
    cancel:function(area){
    },
    openDisplay:function(area){
    },
    closeDisplay:function(area){
    },
    render:{
    }
});