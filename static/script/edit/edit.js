var gEdit=gEdit||{}
gEdit.Script=gUtil.Class.extend({
    scriptName:"notset",
    iLength:10,
    jLength:10,
    battleType:0,
    unitArray:[],
    apArray:[],
    hpArray:[],
    constructor:function(iLength,jLength){
        if(iLength){
            this.iLength=iLength;
        }
        if(jLength){
            this.jLength=jLength;
        }
        this.unitArray=new Array(this.iLength);
        for(var i=0;i<this.iLength;i++){
            this.unitArray[i]=new Array(this.jLength);
            this.apArray[i]=new Array(this.jLength);
            this.hpArray[i]=new Array(this.jLength);
        }
    },
    setUnit:function(i,j,type,ap,hp){
        this.unitArray[i][j]=type;
        this.apArray[i][j]=ap;
        this.hpArray[i][j]=hp;
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
        };
    }
});
gEdit.Cell=gUtil.Class.extend({},{
    setUnitHTML:function(el$){
        var defaultUnit=gScript.unitNumericalDict["wall"];
        var select=$("<select></select>").addClass("type");
        _.each(gScript.unitTypeNameDict,function(typeName){
            var option="<option value=\""+typeName+"\">"+
                typeName+"</option>"
            select.append(option);
        });
        select.val("wall");
        var ap=$("<input></input>").addClass("ap").val(
            defaultUnit.ap
        );
        var hp=$("<input></input>").addClass("hp").val(
            defaultUnit.hp
        );
        select.change(function(e){
            var typeName=$(e.target).val();
            var numerical=gScript.unitNumericalDict[typeName];
            ap.val(numerical.ap);
            hp.val(numerical.hp);
        });
        el$.append(select).append(ap).append(hp);
    },
    parseUnit:function(el$,i,j){
    }
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
        for(var i=0;i<script.iLength;i++){
            for(var j=0;j<script.jLength;j++){
                var area$=this.area$(i,j);
                var typeName=area$.find("select.type").val();
                var ap=area$.find("input.ap").val();
                var hp=area$.find("input.hp").val();
                script.setUnit(i,j,typeName,ap,hp);
                break;
            }
            break;
        }
        return script;
    },
    firstRender:function(){
        var thisVar=this;
        $("#print").on("click",function(){
            var script=thisVar.getScript();
            console.log(JSON.stringify(script.toJSON()));
        });
    },
    reRender:function(){
        var script=this.script;
        $("#main").html(this.template({
            iLength:script.iLength,
            jLength:script.jLength,
        }));
        for(var i=0;i<script.iLength;i++){
            for(var j=0;j<script.jLength;j++){
                var area$=this.area$(i,j);
                var clear=$("<button class=\"clear\"></button>").html("+("+i+","+j+")");
                area$.append(clear);
                var div=$("<div></div>");
                area$.append(div);
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
            console.log(321);
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