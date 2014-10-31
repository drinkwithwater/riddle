function tableCtrl($scope){
  var tableContent=[[1,2,3],[1,3]];
  $scope.table=tableContent;
  $scope.tableClear=function(){
    for(var i=0,l=tableContent.length;i<l;i++){
      tableContent.pop();
    }
  }
}