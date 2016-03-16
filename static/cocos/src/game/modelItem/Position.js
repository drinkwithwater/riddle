var gameModel=gameModel||{};
gameModel.Position=gUtil.Class.extend({
    i:"int",
    j:"int",
    x:"int",
    y:"int",
    battleModel:"BattleModel",
    constructor:function(battleModel,i,j){
        this.battleModel=battleModel;
        this.i=i;
        this.j=j;
        var xy=battleModel.pCenter(i,j);
        this.x=xy.x;
        this.y=xy.y;
    },
    stand:function(){
        var xy=this.battleModel.pCenter(this.i,this.j);
        this.x=xy.x;
        this.y=xy.y;
    },
    // 
    getFloatIJ:function(){
        return this.battleModel.xy2ijFloat(this.x,this.y);
    },
    // calculate
    xPlus:function(dx){
        this.x+=dx;
        var iUpdate=Math.floor(this.x/this.battleModel.CELL_SIZE);
        if(this.i!=iUpdate){
            this.i=iUpdate;
            return true;
        }else{
            return false;
        }
    },
    xMinus:function(dx){
        return this.xPlus(-dx);
    },
    yPlus:function(dy){
        this.y+=dy;
        var jUpdate=Math.floor(this.y/this.battleModel.CELL_SIZE);
        if(this.j!=jUpdate){
            this.j=jUpdate;
            return true;
        }else{
            return false;
        }
    },
    yMinus:function(dy){
        return this.yPlus(-dy);
    },
    xMoveTo:function(x,speed){
        var dx=x-this.x;
        if(dx>speed){
            return this.xPlus(speed);
        }else if(dx<-speed){
            return this.xMinus(speed);
        }else{
            return this.xPlus(dx);
        }
    },
    yMoveTo:function(y,speed){
        var dy=y-this.y;
        if(dy>speed){
            return this.yPlus(speed);
        }else if(dy<-speed){
            return this.yMinus(speed);
        }else{
            return this.yPlus(dy);
        }
    },
    clone:function(){
        var clonePos=new gameModel.Position(this.battleModel,this.i,this.j);
        clonePos.x=this.x;
        clonePos.y=this.y;
        return clonePos;
    },
});
