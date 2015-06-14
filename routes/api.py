from util import *
import json

@app.route("/api")
def api():
    return "{'hello':'world'}"


allScriptDict={}

def formatArray(array):
    reArray=[None for i in range(len(array))];
    for i in range(len(array)):
        reArray[i]=str(array[i])
    return reArray

def formatScript(scriptDict):
    fileFormat="""module.exports=function(env){
    var gScript=env.gScript=env.gScript||{};
    gScript.battleScript=gScript.battleScript||{};
    %s
}
"""
    scriptFormat="""
    gScript.battleScript["%s"]=%s
"""
    allScriptStr=""
    for k,v in scriptDict.items():
        allScriptStr+=scriptFormat%(k,v)
    return fileFormat%allScriptStr


@app.route("/save", methods=["POST"])
def save():
    middle=json.loads(request.data)
    typeName=middle["scriptName"]
    middle["unitArray"]=formatArray(middle["unitArray"])
    middle["apArray"]=formatArray(middle["apArray"])
    middle["hpArray"]=formatArray(middle["hpArray"])
    data=json.dumps(middle,indent=4)
    data=data.replace("\"[","[").replace("]\"","]").replace("\n","\n    ")
    allScriptDict[typeName]=data;
    print str(formatScript(allScriptDict))
    return str(data)
