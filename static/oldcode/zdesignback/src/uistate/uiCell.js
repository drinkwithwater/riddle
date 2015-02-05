var gUIState=gUIState||{}
//describe attributes for a cell;
gUIState.UICell=function(){
	this.cellLevelState=0;

	this.unitLevelState=10;
	
	this.areaLevelState=20;
	
	this.selectLevelState=30;
	
	this.mouseLevelState=40;

	this.content=null;
	
	this.x=null;
	this.y=null;
}