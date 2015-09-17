var gViews=gViews||{};
gViews.UserInputCtrl=gUtil.Class.extend({
    LEVEL_AREA:0,
    LEVEL_SPRITE:1,
    LEVEL_PATH:2,
    LEVEL_CHOOSE:3,
    STATE_EMPTY:0,
    STATE_PATHING:1,
    state:0,

    srcUnit:null,
    pathingType:null,

    gameLayer:null,

    pathData:null,

    preArea:null,
    modelManager:null,
    constructor:function(){
	    gViews.UserInputCtrl.__super__.constructor.call(this);
	    this.pathData=new gViews.PathData();
    },
    bindLayer:function(gameLayer){
	    this.gameLayer=gameLayer;
    },
    beginArea:function(i,j){
	    this.pathData.start({i:i,j:j});
	    this.gameLayer.doChoose(i,j);
	    this.gameLayer.showPath(this.pathData.getWalkPath());
	    this.preArea={i:i,j:j};
    },
    moveArea:function(i,j){
	    if(this.preArea===null){
		    return ;
	    }else if(this.preArea.i!=i||this.preArea.j!=j){
		    this.pathData.overArea({i:i,j:j});
		    this.gameLayer.showPath(this.pathData.getWalkPath());
		    this.preArea={i:i,j:j};
	    }
    },
    endArea:function(i,j){
	    this.pathData.cancel();
	    this.gameLayer.hidePath();
	    this.gameLayer.unChoose();
    },
    movePos:function(x,y){
    },
    cancel:function(){
        this.pathData.cancel();
	    this.gameLayer.hidePath();
	    this.gameLayer.unChoose();
    }

});
