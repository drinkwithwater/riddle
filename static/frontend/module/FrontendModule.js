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
  	var thisVar=this;
    this.loadTemplates(["cell","board"],function(){
      var board=thisVar.boardModel=new gModels.BoardModel();
      var cells=thisVar.cellCollection=new gModels.CellCollection();
      if(gameTop){
          thisVar.clientModule=gameTop.getModule("clientModule");
      }
      thisVar.actionHandler=new gUI.ActionHandler(thisVar.clientModule);
      thisVar.boardView=new gViews.BoardView({
      	model:board,
      	collection:cells,
      	actionHandler:thisVar.actionHandler
      });

      cells.add(new gModels.CellModel({i:5,j:5}));//just try
      $("#main").html(thisVar.boardView.render().el);
      $("#start").on("click",function(){
  	    thisVar.clientModule.sendMessage(new gMessage.CSStart());
      });
    });
  },
  start:function(gameTop){
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
