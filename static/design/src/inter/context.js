var gInter=gInter||{}
gInter.ContextBase=function(){
  /**
   * @param (gInter.Buffer) buffer
   */
  this.readFrom=function(buffer){}
  /**
   * @param (gInter.Buffer) buffer
   */
  this.writeTo=function(buffer){}
}
///////////////////////////
// back-end to front-end //
///////////////////////////
gInter.ShowMove=function(){
  this.type=1;
  this.uid=null;
  this.x=null;
  this.y=null;
}
gInter.ShowTurn=function(){
  this.type=3;
  this.uid=null;
  this.x=null;
  this.y=null;
}
gInter.ShowAttack=function(){
  this.type=2;
  this.uid=null;
  this.skillId=null;
  this.dstUid=null;
}
gInter.ShowTrigger=function(){
  this.type=4;
  this.uid=null;
  this.srcUid=null;
  this.triggerId=null;
}
gInter.ShowList=function(){
  this.showArray=[];
}
gInter.ShowList.prototype=new gInter.ContextBase();

///////////////////////////
// front-end to back-end //
///////////////////////////
gInter.OperUnitMove=function(){
}
