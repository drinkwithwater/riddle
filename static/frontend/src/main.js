var gTemplates=gTemplates||{};
var gViews=gViews||{};
var gModels=gModels||{};
(function(){
  function loadTemplates(names,callback){
    var length=names.length;
    var loadTemplate=function(index){
      var name=names[index];
      console.log("Loading template: "+name);
      $.get("src/templates/"+names[index]+".html",function(data){
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
    $("#main").html(new gViews.BoardView({model:board}).render().el);
  });
}())
