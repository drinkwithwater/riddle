var gModels=gModels||{}
gModels.UnitFactory={
    createUnit:function(i,j,code){
        var type=code % 0x100;
        if(type<=0) return null;
    }
}
gModels.MazeFactory={
    createMaze:function(){
    }
}
gModels.createFromScriptName=function(name){
    // i,j,unitArray
    var script=gScript.battleScript[name];
    var iLength=script.iLength;
    var jLength=script.jLength;
    var unitArray=script.unitArray;
    // component
    var unitDict={};
    var unitCollection=new gModels.UnitCollection();
    var posToUnit=new Array[iLength];
    var mazeModel=new gModels.MazeModel({
        iLength:iLength,
        jLength:jLength
    });
    for(var i=0;i<iLength;i++){
        posToUnit[i]=new Array[jLength];
        for(var j=0;j<jLength;j++){
            var unitCode=unitArray[i][j];
            if(unitCode!=0){
                var unitModel=
                    gModels.UnitFactory.createUnit(i,j,unitCode);
                unitCollection.add(unitModel);
                posToUnit[i][j]=unitModel;
                unitDict[unitModel.get("unitId")]=unitModel;
            }
        }
    }
}
