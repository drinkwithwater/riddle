var gMove=gMove||{};
gMove.UserInputCtrl=cc.Node.extend({
    STATE_EMPTY:0,
    STATE_PATHING:1,
    
    state:0,

    pathingType:null,

    preArea:null,

    ctor:function(gameLayer,gameTop){
        this._super();
        

        this.gameLayer=gameLayer;
        
	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.frontendModule=gameTop.getModule("frontendModule");
        
        var gameLayer=this.gameLayer;
        var user=this;
	    var listener=cc.EventListener.create({
		    event:cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,
		    onTouchBegan:function(touch,event){
			    gTest.target=event.getCurrentTarget();
			    var ij=gameLayer.p2ij(touch.getLocation());
                return user.beginArea(ij.i,ij.j);
		    },
		    onTouchMoved:function(touch,event){
			    var ij=gameLayer.p2ij(touch.getLocation());
			    user.moveArea(ij.i,ij.j);
		    },
		    onTouchEnded:function(touch,event){
			    var ij=gameLayer.p2ij(touch.getLocation());
			    user.endArea(ij.i,ij.j);
		    }
	    });

	    cc.eventManager.addListener(listener,this);
    },
    beginArea:function(i,j){
        var gameLayer=this.gameLayer;
        if(gameLayer.valid(i,j)){
            this.preArea={
                i:i,
                j:j
            }
            this.frontendModule.startOper(i,j);
            return true;
        }else{
            return false;
        }
    },
    moveArea:function(i,j){
        var gameLayer=this.gameLayer;
        if(gameLayer.valid(i,j)){
            if(this.preArea.i==i && this.preArea.j==j){
                return ;
            }else{
                this.frontendModule.moveOper(i,j);
                this.preArea={
                    i:i,
                    j:j
                }
            }
        }else{
            this.cancel();
            return ;
        }
    },
    endArea:function(){
        this.cancel();
    },
    movePos:function(x,y){
    },
    cancel:function(){
    },
});
