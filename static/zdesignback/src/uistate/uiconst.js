var gUIState=gUIState||{};
(function(){
var uiConst={};
uiConst.CELL_BASE=00;

uiConst.UNIT_NULL=10;
uiConst.UNIT_ONE=11;

uiConst.AREA_OUT=20;
uiConst.AREA_IN_MOVE=21;
uiConst.AREA_IN_ATTACK=22;
uiConst.AREA_IN_MOVE_ATTACK=23;
uiConst.AREA_IN_NOT=24;

uiConst.SELECT_EMPTY=30;
uiConst.SELECT_START=31;
uiConst.SELECT_MOVE_PATH=32;
uiConst.SELECT_ATTACK_PATH=33;
uiConst.SELECT_END=34;

uiConst.MOUSE_OUT=40;
uiConst.MOUSE_IN=41;

gUIState.uiConst=uiConst;
})()
