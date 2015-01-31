(function(){
  var importFiles=[
    "lib/jquery.js",
    "lib/underscore.min.js",
    "lib/backbone.min.js",
    "lib/util.js",
    "src/views/CellView.js",
    "src/views/BoardView.js",
    "src/models/CellModel.js",
    "src/models/BoardModel.js",
    "src/main.js"
  ];
  for(var i=0,l=importFiles.length;i<l;i++){
    document.write("<script src="+importFiles[i]+"></script>");
  }
})()
