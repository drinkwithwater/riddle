var gLogic=gLogic||{}
gLogic.scriptCreateUnit=function(x,y,id,code){
	var type=code%0x100;
	var direct=code%0x1000-type;
	var newUnit=new gLogic.unitClassDict[type]();
	newUnit.init(x,y,id,direct);
	return newUnit;
}
gLogic.scriptInitLogic=function(script,logicService){
	//x,y,unitArray
	var xLength=script.xLength;
	var yLength=script.yLength;
	var unitArray=script.unitArray;
  	//create unitDict,gameMaze;
	var unitDict={}
	var gameMaze=[]
	//counter
	var counter=0;
	for(var x=0;x<xLength;x++){
		for(var y=0;y<yLength;y++){
			var code=unitArray[x][y];
			if(code===0){
				continue;
			}else{
				unitDict[counter]=gLogic.scriptCreateUnit(x,y,counter,code);
				counter++;
			}
		}
	}
	//set game maze;
	var gameMaze=new gLogic.Maze();
	gameMaze.init(xLength,yLength,unitDict);

	//set
  	logicService.scriptInit(unitDict,gameMaze);
}
gLogic.mazeScripts=[]
gLogic.mazeScripts[0]={
  xLength:10,
  yLength:10,
  //0xPQRST
  //ST:type, R:direct, Q:
  unitArray:[[0x0,0,1,0,0, 0,1,0,0,0],
             [0,0,0,0,0, 0,0,0,2,0],
             [0,0,0,0,0, 0,0,0,0,0],
             [0,0,0,0,0, 0,0,0,0,0],
             [0,0,0,3,0, 0,0,0,4,0],

             [0,0,1,0,0, 0,0,0,0,0],
             [0,0,0,3,0, 0,0,0,0,0],
             [0,0,0,0,0, 0,1,0,1,0],
             [0,0,4,0,0, 0,0,0,0,0],
             [0,0,0,0,0, 0,2,0,0,1]],
  scriptInit:gLogic.scriptInitLogic
}