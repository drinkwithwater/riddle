var res = {
    HelloWorld_png : "HelloWorld.png",
    CloseSelected_png : "CloseSelected.png",
    testpng : "CloseNormal.png",
    bannerpng : "cocos2dbanner.png",
};
var spriteRes={
    wall:"image/wall.png",
    berserker:"image/berserker.png",
    archer:"image/archer.png",
    assassin:"image/assassin.png",
    box:"image/box.png",
    flier:"image/flier.png",
    hitter:"image/hitter.png",
    transfer:"image/transfer.png",
    walker:"image/walker.png",
    rider:"image/rider.png",
    observer:"image/observer.png",
    trigger:"image/trigger.png",
}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in spriteRes) {
    g_resources.push(spriteRes[i]);
}
