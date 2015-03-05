module.exports=function(env){
///{{{
        var gBattle=env.gBattle=env.gBattle||{}
        gBattle.mazeScript=new Array();
        gBattle.mazeScript[0]={
            battleType:0,
            iLength:6,
            jLength:6,
            unitArray:[[0,0,0, 0,1,0],
                       [0,0,0, 0,2,0],
                       [0,0,0, 0,0,0],

                       [0,0,0, 0,4,0],
                       [0,0,0, 0,0,0],
                       [0,0,0, 0,0,1]]
        }
///}}}
}