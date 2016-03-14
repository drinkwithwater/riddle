var res = {
    HelloWorld_png : "HelloWorld.png",
    CloseSelected_png : "CloseSelected.png",
    CloseNormal_png : "CloseNormal.png",
    testpng : "CloseNormal.png",
    bannerpng : "cocos2dbanner.png",
};
var spriteRes={
    berserker:"image/berserker.png",
    archer:"image/archer.png",
    flier:"image/flier.png",
    hitter:"image/hitter.png",
    
    one:"image/assassin.png",
    two:"image/walker.png",
    
    transfer:"image/transfer.png",
    
    box:"image/box.png",
    trigger:"image/trigger.png",
    observer:"image/observer.png",
    wall:"image/wall.png",
    rider:"image/rider.png",

    bullet:"image/transfer.png",
}
var itemRes={
    hp:"item/hp.png",
    maxHp:"item/maxhp.png",
    blackShell:"item/blackshell.png",
    redShell:"item/redshell.png",
    blueShell:"item/blueshell.png",
    blackSword:"item/blacksword.png",
    greenSword:"item/greensword.png",
}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in spriteRes) {
    g_resources.push(spriteRes[i]);
}
for (var i in itemRes) {
    g_resources.push(itemRes[i]);
}
