var gModels=gModels||{}
gModels.UnitFactory={
    createUnit:function(i,j,aDict){
        var typeKey=aDict.unitCode
        if(typeKey<=0) return null;
        else {
            var unitId=gScript.createCommonId(i,j);
            var typeName=gScript.unitTypeNameDict[typeKey];
            var defaultDict=gScript.unitNumericalDict[typeName];
            // set default attr
            defaultDict.i=i;
            defaultDict.j=j;
            defaultDict.unitId=unitId;
            var newModel=new gModels.unitModelDict[typeName](
                defaultDict
            );
            // set attr from script
            if(aDict.ap!=0) newModel.set("ap",aDict.ap);
            if(aDict.hp!=0) newModel.set("hp",aDict.hp);
            if(aDict.ar!=0) newModel.set("attackRange",aDict.ar);
            if(aDict.tr!=0) newModel.set("triggerRange",aDict.tr);
            if(aDict.key!=0) newModel.set("key",true);
            else newModel.set("key",false);
            return newModel;
        }
    }
}
gModels.createFromScriptName=function(name){
    var script=gScript.battleScript[name];
    // i,j,unitArray,from script
    var iLength=script.iLength;
    var jLength=script.jLength;
    var unitArray=script.unitArray;
    var hpArray = script.hpArray;
    var apArray = script.apArray;
    var arArray = script.arArray;
    var trArray = script.trArray;
    var keyArray = script.keyArray;
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
                var aDict={
                    unitCode:unitCode,
                    ap:apArray?apArray[i][j]:0,
                    hp:hpArray?hpArray[i][j]:0,
                    ar:arArray?arArray[i][j]:0,
                    tr:trArray?trArray[i][j]:0,
                    key:keyArray?keyArray[i][j]:0,
                }
                var unitModel=
                    gModels.UnitFactory.createUnit(i,j,aDict);
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
