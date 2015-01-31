template="<h1>id : <%=id %></h1>"
var ViewTry=Backbone.View.extend({
	initialize:function(){
		this.template=_.template(template);
	},
	render:function(eventName){
		$(this.el).html(this.template({id:321}));
		return this;
	}
});
var sth=new ViewTry().render().el
$(document).ready(function(){
	$("#view").html(sth);
});
var aVar=new (Backbone.Model.extend({
	defaults:{
		x:321,
		y:432
	}
}))();
var bVar=new (Backbone.Collection.extend({
}))();
var myCollection=new (Backbone.Collection.extend({
}))();
/*
obj={};
_.extend(obj,Backbone.Events);
obj.on("laugh",function(){
	console.log("obj on laugh");
});
obj.trigger("laugh","vcxvcx");
obj2={};
_.extend(obj2,Backbone.Events);
obj2.listenTo(obj,"laugh",function(){
	console.log("obj2 listen obj laugh");
});
obj.money=3231;
obj2.listenTo(obj,"change:money",function(){
	console.log("obj money change");
});
*/
/*
var Person=Backbone.Model.extend({
	idAttribute:"_id",
    	urlRoot:"/api",
	initialize:function(){
		console.log("person initialize");
	},
    	defaults:function(){
		return {
			"money":4
		}
	},
	dosth:function(){
		TryModel.money=321;
	},
    	validate:function(attrs){
		console.log(attrs);
		if(attrs){
			return "something is wrong"
		}
	}
});
var person=new Person({
	aMap:{k:"v"}
});
var obj={}
_.extend(obj,Backbone.Events);
obj.listenTo(person,"change:aMap",function(){
	console.log("obj listen person change:money");
	console.log(arguments);
});*/
/*
var School=Backbone.Collection.extend({
});
var school=new School();
var obj={}
_.extend(obj,Backbone.Events);
obj.listenTo(school,"add",function(){
	console.log("school add sth");
});
*/
