var gameModel=gameModel||{};
gameModel.DefenserModel=gameModel.unitImpl({
    typeName:"defenser",
    speed:100,

    constructor:function(battleModel,unitId,position){
  	    gameModel.DefenserModel.__super__.constructor.apply(this,arguments);
    },
    
    canOper:function(){
        return false;
    },
    doBegin:function(i,j){
        return false;
    },
    doMove:function(i,j){
        return false;
    },
    doEnd:function(i,j){
        return false;
    },
    doAttack:function(unitId){
        return false;
    },

    stepAI:function(){
    },

    
});
gameModel.SlowGunModel=gameModel.defenserImpl({
    typeName:"slowGun",
    COOL_DOWN:10,
    DISTANCE_LIMIT:1050,
    coolingTime:0,
    bulletPool:"bulletPool",
    constructor:function(battleModel,unitId,position){
  	    gameModel.DefenserModel.__super__.constructor.apply(this,arguments);
        this.coolingTime=0;
        this.battleAttr=new gameModel.UnitBattleAttr({
            range:3,
        });
        this.bulletPool=battleModel.bulletPool;
    },
    shotBullet:function(){
        var range=gPoint.radioRange(this.position,this.getAttr("range"));
        for(var i=0,l=range.length;i<l;i++){
            var point=range[i];
            var unit=this.battleModel.unit$(point.i,point.j);
            if(_.isObject(unit)){
                if(unit.unitId!=this.unitId){
                    var bullet=this.createBullet(unit);
                    this.bulletPool.bulletCreate(bullet);
                    this.coolingTime=this.COOL_DOWN;
                    break;
                }
            }
        }
    },
    stepAI:function(){
        if(this.coolingTime<=0){
            this.shotBullet();
        }else{
            this.coolingTime--;
        }
    },
    createBullet:function(target){
        var bulletPool=this.bulletPool;
        var bullet=new gameModel.BulletModel(bulletPool,bulletPool.getNewId(),this,target);
        bullet.setDamageDistance(this.battleAttr.ap,this.DISTANCE_LIMIT);
        return bullet;
    }
});
