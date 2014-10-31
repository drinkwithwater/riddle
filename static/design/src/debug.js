var Logger=function(instance){
  this.instance=instance;
  this.FATAL=50;
  this.ERROR=40;
  this.WARN=30;
  this.INFO=20;
  this.DEBUG=10;

  this.level=0;
  var self=this;
  //TODO this should be modified ,add level check
  this.error=function(msg){
    console.error(self);
    console.error("error:"+msg);
  }
  this.info=function(msg){
  	console.info(self);
    console.info("info:"+msg);
  }
  this.debug=function(msg){
  	console.info(self);
  	console.info("debug:"+msg);
  }
  this.log=function(msg){
  	console.debug(self);
    console.debug("log:"+msg);
  }
}
