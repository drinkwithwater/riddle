floor use view or ctrl?


classDict change numberkey to stringkey to keep consistent between frontend and backend
event detail
message detail
interface check

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
                            2*hp<=maxHp?4:2;
                2.hitter: the less distance the more damage
                            distance<=1?3:1;
                3.assassin: first attack make more damage 
                            first?3:1;
            type II:
                 //It is a hard decision
                 //because the author has no experience in numerical balancing.
                1.high damage with low hp
                2.high hp with low damage
                3.other value
		trigger unit:
			1.triggered unit will move pos
			2.trigger only attack once
			3.the less hp the more trigger damage




