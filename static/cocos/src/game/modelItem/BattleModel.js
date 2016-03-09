var gameModel=gameModel||{};
gameModel.Position=gUtil.Class.extend({
    i:"int",
    j:"int",
    x:"int",
    y:"int",
    battleModel:"BattleModel",
    constructor:function(battleModel,i,j){
        this.battleModel=battleModel;
        this.i=i;
        this.j=j;
        var xy=battleModel.pCenter(i,j);
        this.x=xy.x;
        this.y=xy.y;
    },
    stand:function(){
        var xy=this.battleModel.pCenter(this.i,this.j);
        this.x=xy.x;
        this.y=xy.y;
    },
    xPlus:function(dx){
        this.x+=dx;
        var iUpdate=Math.floor(this.x/this.battleModel.CELL_SIZE);
        if(this.i!=iUpdate){
            this.i=iUpdate;
            return true;
        }else{
            return false;
        }
    },
    xMinus:function(dx){
        return this.xPlus(-dx);
    },
    yPlus:function(dy){
        this.y+=dy;
        var jUpdate=Math.floor(this.y/this.battleModel.CELL_SIZE);
        if(this.j!=jUpdate){
            this.j=jUpdate;
            return true;
        }else{
            return false;
        }
    },
    yMinus:function(dy){
        return this.yPlus(-dy);
    },
    xMoveTo:function(x,speed){
        var dx=x-this.x;
        if(dx>speed){
            return this.xPlus(speed);
        }else if(dx<-speed){
            return this.xMinus(speed);
        }else{
            return this.xPlus(dx);
        }
    },
    yMoveTo:function(y,speed){
        var dy=y-this.y;
        if(dy>speed){
            return this.yPlus(speed);
        }else if(dy<-speed){
            return this.yMinus(speed);
        }else{
            return this.yPlus(dy);
        }
    }
});
gameModel.BattleModel=gUtil.Class.extend({
    mazeModel:null,
    idToUnit:"dict",
    timeSum:0,
    modelManager:null,
    viewManager:null,
    iLength:10,
    jLength:10,
    CELL_SIZE:210,
    LOGIC_DURATION:0.1,
    idCounter:0,
    constructor:function(gameTop){
  	    gameModel.BattleModel.__super__.constructor.call(this);

        this.modelManager=gameTop.getModule("modelModule");
        this.viewManager=gameTop.getModule("viewModule");

        this.idToUnit={};
        this.mazeModel=new gameModel.MazeModel(this);
    },
    timeUpdate:function(dt){
        this.timeSum+=dt;
        if(this.timeSum>this.LOGIC_DURATION){
            this.timeSum=0;
            _.each(this.idToUnit,function(unit,unitId){
                unit.stepUpdate();
            });
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
    },
    ///////////////////
    // unit operate  //
    ///////////////////
    unitStartMove:function(unit,dstPos){
        var duration=this.LOGIC_DURATION*xyPoint.maDistance(unit.getPosition(),dstPos)/unit.getSpeed();
        this.viewManager.getUnitViewPool().actionUnitIdMove(unit.unitId,dstPos,duration);
    },
    unitUpdatePos:function(unit){
        this.mazeModel.updateUnit(unit);
    },
    unitStartAttack:function(srcUnit,dstUnitArray){
        var dstUnitIdSet=_.map(dstUnitArray,function(unit){
            return unit.unitId;
        });
        this.viewManager.getAnimateNode().actionUnitAttack(srcUnit.unitId,dstUnitIdSet);
    },
    unitSetAttr:function(unit,attrKey,attrValue){
    },
    unitDead:function(unit){
    },
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
    }
});
