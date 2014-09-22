from util import *


@app.route("/example")
def example():
    return str(request.args) + " " + str(request.form)


@app.route("/example_t", methods=["POST"])
def example_t():
    return str(request.args) + " " + str(request.form)
