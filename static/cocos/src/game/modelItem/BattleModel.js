var gameModel=gameModel||{};
gameModel.BattleModel=gUtil.Class.extend({
    mazeModel:"MazeModel",
    bulletPool:"BulletPool",
    idToUnit:"dict",
    timeSum:0,
    modelManager:null,
    viewManager:null,
    iLength:"int",
    jLength:"int",
    CELL_SIZE:210,
    idCounter:0,
    constructor:function(gameTop){
  	    gameModel.BattleModel.__super__.constructor.call(this);

        this.modelManager=gameTop.getModule("modelModule");
        this.viewManager=gameTop.getModule("viewModule");

        this.iLength=this.modelManager.iLength;
        this.jLength=this.modelManager.jLength;

        this.mazeModel=new gameModel.MazeModel(this);
        this.bulletPool=new gameModel.BulletPool(this,gameTop);
        this.idToUnit={};
    },
    timeUpdate:function(dt){
        this.timeSum+=dt;
        if(this.timeSum>gameConst.LOGIC_DURATION){
            this.timeSum-=gameConst.LOGIC_DURATION;

            _.each(this.idToUnit,function(unit,unitId){
                if(_.isObject(unit)){
                    unit.stepUpdate();
                }
            });
            this.bulletPool.stepUpdate();
        }
    },
    ///////////////////
    // init operate  //
    ///////////////////
    createUnit:function(typeName,i,j){
        var position=this.createPosition(i,j);
        var modelClass=gameModel.unitModelDict[typeName]||gameModel.UnitModel;
        var unit=new modelClass(this,this.idCounter,position);
        this.idCounter=this.idCounter+1;
        
        // put in maze & dict;
        this.idToUnit[unit.unitId]=unit;
        this.mazeModel.addUnit(unit);
        return unit;
    },
    ///////////////////
    // unit operate  //
    ///////////////////
    unitShowMove:function(unit,dstPos){
        var duration=gameConst.LOGIC_DURATION*xyPoint.maDistance(unit.getPosition(),dstPos)/unit.getSpeed();
        this.viewManager.showUnitMove(unit.unitId,dstPos,duration);
    },
    unitShowAttack:function(srcUnit,dstUnitArray){
        var dstUnitIdSet=_.map(dstUnitArray,function(unit){
            return unit.unitId;
        });
        this.viewManager.showUnitAttack(srcUnit.unitId,dstUnitIdSet);
    },
    unitShowSetAttr:function(unit,attrKey,attrValue){
        this.viewManager.showUnitAttrUpdate(unit.unitId,attrKey,attrValue);
    },
    unitShowShotBullet:function(unit,bullet){
        this.viewManager.getBulletViewPool().shotBulletView(bullet);
    },
    unitUpdatePos:function(unit){
        this.mazeModel.updateUnit(unit);
    },
    unitDead:function(unit){
        this.mazeModel.removeUnit(unit);
        delete this.idToUnit[unit.unitId];
        this.viewManager.showUnitDelete(unit.unitId);
    },
    /////////////////
    // unit getter //
    /////////////////
    unit$:function(){
        if(arguments.length==1){
            var unitId=arguments[0];
            return this.idToUnit[unitId]||false;
        }else if(arguments.length==2){
            var i=arguments[0];
            var j=arguments[1];
            return this.mazeModel.getUnit(i,j);
        }else if(arguments.length==0){
            return _.toArray(this.idToUnit);
        }
    },
    
    ///////////////////
    // position util //
    ///////////////////
    xy2xy:function(x,y){
        var cellSize=this.CELL_SIZE;
        var i=Math.floor(x/cellSize);
        var j=Math.floor(y/cellSize);
        return this.pCenter(i,j);
    },
    xy2ij:function(x,y){
        var cellSize=this.CELL_SIZE;
        return {
            i:Math.floor(x/cellSize),
            j:Math.floor(y/cellSize)
        };
    },
    xy2ijFloat:function(x,y){
        var cellSize=this.CELL_SIZE;
        return {
            i:x/cellSize,
            j:y/cellSize
        };
    },
    pLeftBottom:function(i,j){
        var cellSize=this.CELL_SIZE;
        return {
            x:i*cellSize,
            y:j*cellSize
        };
    },
    pCenter:function(i,j){
	    var base=this.pLeftBottom(i,j);
        var cellSize=this.CELL_SIZE;
	    return {
            x:base.x+cellSize/2,
            y:base.y+cellSize/2
        };
    },
    createPosition:function(i,j){
        var position=new gameModel.Position(this,i,j);
        return position;
    },
    ////////////
    // getter //
    ////////////
    getMazeModel:function(){
        return this.mazeModel;
    },
    getBulletPool:function(){
        return this.bulletPool;
    },
    valid:function(i,j){
        return this.mazeModel.valid(i,j);
    },
});
