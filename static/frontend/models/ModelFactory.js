var gModels=gModels||{}
gModels.UnitFactory={
    createUnit:function(i,j,code){
        var typeKey=code % 0x100;
        if(typeKey<=0) return null;
        else {
            var unitId=gScript.createCommonId(i,j);
            var typeName=gScript.unitTypeNameDict[typeKey];
            var hpap=gScript.unitNumericalDict[typeName];
            return new gModels.unitModelDict[typeName]({
                i:i,
                j:j,
                hp:hpap.hp,
                ap:hpap.ap,
                group:hpap.group,
                unitId:unitId
            });
        }
    }
}
gModels.createFromScriptName=function(name){
    var script=gScript.battleScript[name];
    // i,j,unitArray,from script
    var iLength=script.iLength;
    var jLength=script.jLength;
    var unitArray=script.unitArray;
    // component
    var unitDict={};
    var unitCollection=new gModels.UnitCollection();
    var mazeModel=new gModels.MazeModel({
        iLength:iLength,
        jLength:jLength
    });
    for(var i=0;i<iLength;i++){
        for(var j=0;j<jLength;j++){
            var unitCode=unitArray[i][j];
            if(unitCode!=0){
                var unitModel=
                    gModels.UnitFactory.createUnit(i,j,unitCode);
                unitCollection.add(unitModel);
                unitDict[unitModel.get("unitId")]=unitModel;
                mazeModel.setUnit(i,j,unitModel);
            }else{
                mazeModel.setUnit(i,j,null);
            }
        }
    }
    return {
        unitCollection:unitCollection,
        unitDict:unitDict,
        mazeModel:mazeModel,
    };
}
