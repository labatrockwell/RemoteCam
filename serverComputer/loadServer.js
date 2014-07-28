var http = require('http');
var fs = require('fs');
 http.createServer(function(request,response){
 response.writeHead(200);
 d = new Date();
 epoch=d.getTime();
 var destinationFile = fs.createWriteStream("fromPI/"+epoch+".jpg");
 request.pipe(destinationFile);
 
var fileSize = request.headers['content-length'];
 var uploadedBytes = 0 ;
 
request.on('data',function(d){
 uploadedBytes += d.length;
 var p = (uploadedBytes/fileSize) * 100;
});
 
request.on('end',function(){
 response.end(epoch+".jpg");
 });
 
}).listen(8080,function(){
 
 console.log("server started");
 
 });
