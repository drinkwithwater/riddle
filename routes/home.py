from util import *


@app.route("/")
@app.route("/home")
def home():
    return redirect("/cocos/game.html")
