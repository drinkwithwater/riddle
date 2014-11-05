(function(){
var logic=[
'/design/src/debug.js',

'/design/src/inter/buffer.js',
'/design/src/inter/context.js',
'/design/src/inter/interService.js',

'/design/src/logic/GamePool.js',
'/design/src/logic/maze.js',
'/design/src/logic/simpleClass.js',

'/design/src/logic/skillBase.js',
'/design/src/logic/skillImpl.js',

'/design/src/logic/unitBase.js',
'/design/src/logic/unitImpl.js',

'/design/src/script/mazeScript.js',

'/design/src/gameTop/gameTop.js',

'/design/src/ui/choose.js',

'/design/src/test/testTop.js'
];
for(var i=0;i<logic.length;i++){
  document.write("<script src="+logic[i]+"></script>");
}
})();