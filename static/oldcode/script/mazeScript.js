var gScript=gScript||{}
gScript.scriptCreateUnit=function(x,y,id,code){
	var type=code%0x100;
	var direct=(code%0x1000-type)>>4;
	var newUnit=new gLogic.unitClassDict[type]();
	newUnit.scriptInit(x,y,id,direct);
	return newUnit;
}
gScript.scriptInitLogic=function(index,logicService){
	var script=gScript.mazeScripts[index];
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
				unitDict[counter]=gScript.scriptCreateUnit(x,y,counter,code);
				counter++;
			}
		}
	}
	//set game maze;
	var gameMaze=new gLogic.Maze();
	gameMaze.init(xLength,yLength,unitDict);

	//set
	console.log(logicService.scriptInit);
  	logicService.scriptInit(unitDict,gameMaze);
}
gScript.scriptInitUI=function(index,uiService){
	var script=gScript.mazeScripts[index];
	//x,y,unitArray
	var xLength=script.xLength;
	var yLength=script.yLength;
	var unitArray=script.unitArray;
  	//create unitDict,gameMaze;
	var posToCell=null;
	//counter
	var counter=0;
	posToCell=new Array(xLength);
	for(var x=0;x<xLength;x++){
		posToCell[x]=new Array(yLength);
		for(var y=0;y<yLength;y++){
			posToCell[x][y]=new gUIState.UICell();
		}
	}
	//set posToCell
	uiService.posToCell=posToCell;
}
gScript.mazeScripts=[]
gScript.mazeScripts[0]={
  xLength:6,
  yLength:6,
  //0xRST
  //ST:type, R:direct, 
  unitArray:[[0,0,0, 0,1,0],
             [0,0,0, 0,2,0],
             [0,0,0, 0,0,0],

             [0,0,0, 0,4,0],
             [0,0,0, 0,0,0],
             [0,0,0, 0,0,1]],
  initLogic:function(logicService){gScript.scriptInitLogic(0,logicService);},
  initUI:function(uiService){gScript.scriptInitUI(0,uiService);}
}
gScript.mazeScripts[1]={
  xLength:10,
  yLength:10,
  //0xRST
  //ST:type, R:direct, 
  unitArray:[[0,0,1,0,0, 0,1,0,0,0],
             [0,0,0,0,0, 0,0,0,2,0],
             [0,0,0,0,0, 0,0,0,0,0],
             [0,0,0,0,0, 0,0,0,0,0],
             [0,0,0,3,0, 0,0,0,4,0],

             [0,0,1,0,0, 0,0,0,0,0],
             [0,0,0,3,0, 0,0,0,0,0],
             [0,0,0,0,0, 0,1,0,1,0],
             [0,0,4,0,0, 0,0,0,0,0],
             [0,0,0,0,0, 0,2,0,0,1]],
  initLogic:function(logicService){gScript.scriptInitLogic(1,logicService);},
  initUI:function(uiService){gScript.scriptInitUI(1,uiService);}
}