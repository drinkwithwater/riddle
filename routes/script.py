from util import *
import json
from common.config import SCRIPT_FILE

_script = {}

def get_script():
    """ Load script from data/script.pkl. """
    global get_script ,_script
    execfile(SCRIPT_FILE,{},{"script":_script})
    get_script = lambda :_script
    return _script


def set_script():
    fileWrite = open(SCRIPT_FILE,"w")
    kvFormat = "script[\"%s\"]=\"\"\"%s\"\"\"\n"
    for k, v in _script.items():
        kvFormat % (k, v)
        fileWrite.write(kvFormat % (k, v))
    fileWrite.close()


@app.route("/loadscript")
def loadscript():
    scriptDict = get_script()
    fileFormat = """
    module.exports=function(env){
    var gScript=env.gScript=env.gScript||{};
    gScript.battleScript=gScript.battleScript||{};
    %s}
    """
    scriptFormat = """
    gScript.battleScript["%s"]=%s
    """
    allScriptStr = ""
    for k, v in scriptDict.items():
        allScriptStr += scriptFormat%(k, v)
    from flask import make_response
    response = make_response(fileFormat % allScriptStr)
    response.headers["Content-Type"] = "application/javascript"
    return response



def formatArray(array):
    reArray=[None for i in range(len(array))]
    for i in range(len(array)):
        reArray[i]=str(array[i])
    return reArray


@app.route("/savescript",methods=["POST"])
def savescript():
    middle=json.loads(request.data)
    scriptName=middle["scriptName"]
    middle["unitArray"]=formatArray(middle["unitArray"])
    middle["apArray"]=formatArray(middle["apArray"])
    middle["hpArray"]=formatArray(middle["hpArray"])
    data=json.dumps(middle,indent=4)
    data=data.replace("\"[","[").replace("]\"","]").replace("\n","\n    ")
    _script[scriptName]=data
    set_script()
    return str(data)

