(function(){
  var importFiles=[
    "lib/jquery.js",
    "lib/underscore.min.js",
    "lib/backbone.min.js",
    "src/views/cell.js",
    "src/main.js"
  ]
  for(var i=0,l=importFiles.length;i<l;i++){
    document.write("<script src="+importFiles[i]+"></script>");
  }
})()
