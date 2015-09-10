(function(){
  var importFiles=[
    "/lib/jquery.js",
    "/lib/underscore.min.js",
    "/lib/backbone.min.js",
    "/lib/util.js",
    "/lib/point.js",
    "/frontend/views/CellView.js",
    "/frontend/views/BoardView.js",
    "/frontend/models/CellModel.js",
    "/frontend/models/BoardModel.js",
    "/frontend/module/FrontendModule.js",
    "/frontend/module/ActionHandler.js",
    "/frontend/main.js"
  ];
  for(var i=0,l=importFiles.length;i<l;i++){
    document.write("<script src="+importFiles[i]+"></script>");
  }
})()
