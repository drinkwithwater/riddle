/****************************************************************************
 ****************************************************************************/

var SysMenu = cc.Layer.extend({
    isMouseDown:false,

    init:function () {
        var bRet=false;
        //////////////////////////////
        // super init first
        this._super();

        /////////////////////////////
        //    you may modify it.
        // ask director the window size
        var winSize = cc.Director.getInstance().getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            "res/test.png",
            "res/test.png",
            function () {
              console.log("test click");
              this.onStartGame();
            },this);
        closeItem.setAnchorPoint(cc.p(0.5, 0.5));
        closeItem.setPosition(cc.p(winSize.width/2, winSize.height/2));

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);

        var lazyLayer = cc.Layer.create();
        this.addChild(lazyLayer);

        return true;
    },
    onStartGame:function(sender){
      console.log("in onStartGame");
      cc.LoaderScene.preload(g_resources,function(){
        var scene = cc.Scene.create();
        scene.addChild(BattleLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,scene));
      },this);
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
        console.log("on touches began");
    },
    onTouchesMoved:function (touches, event) {
        console.log("on touches moved");
        if (this.isMouseDown) {
            if (touches) {
                //this.circle.setPosition(cc.p(touches[0].getLocation().x, touches[0].getLocation().y));
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

SysMenu.create=function(){
	var sg=new SysMenu();
	if(sg&&sg.init()){
		return sg;
	}
	return null;
};
SysMenu.scene=function(){
	var scene=cc.Scene.create();
	var layer=SysMenu.create();
	scene.addChild(layer);
	return scene;
};
