(function(){
  var importFiles=[
    "/lib/jquery.js",
    "/lib/underscore.min.js",
    "/lib/backbone.min.js",
    "/lib/util.js",
    "/frontend/views/CellView.js",
    "/frontend/views/BoardView.js",
    "/frontend/models/CellModel.js",
    "/frontend/models/BoardModel.js",
    "/frontend/FrontendModule.js",
    "/frontend/main.js"
  ];
  for(var i=0,l=importFiles.length;i<l;i++){
    document.write("<script src="+importFiles[i]+"></script>");
  }
})()
