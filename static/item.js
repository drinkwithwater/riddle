var BaseCell=gUtil.Class.extend({
    father:"cell",
    i:"",
    j:"",
    constructor:function(father){
        BaseCell.__super__.constructor.apply(this,arguments);
        this.father=father||undefined;
    },
    onCommand:function(src,delta,command){
    },
    moveTo:function(dstPos){
        if(_.isEmpty(father)){
            this.i=dstPos.i;
            this.j=dstPos.j;
            return true;
        }else{
            var success=father.moveChild(this,dstPos);
            if(success){
                this.i=dstPos.i;
                this.j=dstPos.j;
                return true;
            }else{
                return false;
            }
        }
    },
});
var FatherMoveCell=BaseCell.extend({
    onCommand:function(src,delta,command){
        if(command=="force"){
            if(_.isEmpty(this.father)){
                return false;
            }else{
                // TODO
                this.father.moveTo();
                return true;
            }
        }
    }
});
var TransferMessageCell;
var ItemCell=BaseCell.extend({
    ijCell:"array",
    
    father:"cell",
    iLength:0,
    jLength:0,
    constructor:function(iLength,jLength,father){
        BaseCell.constructor.apply(this,[father]);
        this.father=father||undefined;
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
