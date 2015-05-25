module.exports=function(env){
    ///{{{
    var gBattle=env.gBattle=env.gBattle|| {}
    var gFactory=env.gFactory=env.gFactory||{}
    gBattle.UnitFactory = {
        createUnit: function(i,j,code) {
            var typeKey = code % 0x100;
	        if(typeKey<=0) return null;
            else{
                var typeName=gScript.unitTypeNameDict[typeKey];
                var newUnit = new gBattle.unitClassDict[typeName]();
	            newUnit.i=i;
	            newUnit.j=j;
	            newUnit.unitId=gScript.createCommonId(i,j);
                return newUnit;
            }
        }
    };
    gBattle.MazeFactory = {
        createMaze: function(iLength,jLength,unitDict) {
	        var newMaze=new gBattle.Maze();
	        newMaze.iLength=iLength;
	        newMaze.jLength=jLength;
	        var posToUnit=newMaze.posToUnit=new Array(iLength);
	        for(var i=0;i<iLength;i++){
	            posToUnit[i]=new Array(jLength);
	        }
	        _.each(unitDict,function(unit){
	            posToUnit[unit.i][unit.j]=unit;
	        });
	        return newMaze;
        }
    };
    gBattle.BattleFactory = {
        createBattleByName:function(name){
            if(name){
                var script=gScript.battleScript[name];
	            if(script){
	                return this.createBattleByScript(script);
	            }
            }
            var script=gScript.battleScript["default"];
            return this.createBattleByScript(script);
        },
        createBattleByScript:function(script) {
            // i,j,unitArray
            var iLength = script.unitArray.length;
            var jLength = script.unitArray[0].length;
            var unitArray = script.unitArray;
            // create unitDict,gameMaze;
            var unitDict = {};
            var maze = null;
            for (var i = 0; i < iLength; i++) {
                for (var j = 0; j < jLength; j++) {
                    var code = unitArray[i][j];
                    if (code === 0) {
                        continue;
                    } else {
	                    var unit=gFactory.createUnit(i,j,code);
	                    if(unit){
		                    unitDict[unit.unitId] = unit;
	                    }
                    }
                }
            }
            // set game maze;
            var maze = gFactory.createMaze(iLength,jLength,unitDict);
            var battleField=new gBattle.BattleField();
	        battleField.maze=maze;
	        battleField.unitDict=unitDict;
            battleField.scriptName=script.scriptName;
	        _.each(unitDict,function(unit){
	            unit.battleField=battleField;
	        });
            _.each(unitDict,function(unit,unitId){
                if(typeof(unit.moveTrigger)=="function"){
                    battleField.moveTriggerDict[unitId]=unit;
                }
            });
	        return battleField;
        }
    };
    gFactory.createMaze=function(il,jl,unitDict){
        return gBattle.MazeFactory.createMaze(il,jl,unitDict);
    }
    gFactory.createUnit=function(i,j,id,code){
        return gBattle.UnitFactory.createUnit(i,j,id,code);
    }
    gFactory.createBattle=function(name){
        return gBattle.BattleFactory.createBattleByName(name);
    }
    //}}}
};
