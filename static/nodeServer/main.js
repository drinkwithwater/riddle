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
_=require("../lib/underscore.min.js")._;
function load(nameSpace,files){
	_.each(files,function(fileName){
		var newModule=require(fileName);
		_.extend(nameSpace,newModule);
	});
}
gUtil={};
gBattle={};
gInter={};
gCore={};
gConfig={};
gServer={};
load(gUtil,[ "../lib/util.js" ]);
load(gBattle,[ "../lib/util.js" ]);
load(gInter,[ "../inter/ClientModule.js" ]);
load(gCore,[ "../Core/GameTop.js" ]);
load(gConfig,[ "../Core/config.js" ]);
load(gServer,[ "./HttpServerModule.js" ]);