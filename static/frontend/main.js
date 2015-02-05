/*var gTemplates=gTemplates||{};
var gViews=gViews||{};
var gModels=gModels||{};
(function(){
  function loadTemplates(names,callback){
    var length=names.length;
    var loadTemplate=function(index){
      var name=names[index];
      console.log("Loading template: "+name);
      $.get("frontend/templates/"+names[index]+".html",function(data){
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

  loadTemplates(["cell","board"],function(){
    var board=new gModels.BoardModel();
    var cells=new gModels.CellCollection();
    cells.add(new gModels.CellModel({i:5,j:5}));
    var temp=new gViews.BoardView({model:board,collection:cells});
    gViews.debug=temp;
    $("#main").html(temp.render().el);
  });
}())
*/
(function(){
gUI.FrontendModule.main();
})();