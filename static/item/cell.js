var gCell=gCell||{}
gCell.CellIdManager={
    counter:1,
    newId:function(){
        this.counter++;
        return "cell:"+this.counter;
    }
}
gCell.BaseCell=gUtil.Class.extend({
    parent:"cell",
    i:"",
    j:"",
    cellId:"",
    constructor:function(parent){
        gCell.BaseCell.__super__.constructor.apply(this,arguments);
        this.parent=parent||undefined;
        this.cellId=gCell.CellIdManager.newId();
    },
    onCommand:function(src,delta,command){
    },
    moveTo:function(dstPos){
        if(_.isEmpty(parent)){
            this.i=dstPos.i;
            this.j=dstPos.j;
            return true;
        }else{
            var success=parent.moveChild(this,dstPos);
            if(success){
                this.i=dstPos.i;
                this.j=dstPos.j;
                return true;
            }else{
                return false;
            }
        }
    },
    getCellId:function(){
        return this.cellId;
    }
});
gCell.TransferMessageCell=gCell.BaseCell.extend({
});
gCell.ItemCell=gCell.BaseCell.extend({
    ijCell:"array",

    parent:"cell",
    iLength:0,
    jLength:0,
    constructor:function(iLength,jLength,parent){
        gCell.BaseCell.constructor.apply(this,[parent]);
        this.parent=parent||undefined;
        this.iLength=iLength;
        this.jLength=jLength;
        this.ijCell=new Array(iLength);
        for(var i=0;i<iLength;i++){
            this.ijCell[i]=new Array(jLength);
        }
    },
    onDirectRecv:function(src,delta,msg){
    },
    sendDirect:function(){
    },
    moveChild:function(srcPos,dstPos){
        if(this.posValid(dstPos) && this.posEmpty(dstPos)){
            var temp=this.ijCell[srcPos.i][srcPos.j];
            this.ijCell[srcPos.i][srcPos.j]=undefined;
            this.ijCell[dstPos.i][dstPos.j]=temp;
            return true;
        }else{
            return false;
        }
    },
    posValid:function(dstPos){
        var i=dstPos.i;
        var j=dstPos.j;
        if(i<0 || i>=this.iLength){
            return false;
        }else if(j<0 || j>=this.jLength){
            return false;
        }else{
            return true;
        }
    },
    posEmpty:function(pos){
        var i=pos.i;
        var j=pos.j;
        var cell=this.ijCell[i][j];
        if(_.isEmpty(cell)){
            return true;
        }else{
            return false;
        }
    }
});
