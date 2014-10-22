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
gInter.ShowEffect=function(){
  this.type=5;
  this.uid=null;
  this.valueType=null;
  this.value=null;
}
gInter.ShowError=function(){
  this.type=-1;
  this.fail=null;
  this.exception=null;
  this.error=null;
  //TODO
}
gInter.ShowContext=function(){
  this.showArray=[];
  this.showAttack=function(uid,skillId,dstUid){
  	var temp=new ShowAttack();
  	temp.uid=uid;
  	temp.skillId=skillId;
  	temp.dstUid=dstUid;
  	this.showArray.push(temp);
  }
  this.showTrigger=function(){
  }
}
gInter.ShowContext.prototype=new gInter.ContextBase();

///////////////////////////
// front-end to back-end //
///////////////////////////
gInter.OperUnitMove=function(){
}
