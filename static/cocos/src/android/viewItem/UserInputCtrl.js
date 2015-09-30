var gViews=gViews||{};
gViews.UserInputCtrl=gUtil.Class.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    state:0,

    srcUnit:null,
    pathingType:null,

    gameLayer:null,

    pathData:null,

    preArea:null,

    modelManager:null,
    viewManager:null,
    frontendModule:null,
    constructor:function(gameLayer,gameTop){
	    gViews.UserInputCtrl.__super__.constructor.call(this);
	    this.pathData=new gViews.PathData();

	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.frontendModule=gameTop.getModule("frontendModule");

        this.gameLayer=gameLayer;
    },
    beginArea:function(i,j){
        var gameLayer=this.gameLayer;
        if(gameLayer.valid(i,j)){
            var chooseUnit=this.modelManager.unit$(i,j);
            this.srcUnit=chooseUnit;
            if(_.isObject(chooseUnit)){
                this.state=this.STATE_PATHING;
	            this.pathData.start({i:i,j:j});
	            gameLayer.doChoose(i,j);
	            gameLayer.showPath(this.pathData.getWalkFlyPath(1));
	            this.preArea={i:i,j:j};
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    },
    moveArea:function(i,j){
        var gameLayer=this.gameLayer;
        if(gameLayer.valid(i,j)&&this.state==this.STATE_PATHING){
            if(this.preArea===null){
                // not start
                return ;
            }else if(this.preArea.i===i&&this.preArea.j===j){
                // at the same cell
                return ;
            }else{
                this.pathData.overArea({i:i,j:j});
                var dstUnit=this.modelManager.unit$(i,j);
                if(_.isObject(dstUnit)){
                    var r=this.srcUnit.get("attackRange");
                    this.gameLayer.showPath(this.pathData.getWalkFlyPath(r));
                }else{
                    this.gameLayer.showPath(this.pathData.getWalkFlyPath(0));
                }
                this.preArea={i:i,j:j};
            }
        }else{
            this.cancel();
            return ;
        }
    },
    endArea:function(i,j){
        if(this.gameLayer.valid(i,j)){
            this.frontendModule.viewPathing(this.pathData.getWalkPath());
            this.cancel();
        }else{
            this.cancel();
        }
    },
    movePos:function(x,y){
    },
    cancel:function(){
        this.state=this.STATE_EMPTY;
        this.pathData.cancel();
	    this.gameLayer.hidePath();
	    this.gameLayer.unChoose();
    }

});
