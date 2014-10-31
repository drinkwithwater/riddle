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
var unitToString=function(unit){
	if(unit){
		return "yes";
	}else{
		return "null";
	}
}
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
}