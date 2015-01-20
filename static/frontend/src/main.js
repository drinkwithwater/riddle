var templates=templates||{};
var views=views||{};
var models=models||{};
(function(){
  function loadTemplate(name){
    console.log("Loading template: "+name);
    $.get("src/templates/"+name+".html",function(data){
      templates[name]=data;
    });
  }
  loadTemplate("cell");
}())
