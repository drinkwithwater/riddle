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
})
gameModel.MazeModel=gUtil.Class.extend({
    iLength:20,
    jLength:20,
    ijToIndex:"array",
    unitIdToIndex:"dict",
    battleModel:"BattleModel"
    constructor:function(battleModel){
        this.battleModel=battleModel;
        
        this.iLength=battleModel.iLength;
        this.jLength=battleModel.jLength;
        
        this.ijToIndex=new Array(this.iLength);
        for(int i=0,l=this.iLength;i<l;i++){
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
        delete this.ijToIndex[index.i][index.j];

        index.i=unit.getPosition().i;
        index.j=unit.getPosition().j;
        this.ijToIndex[index.i][index.j]=index;
    },
    getUnit:function(i,j){
        var index=ijToIndex[i][j];
        if(_.isObject(index)){
            return this.battleModel.unit$(index.unitId);
        }else{
            return false;
        }
    },
    valid:function(i,j){
    }
});