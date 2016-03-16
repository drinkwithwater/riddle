var gameModel=gameModel||{};
gameModel.UnitIndex=gUtil.Class.extend({
    i:"int",
    j:"int",
    unitId:"int",
    constructor:function(unit){
        this.unitId=unit.unitId;
        this.i=unit.position.i;
        this.j=unit.position.j;
    }
});
gameModel.MazeModel=gUtil.Class.extend({
    iLength:"int",
    jLength:"int",
    ijToIndex:"array",
    unitIdToIndex:"dict",
    battleModel:"BattleModel",
    constructor:function(battleModel){
        this.battleModel=battleModel;
        
        this.iLength=battleModel.iLength;
        this.jLength=battleModel.jLength;
        
        this.ijToIndex=new Array(this.iLength);
        for(var i=0,l=this.iLength;i<l;i++){
            this.ijToIndex[i]=new Array(this.jLength);
        }
        this.unitIdToIndex={};
    },
    addUnit:function(unit){
        var index=new gameModel.UnitIndex(unit);
        this.ijToIndex[index.i][index.j]=index;
        this.unitIdToIndex[index.unitId]=index;
    },
    updateUnit:function(unit){
        var index=this.unitIdToIndex[unit.unitId];
        this.ijToIndex[index.i][index.j]=undefined;

        index.i=unit.getPosition().i;
        index.j=unit.getPosition().j;
        this.ijToIndex[index.i][index.j]=index;
    },
    getUnit:function(i,j){
        if(!this.valid(i,j)){
            return false;
        }
        var index=this.ijToIndex[i][j];
        if(_.isObject(index)){
            return this.battleModel.unit$(index.unitId);
        }else{
            return false;
        }
    },
    valid:function(i,j){
        if(i<0 || i>=this.iLength){
            return false;
        }else if(j<0 || j>=this.jLength){
            return false;
        }else{
            return true;
        }
    }
});
