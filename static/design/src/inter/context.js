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
gInter.ShowContext=function(){
  this.showArray=[];
 
  this.showMove=function(uid,x,y){
  	var temp=new ShowMove();
  	temp.uid=uid;
  	temp.x=x;
  	temp.y=y;
  	this.showArray.push(temp);
  }
  this.showTurn=function(uid,x,y){
  	var temp=new ShowTurn();
  	temp.uid=uid;
  	temp.x=x;
  	temp.y=y;
  	this.showArray.push(temp);
  }
  this.showAttack=function(uid,skillId,dstUid){
  	var temp=new ShowAttack();
  	temp.uid=uid;
  	temp.skillId=skillId;
  	temp.dstUid=dstUid;
  	this.showArray.push(temp);
  }
  this.showTrigger=function(uid,srcUid,triggerId){
  	var temp=new ShowTrigger();
  	temp.uid=uid;
  	temp.srcUid=srcUid;
  	temp.triggerId=triggerId;
  }
}
gInter.ShowContext.prototype=new gInter.ContextBase();

///////////////////////////
// front-end to back-end //
///////////////////////////
gInter.OperContext=function(){
  this.operArray=[];
  this.operUnitMovePath=function(uid,path){
  	var temp=new OperUnitMovePath();
  	temp.uid=uid;
  	temp.path=path;
  }
  this.operUnitAttackPath=function(uid,path){
  	//TODO
  }
}
gInter.OperUnitMovePath=function(){
  this.type=10;
  this.uid=null;
  this.path=[];
}
