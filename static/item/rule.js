var gCell=gCell||{}
gCell.RuleCell=gCell.BaseCell.extend({
    onCommand:function(src,delta,command){
    },
});
gCell.ParentMoveCell=gCell.RuleCell.extend({
    onCommand:function(src,delta,command){
        if(command=="force"){
            if(_.isEmpty(this.parent)){
                return false;
            }else{
                // TODO
                this.parent.moveTo();
                return true;
            }
        }
    },
});
