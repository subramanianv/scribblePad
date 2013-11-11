var server=require('http').createServer(handler);
var fs=require('fs');
var io=require('socket.io').listen(server);
var crypto=require('crypto');

server.listen(8080);
console.log('The server is running at http://localhost:'+server.address().port);
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
     console.log(imgData);
     socket.broadcast.emit('imgDataFromOtherClients',imgData);
  });
});
//var md5sum = crypto.createHash('md5');
//md5sum.update(getDateTime());
//console.log(md5sum.digest('hex'));
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

