0. This is a combined optimization problem for players.

I. Global view

    1. Comparing with normal SRPG: (sign !!! means very important)
        a) simple&clever ui with logic (reference to Heartstone) !!!
            Explicit battle value in UI make caculating easier.
            Easy operation for touch-screen mobile phone.
        b) explicit enemy AI !!!
            Reference to Age of Empires's setting in bottom left.
            Searching in decision tree become easy for player.
        c) (conclusion for a&b) different design between attacker & trigger !!!
            Attacker design for uesrs' operation.
            Trigger design for users' thinking.
        d) pve mode (reference to diablo3) !!!
            This make it become a combined optimization problem.
            One goal is to maximize outputing damager and minimize incoming damager.
        e) map hiden mode
            Desend the scale of decision tree.
            Decision based on incomplete information.
        f) no complicate unit design

    2. Future design
        a) import some other good concepts
            e.g.
            damage burst stragegy
            hit&run strategy
            map cover with shadow -- information
            operation to owner's unit !!!
        b) range damage
        c) direction towards (not want TODO...)
        d) random value ???

II. Component design
    1. Map script design
        1) riddle type
            a) make rider leaving his place
            b) maximize hp utilize
            c) push box, pokemon ruby...
            d) wrap unit with wall, like prison
            e) transfer with map hiden design !!!
        2) level type
            a) random map with level value setting (rogue like reference to Diablo3)

    2. Unit moving concept
        1) trigger:
            a) push box
            b) rider
            c) trigger attacking between 2 unit in a line
            d) transfer
            e) Pao in Chinese chess
            
        2) attacker:
            a) bomber

    3. Simple skill
    
        1)
            //special for cell map
            a) hiden.
               Not trigger moveing listener (at first attack?).
            b) type - wakeup.
            c) type - moving trigger.
            d) type - moving trigger attack threatened object.
            e) trigger moving attack then return.
            
            f) type - attacking trigger.
            
            g) type - keep attacking utill one's killed.

            //normal
            d) type - just one attack unit (kill itself).
            e) type - first attack trigger.
            f) type - killed by trigger.
            
        2)
            a) unit type counter design
            b) counter formed by simple regulation

    3. subset
        a) push box
        b) chess
        c) dosth
