module.exports=function(env){
    ///{{{
    var gBattle=env.gBattle=env.gBattle|| {}
    var gFactory=env.gFactory=env.gFactory||{}
    gBattle.UnitFactory = {
        createUnit: function(i,j,aDict) {
            var typeKey = aDict.unitCode;
	        if(typeKey<=0) return null;
            else{
                var typeName=gScript.unitTypeNameDict[typeKey];
                var newUnit = new gBattle.unitClassDict[typeName]();
	            newUnit.i=i;
	            newUnit.j=j;
	            newUnit.unitId=gScript.createCommonId(i,j);
                // set attr from script
                if(aDict.ap!=0) newUnit.ap=aDict.ap;
                if(aDict.hp!=0) newUnit.hp=aDict.hp;
                if(aDict.ar!=0) newUnit.attackRange=aDict.ar;
                if(aDict.tr!=0) newUnit.triggerRange=aDict.tr;
                if(aDict.key!=0) newUnit.key=true;
                else newUnit.key=false;
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
            var hpArray = script.hpArray;
            var apArray = script.apArray;
            var arArray = script.arArray;
            var trArray = script.trArray;
            var keyArray = script.keyArray;
            // create unitDict,gameMaze;
            var unitDict = {};
            var maze = null;
            for (var i = 0; i < iLength; i++) {
                for (var j = 0; j < jLength; j++) {
                    var unitCode = unitArray[i][j];
                    if (unitCode === 0) {
                        continue;
                    } else {
                        var aDict={
                            unitCode:unitCode,
                            ap:apArray?apArray[i][j]:0,
                            hp:hpArray?hpArray[i][j]:0,
                            ar:arArray?arArray[i][j]:0,
                            tr:trArray?trArray[i][j]:0,
                            key:keyArray?keyArray[i][j]:0,
                        }
	                    var unit=gFactory.createUnit(i,j,aDict);
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
                    if(this.isTransfer){
                        battleField.transferDict[unitId]=unit;
                    }else{
                        battleField.moveTriggerDict[unitId]=unit;
                    }
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
