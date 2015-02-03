var gLogic=gLogic||{}
gLogic.MazeCell=gUtil.Class.extend({
  x:-1,
  y:-1,
  content:null,
  init:function(x,y,unit){
    this.x=x;
    this.y=y;
    if(unit){ this.content=unit; }
    else{ this.content=null; }
  },
  isEmpty:function(){
    if(this.content===null){
      return true;
    }else{
      return false;
    }
  }
});
gLogic.Maze = function(){
  var logger=new Logger(this);
	
  this.xLength=20;
  this.yLength=20;
  this.posToUnit=null;
  var self=this;
  var valid=function(x,y){
    if(x>=self.xLength||x<0){
      return false;
    }
    if(y>=self.yLength||y<0){
      return false;
    }
    return true;
  }
  /**
   * init from the base config
   */
  this.init=function(xx,yy,unitDict){
  	logger.info(""+xx+yy);
    //init x,y,length
    self.xLength=xx;
    self.yLength=yy;
    //init posToUnit
    self.posToUnit=new Array(xx);
    for(var i=0;i<xx;i++){
      self.posToUnit[i]=new Array(yy);
    }
    //init units
    for(var k in unitDict){
      var tempUnit=unitDict[k];
      self.posToUnit[tempUnit.x][tempUnit.y]=tempUnit;
    }
  }
  /**
   * @param ([gLogic.Point]) path
   * @return cell wrap path
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
      var unit=self.posToUnit[x][y];
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
