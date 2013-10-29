var server=require('http').createServer(handler);
var fs=require('fs');
var io=require('socket.io').listen(server);



server.listen(8080);
console.log('The server is running at http://localhost:'+server.address().port);
console.log(server.address());
function handler(request,response) {
  console.log('New client request');
  fs.readFile(__dirname + '/scribblePad.html', function (error,data) {
    if(error) {
   
      console.log('[ERROR]\n'+error+'\n');
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

io.sockets.on('connection',function(socket) {
  console.log('connected to a client');
  socket.on('receiveImgData',function(imgData) {
       //  console.log(imgData);
     socket.broadcast.emit('imgDataFromOtherClients',imgData);
  });
});
