var gInter=gInter||{}
gInter.InterService=gUtil.Class.extend({
  front:null,
  back:null,
  init:function(gameTop){
  	this.front=gameTop.getService("ui");
  	this.back=gameTop.getService("logic");
  },
  //back tell front
  show:function(showContext){
  	console.log(showList);
  },
  //front tell back
  oper:function(operContext){
  	console.log(oper);
  },
});
