var gUI=gUI||{};
var gTemplates=gTemplates||{};
gUI.FrontendModule=gUtil.Class.extend({
  boardModel:null,
  boardView:null,
  cellCollection:null,
  clientModule:null,
  actionHandler:null,

  name:"frontendModule",
  init:function(gameTop){
    this.loadTemplates(["cell","board"],function(){
      var board=this.boardModel=new gModels.BoardModel();
      var cells=this.cellCollection=new gModels.CellCollection();
      if(gameTop){
          this.clientModule=gameTop.getModule("clientModule");
      }
      this.actionHandler=new gUI.ActionHandler(this.clientModule);
      this.boardView=new gViews.BoardView({
      	model:board,
      	collection:cells,
      	actionHandler:this.actionHandler
      });

      cells.add(new gModels.CellModel({i:5,j:5}));//just try
      $("#main").html(this.boardView.render().el);
    });
  },
  start:function(){
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
		var game=gUI.frontendInst=new gUI.FrontendModule();
		game.init();
	}
});