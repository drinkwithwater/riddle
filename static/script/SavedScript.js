module.exports=function(env){
    var gScript=env.gScript=env.gScript||{};
    gScript.battleScript=gScript.battleScript||{};
    gScript.battleScript["edit1"]={
        scriptName:"edit1",
        battleType:0,
        iLength:10,
        jLength:10,
        unitArray:[[0,0,0,0,1, 0,0,0,0,0],
                   [0,0,0,0,1, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,1,0, 0,0,0,0,0],
                   [0,0,0,1,0, 0,0,0,0,0],

                   [0,0,0,1,1, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,1, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 1,1,1,1,1]]
    };
}
