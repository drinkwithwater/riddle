module.exports=function(env){
  ///{{{
  var gBattle=env.gBattle=env.gBattle|| {}
  gBattle.UnitFactory = {
    createUnit : function(code) {
      var type = code % 0x100;
      var newUnit = new gLogic.unitClassDict[type]();
      newUnit.scriptInit(i, j, id);
      return newUnit;
    }
  };
  gBattle.MazeFactory = {
    createMaze : function() {
    },
    createMazeByUnits : function() {
    }
  };
  gBattle.BattleFactory = {
    createBattle:function(name){
      return {nothing:321}
      //TODO
      if(name){
        var script=gBattle.battleScript[name];
        return this.createBattleByScript(script);
      }else{
        var script=gBattle.battleScript["empty"];
        return this.createBattleByScript(script);
      }
    },
    createBattleByScript : function(script) {
      // i,j,unitArray
      var iLength = script.unitArray.length;
      var jLength = script.unitArray[0].length;
      var unitArray = script.unitArray;
      // create unitDict,gameMaze;
      var unitDict = {}
      var gameMaze = None
        // counter
        var counter = 0;
      for (var x = 0; x < xLength; x++) {
        for (var y = 0; y < yLength; y++) {
          var code = unitArray[x][y];
          if (code === 0) {
            continue;
          } else {
            unitDict[counter] = gScript.scriptCreateUnit(x, y, counter,
                code);
            counter++;
          }
        }
      }
      // set game maze;
      var gameMaze = gFactory.createMazeByUnits(unitDict);
    }
  }
  //}}}
};
