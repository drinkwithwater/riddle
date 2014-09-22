from util import *


@app.errorhandler(404)
def needhelp(error):
    return render_template("404.html")
