/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var SysMenu = cc.Layer.extend({
    isMouseDown:false,

    init:function () {
        var bRet=false;
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
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
        scene.addChild(Helloworld.create());
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

var SysMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SysMenu();
        layer.init();
        this.addChild(layer);
    }
});

