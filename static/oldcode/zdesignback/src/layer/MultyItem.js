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

var BattleLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,
    
    spriteDict:{},

    actionQueue:new gUtil.ActionQueue(),
    actionQueueDict:{},

    

    init:function () {
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();


        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(cc.p(size.width / 2, 0));
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        var lazyLayer = cc.Layer.create();
        this.addChild(lazyLayer);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create("res/middle.png");
        this.sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.sprite.setScale(0.5);
        this.sprite.setRotation(180);

        lazyLayer.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);

        //this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
        //this.helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        actions1=cc.MoveTo.create(2,cc.p(200,200));
        actions2=cc.MoveTo.create(2,cc.p(200,400));
        actions3=cc.CallFunc.create(this.actionCall,this);
        //this.sprite.runAction(cc.Sequence.create(actions3))

        
        
        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            "res/CloseNormal.png",
            "res/CloseSelected.png",
            function () {
                actions1=cc.MoveBy.create(0.5,cc.p(50,50));
            	this.scheduleRunAction(actions1);
            },this);
        closeItem.setAnchorPoint(cc.p(0.5, 0.5));

        var menu = cc.Menu.create(closeItem);
        menu.setPosition(cc.PointZero());
        this.addChild(menu, 1);
        closeItem.setPosition(cc.p(size.width - 20, 20));
        
        
        
        this.setTouchEnabled(true);
        return true;
    },
    // a selector callback
    menuCloseCallback:function (sender) {
        cc.Director.getInstance().end();
    },
    //add the action to the queue
    scheduleRunAction:function(sid,scheduleAction){
    	//get from dict
    	var actionQueue=this.actionQueueDict[sid];
    	var sprite=this.spriteDict[sid];
    	//package with a finish call
    	var finishCall=cc.CallFunc.create(this.finishRunAction,this,sid);
    	var sequenceAction=cc.Sequence.create(scheduleAction, finishCall);
    	//if not running ,run ; if running ,queue;
    	if(!actionQueue.isRunning()){
            actionQueue.setRunning();
            sprite.runAction(sequenceAction);
    	}else{
	    	actionQueue.queue(sequenceAction);
    	}
    },
    //this function is call by finish call back of the action
    finishRunAction:function(sid){
    	//get from dict
    	var actionQueue=this.actionQueueDict[sid];
    	var sprite=this.spriteDict[sid];
    	//if not empty ,dequeue and run;if empty ,set stop;
    	if(!actionQueue.isEmpty()){
    		action=actionQueue.dequeue();
    		actionQueue.setRunning();
    		sprite.runAction(action);
    	}else{
    		actionQueue.setStop();
    	}
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
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

BattleLayer.create=function(){
  var i=new BattleLayer();
  if(i&&i.init()){
    return i;
  }
  return null;
}
BattleLayer.scene=function(){
  var scene=cc.Scene.create();
  var layer=BattleLayer.create();
  scene.addChild(layer);
  return scene;
}
