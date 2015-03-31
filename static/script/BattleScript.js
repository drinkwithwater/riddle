module.exports=function(env){
    ///{{{
    var gScript=env.gScript=env.gScript||{};
    // create common unit id for client and server
    gScript.createCommonId=function(i,j){
        return String(1000*i+j);
    }
    gScript.battleScript={};
    gScript.battleScript["default"]={
        scriptName:"default",
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
    gScript.battleScript["test1"]={
        scriptName:"test1",
        battleType:0,
        iLength:8,
        jLength:8,
        unitArray:[[1,1,1,1, 0,0,0,0],
                   [0,0,0,1, 0,0,0,0],
                   [0,0,0,0, 0,1,0,0],
                   [1,0,1,0, 0,1,0,0],

                   [0,0,1,0, 0,0,0,0],
                   [1,0,1,1, 0,1,0,0],
                   [0,0,0,0, 0,1,0,0],
                   [0,0,0,0, 1,1,1,1]]
    }
    ///}}}
}
