var gameModel=gameModel||{};
gameModel.BulletModel=gUtil.Class.extend({
    speed:10,

    bulletId:"int",
    position:"Position",
    vx:"float",
    vy:"float",
    damage:"int",
    distanceLimit:"int",
    durationLimit:"int",
    duration:"int",
    constructor:function(bulletPool,bulletId,source,target){
        this.bulletPool=bulletPool;
        this.bulletId=bulletId;
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
            this.position.xPlus(vx);
            this.position.yPlus(vy);
            this.duration++;
        }
    },
});
gameModel.BulletPool=gUtil.Class.extend({
    battleModel:"BattleModel",
    idToBullet:"dict",
    idCounter:"int",
    constructor:function(battleModel){
        this.battleModel=battleModel;
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
    addBullet:function(unit,bullet){
        this.idToBullet[bullet.bulletId]=bullet;
    }
});
