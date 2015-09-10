//new
level:
        1. listener
        2. flyPath
        3. walkPath
        4. bulletContainer
        5. cellContainer for cells
        6. floor 
        7. pos for relative position
        8. background image



//old
1.global state:
	empty->pathing->empty

2.cell state:
	0 CELL_LEVEL base
	1 UNIT_LEVEL null,unit
	1.5 UNIT_STATE_LEVEL null,unit
	2 AREA_LEVEL null,moveArea,attackArea
	3 SELECT_LEVEL null,start,end,movePath,attackPath
	4 MOUSE_LEVEL null,mouseOver

3.logic:
	<empty>:
		move:
				MOUSE_LEVEL toggle
		click:
			check yes-> set start <pathing>
				AREA_LEVEL
				SELECT_LEVEL
			check no -> <empty>
	<pathing>:
		move:
			check yes-> add path <pathing>
			check no -> <empty>
		click:
			check yes-> send path <empty>
			check no -> <empty>
