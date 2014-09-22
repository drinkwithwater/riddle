var VarDebug=function(){
  this.varMap={};
  this.varList=[];
  this.add=function(k,v){
    if(v) varList[varList.length]=v;
    else varMap[k]=v;
  }
  this.show=function(){
    console.log(varMap);
    console.log(varList);
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
  this.error(msg){
    console.error(msg);
  }
  this.info(msg){
    console.info(msg);
  }
  this.debug(msg){
    console.debug(msg);
  }
}
