module.exports=function(env){
    ///{{{
    var gScript=env.gScript=env.gScript||{};
    gScript.unitTypeNameDict={};
    gScript.unitTypeNameDict[0]=null;
    gScript.unitTypeNameDict[1]="flier";
    gScript.unitTypeNameDict[2]="walker";
    gScript.unitTypeNameDict[3]="berserker";
    gScript.unitTypeNameDict[4]="hitter";
    gScript.unitTypeNameDict[5]="assassin";
    gScript.unitTypeNameDict[6]="archer";
    gScript.unitTypeNameDict[7]="lighter";
    gScript.unitTypeNameDict[9]="--------------------";
    gScript.unitTypeNameDict[10]="trigger";
    gScript.unitTypeNameDict[11]="wall";
    gScript.unitTypeNameDict[12]="observer";
    gScript.unitTypeNameDict[13]="rider";
    gScript.unitTypeNameDict[14]="transfer";
    gScript.unitTypeNameDict[15]="box";
    // set category
    gScript.unitCategoryDict={};
    // normal unit
    gScript.unitCategoryDict["flier"]="normal";
    gScript.unitCategoryDict["walker"]="normal";
    gScript.unitCategoryDict["berserker"]="normal";
    gScript.unitCategoryDict["hitter"]="normal";
    gScript.unitCategoryDict["assassin"]="normal";
    gScript.unitCategoryDict["archer"]="normal";
    gScript.unitCategoryDict["lighter"]="normal";
    // trigger unit
    gScript.unitCategoryDict["trigger"]="trigger";
    gScript.unitCategoryDict["wall"]="trigger";
    gScript.unitCategoryDict["observer"]="trigger";
    gScript.unitCategoryDict["rider"]="trigger";
    gScript.unitCategoryDict["box"]="trigger";
    // transfer unit
    gScript.unitCategoryDict["transfer"]="transfer";
    ///}}}
}
