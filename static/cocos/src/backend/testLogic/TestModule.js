var gTest=gTest||{};
var gTemplates=gTemplates||{};
// global var
htmlView=null;
battleField=null;
gTest.TestModule=gUtil.Class.extend({
    boardModel:null,
    boardView:null,
    cellCollection:null,
    actionHandler:null,
    battleField:null,

    init:function(){
        var thisVar=this;
        var urlScript=window.location.hash.substr(1);
        this.battleField=gFactory.createBattle(
                urlScript?urlScript:"test1"
        );
        this.battleField.playerDict[0]={
            playerId:0,
            battleField:this.battleField,
        }
        this.battleField.eventSender={
	        sendEvents:function(eventArray){
                console.log(eventArray);
	            thisVar.refresh();
	        },
            sendPlayerEvents:function(player,eventArray){
                thisVar.refresh();
            }
        }
        //global var;
        battleField=this.battleField;

        this.actionHandler=new gUI.SimpleActionHandler(this.battleField);
        var maze=battleField.getMaze();
        this.loadTemplates(["board"],function(){
            var board=thisVar.boardModel=new gModels.BoardModel({
                height:maze.iLength,
                width:maze.jLength
            });
            thisVar.boardView=new gViews.BoardView({
      	        model:board,
      	        actionHandler:thisVar.actionHandler
            });
	        //just for test:
	        htmlView=thisVar.boardView;
            testModule=thisVar;

            $("#main").html(thisVar.boardView.render().el);
	        thisVar.refresh();
        });
    },
    start:function(){
    },
    contentHTML:function(unit){
	    var inner="";
	    var add=function(key,value){
            if(key){
	            inner+="<div>"+key+":"+value+"</div>";
            }else{
	            inner+="<div>"+value+"</div>";
            }
	    }
        var addHide=function(key,value){
            if(key){
	            inner+="<div class=\"hidden\">"+key+":"+value+"</div>";
            }else{
	            inner+="<div class=\"hidden\">"+value+"</div>";
            }
        }
	    addHide(unit.typeName,"<br/>"+unit.unitId);
	    addHide("i",unit.i);
	    addHide("j",unit.j);
	    add(unit.typeName,"");
	    add("",unit.ap+" "+unit.hp);
	    return inner;
    },
    refresh:function(){
	    var maze=this.battleField.maze;
	    var iLength=maze.iLength;
	    var jLength=maze.jLength;
	    var boardView=this.boardView;
	    for(var i=0;i<iLength;i++){
	        for(var j=0;j<jLength;j++){
		        var cell=maze.getCell(i,j);
		        var contentHTML="<div>null</div>"
		        if(!cell.isEmpty()){
		            contentHTML=this.contentHTML(cell.content);
		        }
		        boardView.area$(i,j).html(contentHTML);
	        }
	    }
    },
    loadTemplates:function (names,callback){
        var length=names.length;
        var loadTemplate=function(index){
            var name=names[index];
            console.log("Loading template: "+name);
            $.get("/backend/testLogic/"+names[index]+".html",function(data){
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
},{
    main:function(){
	    var sth=new gTest.TestModule()
	    sth.init();
	    sth.start();
    }
});
