var gBattle=gBattle||{}
gBattle.unitClassDict={}
gBattle.unitImpl=function(props,staticProps){
    var aUnitClass=gBattle.BaseUnit.extend(props,staticProps);
    if(props.typeName){
        gBattle.unitClassDict[props.typeName]=aUnitClass;
    }else{
        console.warn("unit class defined without typeName");
    }
    return aUnitClass;
}
gBattle.FlierUnit=gBattle.unitImpl({
    typeName:"flier"
});
gBattle.WalkerUnit=gBattle.unitImpl({
    typeName:"walker"
});
gBattle.TriggerUnit=gBattle.unitImpl({
    typeName:"trigger"
});