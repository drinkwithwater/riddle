var gLogic=gLogic||{}
gLogic.MazeCell=function(){
  this.x=-1;
  this.y=-1;
  this.content=null;
  this.init=function(x,y,unit){
    this.x=x;
    this.y=y;
    if(unit){ this.content=unit; }
    else{ this.content=null; }
  }
  this.isEmpty=function(){
    if(this.content===null){
      return true;
    }else{
      return false;
    }
  }
}
gLogic.Maze = function(){
  var xLength=20;
  var yLength=20;
  var posToUnit=null;

  var valid=function(x,y){
    if(x>=xLength||x<0){
      return false;
    }
    if(y>=yLength||y<0){
      return false;
    }
    return true;
  }
  /**
   * init from the base config
   */
  this.init=function(xx,yy,unitDict){
    //init x,y,length
    xLength=xx;
    yLength=yy;
    posToUnit=new Array(xLength);
    for(var i=0;i<xLength;i++){
      posToUnit[i]=new Array(yLength);
    }
    //init units
    for(var k in unitDict){
      var tempUnit=unitDict[k];
      posToUnit[tempUnit.x][tempUnit.y]=tempUnit;
    }
  }
  /**
   * @param ([gLogic.Point]) path
   */
  this.getCellPath=function(path){
    var l=path.length;
    var cellPath=new Array(l);
    for(var i=0;i<l;i++){
      var pos=path[i];
      var x=pos.x;
      var y=pos.y;
      //check size valid
      if(!valid(pos)){ return null; }
      //create cell
      var unit=posToUnit[x][y];
      var cell=new gLogic.MazeCell();
      cell.init(x,y,unit);
      cellPath[i]=cell;
    }
    return cellPath;
  }
  /**
   * @param (gLogic.Point) point
   */
  this.getCell=function(point){
    console.log("this function is TODO");
  }
}
