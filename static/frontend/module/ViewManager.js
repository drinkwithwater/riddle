var gUI=gUI||{};
var gTemplates=gTemplates||{};
var htmlView;
gUI.ViewManager=gUtil.Class.extend({
    boardView:null,
    menuView:null,
    viewActionHandler:null,
    modelManager:null,

    moveSpeed:10,//1 cell 1 second

    name:"viewModule",
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.modelManager=gameTop.getModule("modelModule");
            this.viewActionHandler=gameTop.getModule("frontendModule");
        }
    },
    start:function(gameTop){
        var thisVar=this;
        var modelManager=this.modelManager;
        this.loadTemplates(["cell","board","menu"],function(){
            var scriptNames=_.map(gScript.battleScript,
                                  function(v,k){
                                      return k;
                                  });
            thisVar.menuView=new gViews.MenuView({
                scriptNames:scriptNames,
                viewActionHandler:thisVar.viewActionHandler
            });

            $("#menu").html(thisVar.menuView.render().el);

            thisVar.reRender();

            //TODO start a inst
            //if do this ,clean up some code above.
            thisVar.viewActionHandler.viewStart("test1");
        });
    },
    reRender:function(){
        var thisVar=this;
        var modelManager=this.modelManager;
        thisVar.boardView=new gViews.BoardView({
      	    model:modelManager.boardModel,
      	    collection:modelManager.cellCollection,
            viewActionHandler:thisVar.viewActionHandler
        });
	    //for test
	    htmlView=thisVar.boardView;

        $("#main").html(thisVar.boardView.render().el);
        thisVar.boardView.afterRender();
    },
    animatePosMove:function(srcPos,dstPos,callback){
        this.boardView.cellContainer$(srcPos).animate(
            this.boardView.cellPos(dstPos),
            gPoint.euDistance(srcPos,dstPos)/this.moveSpeed*1000,
            "linear",
            callback);
    },


    
    loadTemplates:function (names,callback){
        var length=names.length;
        var loadTemplate=function(index){
            var name=names[index];
            console.log("Loading template: "+name);
            $.get("/frontend/templates/"+names[index]+".html",function(data){
                gTemplates[name]=data;
                index++;
                if(index<length){
                    loadTemplate(index);
                }else{
                    callback();
                }
            });
        }
        loadTemplate(0);
    },
    destroy:function(){
    }
});
