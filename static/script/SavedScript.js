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
                   [0,0,0,0,0, 1,1,1,1,1]] ,
        
        apArray:  [[0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],

                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0]] ,
        
        apArray:  [[0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],

                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0],
                   [0,0,0,0,0, 0,0,0,0,0]] ,
    };
    
    
    gScript.battleScript["first"]={
        "hpArray": [
            [4, 0, 80, 0, 0, 0, 4, 4, 0, 0], 
            [0, 0, 80, 0, 0, 0, 0, 0, 0, 0], 
            [4, 80, 80, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 4, 0, 4, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], 
        "apArray": [
            [2, 0, 2, 0, 0, 0, 2, 2, 0, 0], 
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0], 
            [2, 2, 2, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 2, 0, 2, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], 
        "unitArray": [
            [5, 0, 11, 0, 0, 0, 1, 1, 0, 0], 
            [0, 0, 11, 0, 0, 0, 0, 0, 0, 0], 
            [10, 11, 11, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 10, 0, 10, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], 
        "scriptName": "first", 
        "battleType": 0, 
        "iLength": 10, 
        "jLength": 10
    }
    
    gScript.battleScript["dsfs"]={
        "hpArray": [
            [0, 0, 0, 80, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 80, 0, 0, 0, 0, 0], 
            [0, 0, 80, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], 
        "apArray": [
            [0, 0, 0, 2, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0], 
            [0, 0, 2, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], 
        "unitArray": [
            [0, 0, 0, 11, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 11, 0, 0, 0, 0, 0], 
            [0, 0, 11, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ], 
        "scriptName": "dsfs", 
        "battleType": 0, 
        "iLength": 10, 
        "jLength": 10
    }
    //replace




}