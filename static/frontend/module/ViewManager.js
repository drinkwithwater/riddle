var gUI=gUI||{};
var gTemplates=gTemplates||{};
var htmlView; // a global ver for debug
gUI.IModelCallView=new gUtil.Interface({
    reRender:"",
    animatePosMove:"",
    animateBulletMove:"",
    refreshTriggerRange:""
});
gUI.ViewManager=gUtil.Class.extend({
    viewActionHandler:null,
    modelManager:null,

    moveSpeed:10,//1 cell 1 second
    bulletSpeed:20,
    
    boardView:null,
    menuView:null,

    /**
     * backbone use cid as model identity;
     * Class in lib/util.js use _id as model identity;
     * unitViews[unitView.cid]=unitView
    */
    unitViews:"dict",

    name:"viewModule",
    init:function(gameTop){
        var thisVar=this;
        if(gameTop){
	        this.modelManager=gameTop.getModule("modelModule");
            this.viewActionHandler=gameTop.getModule("frontendModule");
        }
        this.unitViews={};
    },
    start:function(gameTop){
        var thisVar=this;
        var modelManager=this.modelManager;
        this.loadTemplates(["unit","board","menu"],function(){
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
            thisVar.viewActionHandler.viewStart("default");
        });
    },
    reRender:function(){
        var thisVar=this;
        var modelManager=this.modelManager;
        thisVar.boardView=new gViews.BoardView({
            viewManager:thisVar,
            modelManager:modelManager,
            viewActionHandler:thisVar.viewActionHandler
        });
	    //for test
	    htmlView=thisVar.boardView;

        $("#main").html(thisVar.boardView.render().el);
        thisVar.boardView.afterRender();
    },
    refreshTriggerRange:function(){
        this.boardView.refreshTriggerRange();
    },
    createUnitView:function(aDict){
        var unitView=new gViews.UnitView(aDict);
        this.unitViews[unitView.cid]=unitView;
        return unitView;
    },
    animatePosMove:function(srcPos,dstPos,callback){
        this.boardView.unitContainer$(srcPos).animate(
            this.boardView.cellPos(dstPos),
            gPoint.euDistance(srcPos,dstPos)/this.moveSpeed*1000,
            "linear",
            callback
        );
    },
    animateBulletMove:function(srcPos,dstPos,callback){
        //TODO needed implement with independent class
        var bullet=this.boardView.bulletContainer$().find("#bullet");
        var width=bullet.width();
        var height=bullet.height();
        
        //  bullet pos is setted as centerpos-bulletsize/2
        var srcCss=this.boardView.centerPos(srcPos);
        srcCss.position="absolute";
        srcCss.left-=bullet.width()/2;
        srcCss.top-=bullet.height()/2;
        
        var dstCss=this.boardView.centerPos(dstPos);
        dstCss.left-=bullet.width()/2;
        dstCss.top-=bullet.height()/2;
        
        bullet.css(srcCss);
        bullet.animate(
            dstCss,
            gPoint.euDistance(srcPos,dstPos)/this.moveSpeed*1000,
            "linear",
            callback
        );
    },
    animateUnitDie:function(pos,callback){
        var s="[data-i="+pos.i+"]"+
              "[data-j="+pos.j+"]"+".unit";
        this.boardView.unitContainer$().find("div").remove(s);
        if(typeof(callback)=="function"){
            callback();
        }
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
        this.boardView=null;
        this.menuView=null;
        this.unitViews={};
    }
});
