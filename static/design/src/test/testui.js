var unitToString=function(unit){
	if(unit){
	    return "yes";
	}else{
	    return "null";
	}
}
var stateToCssStatic={}
var stateToCss=function(state){
	if(stateToCssStatic){
		return stateToCssStatic[state];
	}else{
		var uiConst=gUIState.uiConst;
		for(var k in uiConst){
			stateToCss[uiConst[k]]=k
		}
		return stateToCssStatic[state];
	}
}
function TestUILayer(){
	var self=this;
    var setIJStr=function(i,j,str){
    	$("#maze tr#"+String(i)+" td#"+String(j)).html(str);
    }
    var setIJCell=function(i,j,cell){
    	var str0=stateToCss(cell.cellLevelState);
    	var str1=stateToCss(cell.unitLevelState);
    	var str2=stateToCss(cell.areaLevelState);
    	var str3=stateToCss(cell.selectLevelState);
    	var str4=stateToCss(cell.mouseLevelState);
    	var strClass=str0+" "+str1+" "+str2+" "+str3+" "+str4;
    	$("#maze tr#"+String(i)+" td#"+String(j)).attr("class",strClass);
    }
    var mouseBind=function(cell){
        cell.click(function(){
        	var x=cell.attr("data-x");
        	var y=cell.attr("data-y");
        	self.choose.click(x,y);
        });
        cell.mouseover(function(){
        	var x=cell.attr("data-x");
        	var y=cell.attr("data-y");
        	self.choose.over(x,y);
        });
        cell.mouseout(function(){
        	var x=cell.attr("data-x");
        	var y=cell.attr("data-y");
        	self.choose.out(x,y);
        });
    }
    this.init=function(){
    	//init the table content
        var posToUnit=gTest.testImpl.logicService.gameMaze.posToUnit;
        var table=$("#maze");
        for(var i=0,il=posToUnit.length;i<il;i++){
            var unitsi=posToUnit[i];
            var tr=$("<tr></tr>").attr("id",String(i));
            for(var j=0,jl=unitsi.length;j<jl;j++){
                var unitsij=unitsi[j];
                var td=$("<td></td>").attr("id",String(j));
                td.html(unitToString(unitsij));
                mouseBind(td);
                td.attr("data-x",i);
                td.attr("data-y",j);
                tr.append(td);
        	}
            table.append(tr);
        }
        //set ui
        var posToUnit=gTest.testImpl.uiService.setTestUI(self);
    }
    this.getIJ=function(x,y){
    }
    this.refresh=function(){
        var posToUnit=gTest.testImpl.logicService.gameMaze.posToUnit;
        for(var i=0,il=posToUnit.length;i<il;i++){
            var unitsi=posToUnit[i];
            for(var j=0,jl=unitsi.length;j<jl;j++){
                var unitsij=unitsi[j];
                setIJStr(i,j,unitToString(unitsij));
        	}
        }
    }
}
(function(){
	var testui=new TestUILayer();
    function test(){
    	testui.setIJStr(1,1,"fdsfdsfdsfs");
    }
    $(document).ready(function(){
    	testui.init();
        $("button#test").click(test);
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