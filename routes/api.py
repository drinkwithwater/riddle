from util import *
import json

@app.route("/api")
def api():
    return "{'hello':'world'}"


def formatArray(array):
    reArray=[None for i in range(len(array))];
    for i in range(len(array)):
        reArray[i]=str(array[i])
    return reArray

def writeFile(scriptName,scriptData):
    scriptFormat="""
    gScript.battleScript["%s"]=%s
    //replace
"""
    scriptFile="static/script/SavedScript.js"
    fileRead=open(scriptFile)
    fileContent=fileRead.read();
    fileContent=fileContent.replace("//replace",scriptFormat%(scriptName,scriptData))
    fileRead.close()
    fileWrite=open(scriptFile,"w")
    fileWrite.write(fileContent);
    fileWrite.close()
    return fileContent


@app.route("/save", methods=["POST"])
def save():
    middle=json.loads(request.data)
    scriptName=middle["scriptName"]
    middle["unitArray"]=formatArray(middle["unitArray"])
    middle["apArray"]=formatArray(middle["apArray"])
    middle["hpArray"]=formatArray(middle["hpArray"])
    data=json.dumps(middle,indent=4)
    data=data.replace("\"[","[").replace("]\"","]").replace("\n","\n    ")
    print str(writeFile(scriptName,data))
    return str(data)



allScriptDict={}

def formatScriptAll(scriptDict):
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
    

@app.route("/saveall",methods=["POST"])
def saveall():
    middle=json.loads(request.data)
    scriptName=middle["scriptName"]
    middle["unitArray"]=formatArray(middle["unitArray"])
    middle["apArray"]=formatArray(middle["apArray"])
    middle["hpArray"]=formatArray(middle["hpArray"])
    data=json.dumps(middle,indent=4)
    data=data.replace("\"[","[").replace("]\"","]").replace("\n","\n    ")
    allScriptDict[scriptName]=data;
    print str(formatScript(allScriptDict))
    return str(data)

