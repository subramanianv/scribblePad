var server=require('http').createServer(handler);
var fs=require('fs');
server.listen(8080);
console.log('The server is running at http://localhost:'+server.address().port);

function handler(request,response) {
  console.log('New client request');
  fs.readFile(__dirname + '/scribblePad.html', function (error,data) {
    if(error) {
   
      response.writeHead(500);
      response.end('Error in displaying');
      return;
    }
    else {
      response.writeHead(200);
      response.end(data);
    }
    
  });

};
