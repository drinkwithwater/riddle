import json
path="../static/cocos/"

outputFile="../game.min.js"
outputOpen=open(outputFile,"w")

with open(path+"package.json") as projectOpen:
    project=json.load(projectOpen)
    jsList=project.get("jsList")
    if(jsList is not None):
        for fileName in jsList:
            fileOpen=open(path+fileName)
            for line in fileOpen.readlines():
                outputOpen.write(line)
            fileOpen.close()

    else:
        print "jsList not existed"

outputOpen.close()
