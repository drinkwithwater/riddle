(function(){
    var unitToString=function(unit){
        if(unit){
            return "yes";
        }else{
            return "null";
        }
    }
    function setIJStr(i,j,str){
    	$("#maze tr#"+String(i)+" td#"+String(j)).html(str);
    }
    function refresh(){
        var posToUnit=gTest.testImpl.logicService.gameMaze.posToUnit;
        for(var i=0,il=posToUnit.length;i<il;i++){
            var unitsi=posToUnit[i];
            for(var j=0,jl=unitsi.length;j<jl;j++){
                var unitsij=unitsi[j];
                setIJStr(i,j,unitToString(unitsij));
        	}
        }
    }
    function init(){
        var posToUnit=gTest.testImpl.logicService.gameMaze.posToUnit;
        var table=$("#maze");
        for(var i=0,il=posToUnit.length;i<il;i++){
            var unitsi=posToUnit[i];
            var tr=$("<tr></tr>").attr("id",String(i));
            for(var j=0,jl=unitsi.length;j<jl;j++){
                var unitsij=unitsi[j];
                var td=$("<td></td>").attr("id",String(j));
                td.html(unitToString(unitsij));
                td.addClass("cell");
                td.attr("data-x",i);
                td.attr("data-y",j);
                tr.append(td);
        	}
            table.append(tr);
        }
    }
    function test(){
    	setIJStr(1,1,"fdsfdsfdsfs");
    }
    $(document).ready(function(){
        $("#init").click(init);
        $("#test").click(test);
    });
})()
/*
var tableContent=[[1,2,3,4,5, 6,7,8,9,1],
                  [1,2,3,4,5, 6,7,8,9,0],
                  [2,3,4,5,6, 7,8,9,0,1],
                  [1,2,3,4,5, 6,7,8,9,0],
                  [2,3,4,5,6, 7,8,9,0,1],

                  [1,2,3,4,5, 6,7,8,9,0],
                  [1,2,3,4,5, 6,7,8,9,0],
                  [1,2,3,4,5, 6,7,8,9,0],
                  [1,2,3,4,5, 6,7,8,9,0],
                  [1,2,3,4,5, 6,7,8,9,0]]
function tableCtrl($scope){
  $scope.table=tableContent;
  $scope.show=function(){
      var units=gTest.testImpl.logicService.gameMaze.posToUnit;
      for(var i=0,il=units.length;i<il;i++){
          for(var j=0,jl=unitsi.length;j<jl;j++){
              tableContent[i][j]=unitToString(units[i][j]);
          }
      }
  }
  $scope.test=function(){
  }
}*/