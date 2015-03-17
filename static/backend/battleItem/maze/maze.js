var gBattle=gBattle||{}
gBattle.MazeCell=gUtil.Class.extend({
    i:null,
    j:null,
    content:null,
    constructor:function(i,j,unit){
	    gUtil.Class.apply(this,arguments);
	    this.i=i;
	    this.j=j;
	    if(unit){ this.content=unit; }
    },
    isEmpty:function(){
	    if(this.content){
	        return false;
	    }else{
	        return true;
	    }
    },
    hasUnit:function(){
	    //TODO explicit the content type
	    if(this.content){
	        return true;
	    }else{
	        return false;
	    }
    }
});
gBattle.Maze = gUtil.Class.extend({
    iLength:20,
    jLength:20,
    posToUnit:null,
    valid:function(pointArgs){
        var pos=gPoint.wrapArgs(arguments);
	    var i=pos.i;
        var j=pos.j;
	    //after filter arguments
	    if(i>=this.iLength||i<0){return false;}
	    if(j>=this.jLength||j<0){return false;}
	    return true;
    },
    /**
     * @param ([{i,j}]) path
     * @return cell wrap path
     */
    pathingCell:function(path){
	    //TODO
	    //check valid
	    var length=path.length;
	    var cellPath=new Array(length);
	    for(var index=0;index<length;index++){
	        var pos=path[index];
	        var i=pos.i;
	        var j=pos.j;
	        //check size valid
	        if(!this.valid(pos)){ return null; }
	        //create cell
	        var unit=this.posToUnit[i][j];
	        var cell=new gBattle.MazeCell(i,j,unit);
	        cellPath[index]=cell;
	    }
	    return cellPath;
    },
    /**
     * @param {i:?,j:?} or (i,j)
     */
    getCell:function(){
	    var i=null,j=null;
	    if(arguments.length==1){
	        if(typeof(arguments[0])=="object"){
		        i=arguments[0].i;
		        j=arguments[0].j;
	        }
	    }else if(arguments.length==2){
	        i=arguments[0];
	        j=arguments[1];
	    }
	    //TODO
	    //check point valid
	    var unit=this.posToUnit[i][j];
	    if(i!=null && j!=null){
	        return new gBattle.MazeCell(i,j,unit);
	    }else{
	        return null;
	    }
    },
    removeCell:function(_pointArgs){
        var pos=gPoint.wrapArgs(arguments,2);
        var content=this.posToUnit[pos.i][pos.j];
        delete this.posToUnit[pos.i][pos.j];
        return content;
    },
    addCell:function(content,_pointArgs){
        var pos=gPoint.wrapArgs(arguments,2);
        this.posToUnit[pos.i][pos.j]=content;
    },
    moveUnit:function(srcPos,dstPos){
        var unit=this.posToUnit[srcPos.i][srcPos.j];
        delete this.posToUnit[srcPos.i][srcPos.j];
        this.posToUnit[dstPos.i][dstPos.j]=unit;
    }
})
