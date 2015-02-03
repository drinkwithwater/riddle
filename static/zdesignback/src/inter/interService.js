var gInter=gInter||{}
gInter.InterService=function(){
  this.front=null;
  this.back=null;
  this.init=function(gameTop){
  	this.front=gameTop.getService("ui");
  	this.back=gameTop.getService("logic");
  }
  //back tell front
  this.show=function(showContext){
  	console.log(showList);
  }
  //front tell back
  this.oper=function(operContext){
  	console.log(oper);
  }
}
