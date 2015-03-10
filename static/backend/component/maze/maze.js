var gBattle=gBattle||{}
gBattle.MazeCell=gUtil.Class.extend({
  i:null,
  j:null,
  content:null,
  constructor:function(i,j,unit){
    gUtil.Class.apply(this,arguments);
    this.i=i;
    this.j=j;
    if(unit){ this.content=unit; }
  },
  isEmpty:function(){
    if(this.content===null){
      return true;
    }else{
      return false;
    }
  }
});
gBattle.Maze = gUtil.Class.extend({
  iLength:20,
  jLength:20,
  posToUnit:null,
  valid:function(i,j){
    if(i>=this.iLength||i<0){
      return false;
    }
    if(j>=this.jLength||j<0){
      return false;
    }
    return true;
  }
  /**
   * init from the base config
   */
  init:function(ii,jj,unitDict){
      //init x,y,length
    this.iLength=ii;
    this.jLength=jj;
    //init posToUnit
    this.posToUnit=new Array(ii);
    for(var i=0;i<ii;i++){
      this.posToUnit[i]=new Array(jj);
    }
    //init units
    for(var k in unitDict){
      var tempUnit=unitDict[k];
      self.posToUnit[tempUnit.i][tempUnit.j]=tempUnit;
    }
  }
  /**
   * @param ([gLogic.Point]) path
   * @return cell wrap path
   */
  getCellPath:function(path){
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
  getCell:function(point){
    console.log("this function is //TODO");
  }
})
