var http=require("http");
var url=require("url");
var util=require("util");
var server=new http.Server();
server.on("request",function(req,res){
  console.log(req.url);
  var post="";
  req.on("data",function(chunk){
    console.log(chunk.toString()[1]);
    console.log(chunk.toString()[2]);
    console.log("on1");
  });
  req.on("end",function(){
    console.log(post);
  });
  var temp=util.inspect(url.parse(req.url,true));
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write("<h1>hello world</h1>")
  res.end();
});
server.listen(30000);
