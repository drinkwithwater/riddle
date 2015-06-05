module.exports=function(env){
    ///{{{
    var gScript=env.gScript=env.gScript||{};
    gScript.unitNumericalDict={};
    gScript.GROUP_MIDDLE=1;
    gScript.GROUP_ATTACKER=2;
    gScript.GROUP_DEFENSER=3;
    // attacker 
    gScript.unitNumericalDict["flier"]={
        hp:20, ap:2, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["walker"]={
        hp:20, ap:2, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["berserker"]={
        hp:20, ap:2, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["hitter"]={
        hp:20, ap:2, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["assassin"]={
        hp:20, ap:2, group:gScript.GROUP_ATTACKER,
    };

    // defenser
    gScript.unitNumericalDict["trigger"]={
        hp:20, ap:2, group:gScript.GROUP_DEFENSER,
    };
    gScript.unitNumericalDict["wall"]={
        hp:20, ap:2, group:gScript.GROUP_DEFENSER,
    };
    gScript.unitNumericalDict["observer"]={
        hp:20, ap:2, group:gScript.GROUP_DEFENSER,
    };
    gScript.unitNumericalDict["rider"]={
        hp:20, ap:2, group:gScript.GROUP_DEFENSER,
    };
    ///}}}
}
