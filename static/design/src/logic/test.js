var base=function(){
	this.x="base";
	this.dosth=function(){
		console.log(this.x);
	}
	this.printx=function(){
		console.log(this.x);
	}
}
var ext=function(){
	this.x="ext";
	this.dosth=function(){
		console.log(this.x);
	}
}
ext.prototype=new base();