make the message event to more related 
action queue & action detail
ui action show 
message use id instead of pos

maze design:
	shortest path: a very long range observer.
next: add line range attack unit
      a unit can exchange place with another unit at the first attack
      a unit can fly at the first move
      a unit can fly when it kill someone

floor use view or ctrl?


1. frontend:
	unit model detail
	animate

	maze model need change to simple class
	unit type control move ui detail:
		unit model factory

2. backend:
	design:
		normal unit:
            type I:
                1.berserker: the less hp the more damage
                2.hitter: the less distance the more damage???
                3.assassin: first attack make more damage
            type II:
                1.set value by script
		trigger unit:
            type I:
                1.observer: attack the unit moved into range.
                2.wall: attack trigger
            type II:
                1.triggered unit will move pos
                2.trigger only attack once
                3.the less hp the more trigger damage




