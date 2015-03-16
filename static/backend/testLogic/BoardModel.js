var gModels=gModels||{}
gModels.BoardModel=Backbone.Model.extend({
  defaults:{
    width:10,
    height:10
  },
  initialize:function(mazeJson){
      /*
      var cells=new Array(this.height)
      var thisJSON=this.toJSON()
      for(var i=0;i<thisJSON.height;i++){
        cells[i]=new Array(thisJSON.width);
        for(var j=0;j<thisJSON.width;j++){
          cells[i][j]=new gModels.CellModel({i:i,j:j});
        }
      }
      this.set("cells",cells);*/
  },
  toJSON:function(){
    return {width:this.get("width"),
            height:this.get("height"),
            cells:this.get("cells")}
  }
});
