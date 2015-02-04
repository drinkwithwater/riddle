var http=require("http");
var url=require("url");
var util=require("util");
var server=new http.Server();
server.on("request",function(req,res){
  console.log(req.url);
  var post="";
  req.on("data",function(chunk){
    console.log(chunk.toString());
    console.log("on1");
  });
  req.on("end",function(){
    console.log(post);
  });
  var temp=util.inspect(url.parse(req.url,true));
  res.writeHead(200,{
    'Content-Type':'text/html:charset=UTF-8',
    'Access-Control-Allow-Methods':'POST',
    'Access-Control-Allow-Origin':'*'
  });
  var data=JSON.stringify({
    data:321,
    key:"value"
  });
  res.write(data);
  res.end();
});
server.listen(30000);
