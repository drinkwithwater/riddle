module.exports=function(env){
    ///{{{
    var gScript=env.gScript=env.gScript||{};
    gScript.unitNumericalDict={};
    gScript.GROUP_MIDDLE=1;
    gScript.GROUP_ATTACKER=2;
    gScript.GROUP_DEFENSER=3;
    // attacker 
    gScript.unitNumericalDict["flier"]={
        hp:20, ap:2, attackRange:1,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };
    gScript.unitNumericalDict["walker"]={
        hp:4, ap:2, attackRange:1,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };
    gScript.unitNumericalDict["berserker"]={
        hp:4, ap:2, attackRange:1,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };
    gScript.unitNumericalDict["hitter"]={
        hp:4, ap:2, attackRange:2,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };
    gScript.unitNumericalDict["assassin"]={
        hp:4, ap:4, attackRange:1,
        group:gScript.GROUP_ATTACKER,
        mp:1,
    };
    gScript.unitNumericalDict["archer"]={
        hp:4, ap:2, attackRange:3,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };
    gScript.unitNumericalDict["lighter"]={
        hp:10, ap:0, attackRange:3,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };
    gScript.unitNumericalDict["two"]={
        hp:4, ap:2, attackRange:2,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };
    gScript.unitNumericalDict["one"]={
        hp:4, ap:2, attackRange:1,
        group:gScript.GROUP_ATTACKER,
        mp:0,
    };

    // defenser
    gScript.unitNumericalDict["trigger"]={
        hp:4, ap:2,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["wall"]={
        hp:80, ap:2,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["observer"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["rider"]={
        hp:4, ap:2, triggerRange:3,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["transfer"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["box"]={
        hp:80, ap:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    
    // transfer
    gScript.unitNumericalDict["transfer1"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["updown1"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["updown2"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    
    gScript.unitNumericalDict["transfer2"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["leftright1"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.unitNumericalDict["leftright2"]={
        hp:4, ap:2, triggerRange:1,
        group:gScript.GROUP_DEFENSER,
        mp:0,
    };
    gScript.getNumericalDict=function(typeName){
        var re=gScript.unitNumericalDict[typeName];
        if(re){
            return re;
        }else{
            console.warn("unit not set, use default");
            return {
                hp:4, ap:2, attackRange:1,
                group:gScript.GROUP_ATTACKER,
                mp:0,
            }
        }
    }
    ///}}}
}
