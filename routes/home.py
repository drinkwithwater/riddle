from util import *


@app.route("/")
@app.route("/home")
def home():
    return redirect("/design/index.html")
