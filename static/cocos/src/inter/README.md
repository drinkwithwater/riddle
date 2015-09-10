1. session
	sessionid define a legal player in sever
	http:
		sessionId
		program:
		1. if session!=null and contain(cookie.GSESSIONID):
				recover
			else:
				allocate new session id.
	tcp:
		sessionId
		program:
		1. connect
		2. message {type:"session",session:"null/sth"}
		3. if session!=null and contain(session):
				recover
			else:
				allocate new session id.

2. room
	event:
		created
		userIn
		userOut
		userDown
		userReconn
		userAction
		begin
		end
	message:

3. sessionId & playerId
one sessionid has one playerid during a battle;

4. (just write sth for thinking)sessionId & userId
userId bind with one accout register with Username and Password
	http:
	1. account login -> get sessionId from server record
	account record the sessionId for last game
	if the game for sessionId existed:
		recover
	else:
		allocate new sessionId;

	2. sessionid -> account login ????
	this way is unsafety
	tcp:

