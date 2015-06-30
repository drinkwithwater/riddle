var gEdit=gEdit||{}
gEdit.Script=gUtil.Class.extend({
    scriptName:"notset",
    iLength:10,
    jLength:10,
    battleType:0,
    unitArray:[],
    apArray:[],
    hpArray:[],
    arArray:[],
    trArray:[],
    keyArray:[],
    nameToNum:{}, // type name to type id
    constructor:function(script){
        if(script){
            _.extend(this,script);
        }else{
            this.unitArray=new Array(this.iLength);
            for(var i=0;i<this.iLength;i++){
                this.unitArray[i]=new Array(this.jLength);
                this.apArray[i]=new Array(this.jLength);
                this.hpArray[i]=new Array(this.jLength);
                this.arArray[i]=new Array(this.jLength);
                this.trArray[i]=new Array(this.jLength);
                this.keyArray[i]=new Array(this.jLength);
                for(var j=0;j<this.jLength;j++){
                    this.unitArray[i][j]=0;
                    this.apArray[i][j]=0;
                    this.hpArray[i][j]=0;
                    this.arArray[i][j]=0;
                    this.trArray[i][j]=0;
                    this.keyArray[i][j]=0;
                }
            }
        }
        var nameToNum=this.nameToNum;
        _.each(gScript.unitTypeNameDict,function(v,k){
            nameToNum[v]=k;
        });
    },
    setUnit:function(i,j,aDict){
        var type=aDict.typeName;
        if((!type)||type=="null"||type[0]=="-"||(!this.nameToNum[type])){
            this.unitArray[i][j]=0;
            this.apArray[i][j]=0;
            this.hpArray[i][j]=0;
            this.arArray[i][j]=0;
            this.trArray[i][j]=0;
            this.keyArray[i][j]=0;
        }else{
            this.unitArray[i][j]=Number(this.nameToNum[type]);
            this.apArray[i][j]=Number(aDict.ap);
            this.hpArray[i][j]=Number(aDict.hp);
            this.arArray[i][j]=Number(aDict.ar);
            this.trArray[i][j]=Number(aDict.tr);
            this.keyArray[i][j]=Number(aDict.key);
        }
    },
    toJSON:function(){
        return {
            scriptName:this.scriptName,
            iLength:this.iLength,
            jLength:this.jLength,
            battleType:this.battleType,
            unitArray:this.unitArray,
            apArray:this.apArray,
            hpArray:this.hpArray,
            arArray:this.arArray,
            trArray:this.trArray,
            keyArray:this.keyArray,
        };
    }
});
gEdit.Cell=gUtil.Class.extend({},{
    setUnitHTML:function(el$,typeName,ap,hp){
        if(!typeName){
            typeName="wall"
        }
        var defaultUnit=gScript.unitNumericalDict[typeName];
        var select$=$("<select></select>").addClass("type");
        _.each(gScript.unitTypeNameDict,function(eachTypeName){
            var option="<option value=\""+eachTypeName+"\">"+
                eachTypeName+"</option>"
            select$.append(option);
        });
        select$.val(typeName);
        var key$=$("<button></button>").addClass("key").html("0");
        var ap$=$("<input></input>").addClass("ap").val(
            ap?ap:defaultUnit.ap
        );
        var hp$=$("<input></input>").addClass("hp").val(
            hp?hp:defaultUnit.hp
        );
        var ar$=$("<input></input>").addClass("ar").val(
            defaultUnit.attackRange?defaultUnit.attackRange:0
        );
        var tr$=$("<input></input>").addClass("tr").val(
            defaultUnit.triggerRange?defaultUnit.triggerRange:0
        );
        key$.on("click",function(e){
            if(key$.html()==="0"){
                key$.html("1");
            }else{
                key$.html("0");
            }
        });
        select$.change(function(e){
            var typeName=$(e.target).val();
            var numerical=gScript.unitNumericalDict[typeName];
            if(typeName=="null"||typeName[0]=="-"){
                return ;
            }
            ap$.val(numerical.ap);
            hp$.val(numerical.hp);
            ar$.val(
                numerical.attackRange?numerical.attackRange:0
            );
            tr$.val(
                numerical.triggerRange?numerical.triggerRange:0
            );
        });
        el$.append(select$).append(key$)
            .append(ap$).append(hp$).append(ar$).append(tr$);
    },
});
gEdit.Main=gUtil.Class.extend({
    script:null,
    init:function(){
        this.template=_.template(this.templateHTML);
        this.script=new gEdit.Script();
    },
    $:function(arg){
        if(arg){
            return $("#main").find(arg);
        }else{
            return $("#main");
        }
    },
    area$:function(i,j){
        return this.$("tr.tr"+i+" td.td"+j+" div.area");
    },
    getScript:function(){
        var script=this.script;
        script.scriptName=$("#scriptname").val();
        for(var i=0;i<script.iLength;i++){
            for(var j=0;j<script.jLength;j++){
                var area$=this.area$(i,j);
                var typeName$=area$.find("select.type");
                var ap$=area$.find("input.ap");
                var hp$=area$.find("input.hp");
                var ar$=area$.find("input.ar");
                var tr$=area$.find("input.tr");
                var key$=area$.find("button.key");
                script.setUnit(i,j,{
                    typeName:typeName$?typeName$.val():null,
                    ap:ap$.val()?ap$.val():0,
                    hp:hp$.val()?hp$.val():0,
                    ar:ar$.val()?ar$.val():0,
                    tr:tr$.val()?tr$.val():0,
                    key:key$.html()
                });
            }
        }
        return script;
    },
    firstRender:function(){
        var thisVar=this;
        // set print button
        $("#print").on("click",function(){
            var script=thisVar.getScript();
            data=JSON.stringify(script.toJSON());
            console.log(data);
        });
        // set save button
        $("#save").on("click",function(){
            var script=thisVar.getScript();
            data=JSON.stringify(script.toJSON());
            console.log(data);
            $.ajax({
                type:"POST",
                data:data,
                url:"/savescript",
                contentType:"application/xml",
            })
        });
        // set script select option
        _.each(gScript.battleScript,function(v,k){
            var option=$("<option></option>").val(k).html(k);
            $("#script").append(option);
        });
        // set load script
        $("#load").on("click",function(){
            var selectScript=$("#script").val();
            thisVar.script=new gEdit.Script(gScript.battleScript[selectScript]);
            thisVar.reRender();
        });
    },
    // reRender this.script in main
    reRender:function(){
        var script=this.script;
        $("#scriptname").val(script.scriptName);
        $("#main").html(this.template({
            iLength:script.iLength,
            jLength:script.jLength,
        }));
        for(var i=0;i<script.iLength;i++){
            for(var j=0;j<script.jLength;j++){
                var area$=this.area$(i,j);
                var unitTypeId=script.unitArray[i][j];
                if(unitTypeId==0){
                    var clear=$("<button class=\"clear\"></button>").html("+("+i+","+j+")");
                    area$.append(clear);
                    var div=$("<div></div>");
                    area$.append(div);
                }else{
                    var typeName=gScript.unitTypeNameDict[unitTypeId]
                    var clear=$("<button class=\"clear\"></button>").html("-("+i+","+j+")");
                    area$.append(clear);
                    var div=$("<div></div>");
                    gEdit.Cell.setUnitHTML(div,typeName);
                    area$.append(div);
                }
            }
        }
        $(".clear").on("click",function(e){
            var buttonText=$(e.target).html();
            var area$=$(e.target).closest(".area");
            if(buttonText[0]=="+"){
                area$.find("button").html("-"+buttonText.substr(1));
                var div=area$.find("div");
                gEdit.Cell.setUnitHTML(div);
            }else{
                area$.find("div").empty();
                area$.find("button").html("+"+buttonText.substr(1));
            }
        });
        $(".type").change(function(e){
            var typeName=$(e.target).val();
            var numerical=gScript.unitNumericalDict[typeName];
            var area$=$(e.target).closest(".area");
            area$.find(".ap").val(numerical.ap);
            area$.find(".hp").val(numerical.hp);
        });
    },
    templateHTML:"<div class=\"board\">"+
    "<div>"+
        "<table>"+
        "<% for(var i=0;i<iLength;i++){ %>"+
            "<tr class=\"tr<%=i%>\">"+
            "<% for(var j=0;j<jLength;j++){ %>"+
                "<td class=\"td<%=j%>\">"+
                    "<div class=\"area\" data-i=\"<%=i%>\" data-j=\"<%=j%>\">"+
                    "</div>"+
                "</td>"+
                "<%}%>"+
            "</tr>"+
            "<%}%>"+
        "</table>"+
    "</div>"+
    "</div>"
});
