var gLogic=gLogic||{}
gLogic.Cell=function(){
  this.x=-1;
  this.y=-1;
  this.content=null;
  this.isEmpty=function(){
    if(this.content===null){
      return true;
    }else{
      return false;
    }
  }
}
gLogic.Edge=function(){
}
gLogic.Maze = function(){
  this.xLength=20;
  this.yLength=20;
  this.posToCell=null;

  this.initFrom=function(script){
    this.posToCell=new Array(xLength);
    for(i=0;i<xLength;i++){
      this.posToCell[i]=new Array(yLength);
    }
  }
  this.getCellPath()=function(path){
  }
}
