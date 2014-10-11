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
gLogic.Maze = function(){
  this.xLength=20;
  this.yLength=20;
  this.posToUnit=null;

  /**
   * init from the base config 
   */
  this.initFrom=function(script){
    this.posToCell=new Array(xLength);
    for(i=0;i<xLength;i++){
      this.posToCell[i]=new Array(yLength);
    }
  }
  /**
   * @param ([gLogic.Point]) path
   */
  this.getCellPath=function(path){
  }
  /**
   * @param (gLogic.Point) point
   */
  this.getCell=function(point){
  }
}
