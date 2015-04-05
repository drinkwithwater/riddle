var gViews=gViews||{}
gViews.PathCtrl=gUtil.Class.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    state:0,

    flyPath:null,
    walkPath:null,
    
    srcUnit:null,
    pathingType:null,

    boardView:null,
    viewActionHandler:null,
    modelManager:null,
    constructor:function(boardView){
        this.boardView=boardView;
        
        this.viewActionHandler=boardView.viewActionHandler;
        this.modelManager=boardView.modelManager;
        
        this.flyPath=new gViews.FlyPath(boardView);
        this.walkPath=new gViews.WalkPath(boardView);

        this.pathingType=gUI.PATHING_TYPE_NONE;
    },
    render:function(){
        this.flyPath.render();
        this.walkPath.render();
        this.walkPath.setAttack();
    },
    mouseClick:function(area){
        if(this.state==this.STATE_EMPTY){
            this.srcUnit=this.modelManager.unit$(area);
            this.pathingTypeRefresh(area);
            this.walkPath.start(area);
            this.flyPath.start(area)
            this.state=this.STATE_PATHING;
        }else if(this.state==this.STATE_PATHING){
            if(this.pathingType==gUI.PATHING_TYPE_FLY_MOVE||
               this.pathingType==gUI.PATHING_TYPE_SHOOT_ATTACK){
                var resultPath=this.flyPath.getPath();
                this.viewActionHandler.viewPathing(resultPath);
            }else if(this.pathingType==gUI.PATHING_TYPE_WALK_MOVE||
                     this.pathingType==gUI.PATHING_TYPE_RUN_ATTACK){
                var resultPath=this.walkPath.getPath();
                this.viewActionHandler.viewPathing(resultPath);
            }
            this.cancel(area);
        }
    },
    mouseEnter:function(area){
        if(this.state==this.STATE_EMPTY){
            // do nothing 
        }else if(this.state==this.STATE_PATHING){
            this.pathingTypeRefresh(area);
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
    pathingTypeRefresh:function(area){
        var type=this.srcUnit.pathingType(area,this.walkPath.getPath());
        this.pathingType=type;
        if(type==gUI.PATHING_TYPE_FLY_MOVE){
            this.flyPath.show();
            this.flyPath.setMove();
            this.walkPath.hide();
        }else if(type==gUI.PATHING_TYPE_SHOOT_ATTACK){
            this.flyPath.show();
            this.flyPath.setAttack();
            this.walkPath.hide();
        }else if(type==gUI.PATHING_TYPE_WALK_MOVE){
            this.walkPath.show();
            this.walkPath.setMove();
            this.flyPath.hide();
        }else if(type==gUI.PATHING_TYPE_RUN_ATTACK){
            this.walkPath.show();
            this.walkPath.setAttack();
            this.flyPath.hide();
        }else if(type==gUI.PATHING_TYPE_NONE){
            this.walkPath.hide();
            this.flyPath.hide();
        }
    },

    cancel:function(area){
        this.flyPath.cancel(area);
        this.walkPath.cancel(area);
        this.state=this.STATE_EMPTY;
        this.srcUnit=null;
    }
});
