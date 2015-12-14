var app=angular.module("myApp",[]);
var mainCell=new gCell.ItemCell(10,10);
app.controller("myCtrl",function($scope){
    $scope.main=mainCell;
    $scope.click=function(i,j){
        console.log(i,j);
    }
    $scope.dosth=function(){
    }
});
