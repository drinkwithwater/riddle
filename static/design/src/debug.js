var VarDebug=function(){
  this.varMap={};
  this.varList=[];
  this.add=function(v){
     this.varList[this.varList.length]=v;
  }
  this.show=function(){
    console.log(this.varMap);
    console.log(this.varList);
  }
}
var debugVar=new VarDebug();

var Logger=function(){
  this.FATAL=50;
  this.ERROR=40;
  this.WARN=30;
  this.INFO=20;
  this.DEBUG=10;

  this.level=0;
  //TODO this should be modified
  this.error=function(msg){
    console.error(msg);
  }
  this.info=function(msg){
    console.info(msg);
  }
  this.debug=function(msg){
    console.debug(msg);
  }
}
