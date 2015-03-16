var gTest=gTest||{};
var gTemplates=gTemplates||{};
gTest.TestModule=gUtil.Class.extend({
  boardModel:null,
  boardView:null,
  cellCollection:null,
  actionHandler:null,
  battleField:null,

  init:function(){
      var thisVar=this;
      this.battleField=gFactory.createBattle("default");
      this.battleField.eventSender={
	  sendEvents:function(eventArray){
	      thisVar.refresh();
	  }
      }

    this.actionHandler=new gUI.SimpleActionHandler(this.battleField);
    this.loadTemplates(["cell","board"],function(){
      var board=thisVar.boardModel=new gModels.BoardModel();
      thisVar.boardView=new gViews.BoardView({
      	model:board,
      	actionHandler:thisVar.actionHandler
      });
	//just for test:
	htmlView=thisVar.boardView;

      $("#main").html(thisVar.boardView.render().el);
	thisVar.refresh();
    });
  },
  start:function(){
  },
    unitHTML:function(unit){
	var inner="";
	var add=function(key,value){
	    inner+="<div>"+key+"="+value+"</div>";
	}
	add("i",unit.i);
	add("j",unit.j);
	add("hp",unit.hp);
	add("unitId",unit.unitId);
	return inner;
    },
    refresh:function(){
	var maze=this.battleField.maze;
	var iLength=maze.iLength;
	var jLength=maze.jLength;
	var boardView=this.boardView;
	for(var i=0;i<iLength;i++){
	    for(var j=0;j<jLength;j++){
		var unit=maze.getCell(i,j).content;
		var unitHTML="<div>null</div>"
		if(unit){
		    unitHTML=this.unitHTML(unit);
		}
		boardView.area$(i,j).html(unitHTML);
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
},{
    main:function(){
	var sth=new gTest.TestModule()
	sth.init();
	sth.start();
    }
});
