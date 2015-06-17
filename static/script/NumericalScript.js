module.exports=function(env){
    ///{{{
    var gScript=env.gScript=env.gScript||{};
    gScript.unitNumericalDict={};
    gScript.GROUP_MIDDLE=1;
    gScript.GROUP_ATTACKER=2;
    gScript.GROUP_DEFENSER=3;
    // attacker 
    gScript.unitNumericalDict["flier"]={
        hp:4, ap:2, attackRange:1, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["walker"]={
        hp:4, ap:2, attackRange:1, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["berserker"]={
        hp:4, ap:2, attackRange:1, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["hitter"]={
        hp:4, ap:2, attackRange:1, group:gScript.GROUP_ATTACKER,
    };
    gScript.unitNumericalDict["assassin"]={
        hp:4, ap:2, attackRange:1, group:gScript.GROUP_ATTACKER,
    };

    // defenser
    gScript.unitNumericalDict["trigger"]={
        hp:4, ap:2, group:gScript.GROUP_DEFENSER,
    };
    gScript.unitNumericalDict["wall"]={
        hp:80, ap:2, group:gScript.GROUP_DEFENSER,
    };
    gScript.unitNumericalDict["observer"]={
        hp:4, ap:2, triggerRange:1, group:gScript.GROUP_DEFENSER,
    };
    gScript.unitNumericalDict["rider"]={
        hp:4, ap:2, triggerRange:3, group:gScript.GROUP_DEFENSER,
    };
    ///}}}
}
