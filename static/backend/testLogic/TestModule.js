var gUI=gUI||{};
var gTemplates=gTemplates||{};
gUI.TestModule=gUtil.Class.extend({
  boardModel:null,
  boardView:null,
  cellCollection:null,
  actionHandler:null,
  battleField:null,

  init:function(){
  	var thisVar=this;
    this.actionHandler=new gUI.SimpleActionHandler(battleField);
    this.loadTemplates(["cell","board"],function(){
      var board=thisVar.boardModel=new gModels.BoardModel();
      var cells=thisVar.cellCollection=new gModels.CellCollection();
      thisVar.clientModule=gameTop.getModule("clientModule");
      thisVar.boardView=new gViews.BoardView({
      	model:board,
      	collection:cells,
      	actionHandler:thisVar.actionHandler
      });
	//just for test:
	htmlView=thisVar.boardView;

      $("#main").html(thisVar.boardView.render().el);
    });
  },
  start:function(){
  },
    cellHTML:function(cell){
	var inner="";
	var add=function(key,value){
	    inner+="<div>"+key+"="+value+"</div>";
	}
	add("i",cell.i);
	add("j",cell.j);
	add("hp",cell.hp);
	add("unitId",cell.unitId);
	add("ownerId",cell.ownerId);
	return inner;
    },
    refresh:function(){
	var maze=battleField.maze;
	var iLength=maze.iLength;
	var jLength=maze.jLength;
	var boardView=this.boardView;
	for(var i=0;i<iLength;i++){
	    for(var j=0;j<jLength;j++){
		var cell=maze.getCell(i,j);
		boardView.area$(i,j).html(this.cellHTML(cell));
	    }
	}
    },
  loadTemplates:function (names,callback){
    var length=names.length;
    var loadTemplate=function(index){
      var name=names[index];
      console.log("Loading template: "+name);
      $.get("/frontend/templates/"+names[index]+".html",function(data){
        gTemplates[name]=data;
        console.log(data);
        index++;
        if(index<length){
          loadTemplate(index);
        }else{
          callback();
        }
      });
    }
    loadTemplate(0);
  }
}
});
