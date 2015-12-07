var BaseCell=gUtil.Class.extend({
    father:"cell",
    constructor:function(father){
        BaseCell.__super__.constructor.apply(this,arguments);
        this.father=father||undefined;
    },
    onCommand:function(delta,command){
    }
});
var MoveCell=BaseCell.extend({
    onCommand:function(delta,command){
        if(command==1){
        }
    }
});
var ItemCell=gUtil.Class.extend({
    father:"cell",
    ijCell:"array",
    constructor:function(father){
        this.father=father||undefined;
    },
    onDirectRecv:function(){
    },
    sendDirect:function(){
    },
});
