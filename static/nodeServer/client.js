var http=require("http");
var querystring=require("querystring");
var contents=querystring.stringify({
  name:"dosth",
  dosth:"vcx"
});

var options={
  host:"127.0.0.1",
  port:30000,
  path:"/",
  method:"POST",
  headers:{
    "Content-Type":"application/x-www-form-urlencoded",
    "Content-Length":contents.length
  }
};
var req=http.request(options,function(res){
  res.setEncoding('utf8');
  res.on("data",function(data){
    console.log(data);
  });
}).on("error",function(e){
  console.log(e.stack);
});
req.write(contents);
req.end();
