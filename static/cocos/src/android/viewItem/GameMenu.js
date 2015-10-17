var gViews=gViews||{};
gViews.CloseMenu = cc.Menu.extend({
    viewManager:null,
    ctor:function (gameTop) {
		this.viewManager=gameTop.getModule("viewModule");
        var winSize=cc.director.getWinSize();
        var closeItem=new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function(){
                this.viewManager.showMenu();
            },this);
        closeItem.attr({
            x: winSize.width-20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        this._super(closeItem);
        this.attr({
            x:0,
            y:0
        });
    }
});
gViews.ScriptMenuItem = cc.MenuItemFont.extend({
    menu:null,
    scriptName:null,
    ctor:function(scriptName,menu){
        this._super(scriptName,this.onStartScript,this);
        this.scriptName=scriptName;
        this.menu=menu;
    },
    onStartScript:function(){
        this.menu.actionHandler.viewStart(this.scriptName);
    }
});
gViews.ScriptMenu = cc.Menu.extend({
    viewManager:null,
    modelManager:null,
    actionHandler:null,

    count:10,
    LINE_SPACE:40,
    ctor:function (gameTop) {
        this._super();
        var winSize=cc.director.getWinSize();
        this.attr({
            x:0,
            y:0,
            width:winSize.width,
            height:winSize.height
        });

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesMoved: function(touches, event){
                var target=event.getCurrentTarget();
                var delta=touches[0].getDelta();
                target.moveMenu(delta);
            }
        },this);

	    this.viewManager=gameTop.getModule("viewModule");
	    this.modelManager=gameTop.getModule("modelModule");
	    this.actionHandler=gameTop.getModule("frontendModule");

        var itemY=0;
        this.count=0;
        for(var key in gScript.battleScript){
            var item=new gViews.ScriptMenuItem(key,this);
            item.attr({
                x:winSize.width/2,
                y:winSize.height-itemY,
                anchorX:0.5,
                anchorY:1,
            });
            this.addChild(item);
            this.count++;
            itemY+=this.LINE_SPACE;
        }
        

        return true;
    },
    render:function(){
        console.log("game menu render");
    },
    moveMenu:function(delta){
        var newY=this.y+delta.y;
        if(newY>this.count*this.LINE_SPACE)
            newY=this.count*this.LINE_SPACE;
        if(newY<0)
            newY=0;
        this.y=newY;
    }

});