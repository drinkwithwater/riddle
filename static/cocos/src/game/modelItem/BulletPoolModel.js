var gameModel=gameModel||{};
gameModel.BulletModel=gUtil.Class.extend({
    speed:20,
    EXPLODE_DISTANCE:70,

    bulletId:"int",
    position:"Position",
    vx:"float",
    vy:"float",
    damage:"int",
    distanceLimit:"int",
    durationLimit:"int",
    duration:"int",
    sourceId:"unit",
    constructor:function(bulletPool,bulletId,source,target){
        this.bulletPool=bulletPool;
        this.bulletId=bulletId;
        this.sourceId=source.unitId;
        this.position=source.getPosition().clone();
        var dx=target.position.x-source.position.x;
        var dy=target.position.y-source.position.y;
        var distance=Math.abs(dx)+Math.abs(dy);
        this.vx=(dx/distance)*this.speed;
        this.vy=(dy/distance)*this.speed;
        this.duration=0;
    },
    setDamageDistance:function(damage,distanceLimit){
        this.damage=damage;
        this.durationLimit=Math.floor(distanceLimit/this.speed);
    },
    stepUpdate:function(){
        if(this.duration<this.durationLimit){
            var thisPos=this.position;
            thisPos.xPlus(this.vx);
            thisPos.yPlus(this.vy);
            this.duration++;
            var hitUnit=this.bulletPool.battleModel.unit$(thisPos.i,thisPos.j);
            if(_.isObject(hitUnit)){
                if(hitUnit.unitId==this.sourceId){
                    return ;
                }else{
                    var dist=xyPoint.maDistance(hitUnit.position,thisPos);
                    if(dist<this.EXPLODE_DISTANCE){
                        hitUnit.onAttack(this.damage);
                        this.bulletPool.bulletExplode(this.bulletId);
                    }
                }
            }
        }else{
            this.bulletPool.bulletDelete(this.bulletId);
        }
    },
    getDestination:function(){
        var dst=this.position.clone();
        var timeLeft=this.durationLimit-this.duration;
        dst.xPlus(this.vx*timeLeft);
        dst.yPlus(this.vy*timeLeft);
        return dst;
    },
});
gameModel.BulletPool=gUtil.Class.extend({
    battleModel:"BattleModel",
    viewManager:"viewModule",
    idToBullet:"dict",
    idCounter:"int",
    constructor:function(battleModel,gameTop){
        this.battleModel=battleModel;
        this.viewManager=gameTop.getModule("viewModule");

        this.idToBullet={};
        this.idCounter=0;
    },
    stepUpdate:function(){
        _.each(this.idToBullet,function(bullet){
            bullet.stepUpdate();
        },this);
    },
    getNewId:function(){
        return this.idCounter++;
    },
    bulletCreate:function(bullet){
        this.idToBullet[bullet.bulletId]=bullet;
        this.viewManager.showBulletCreate(bullet);
    },
    bulletExplode:function(bulletId){
        delete this.idToBullet[bulletId];
        this.viewManager.showBulletExplode(bulletId);
    },
    bulletDelete:function(bulletId){
        delete this.idToBullet[bulletId];
        this.viewManager.showBulletDelete(bulletId);
    }
});
