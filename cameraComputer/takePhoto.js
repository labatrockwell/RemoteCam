var spawn   = require('child_process').spawn;
var url = require('url');
var express = require('express');
var app     = express();
var io = require('socket.io').listen(app.listen(3000));
var Gpio = require('onoff').Gpio,
    button = new Gpio(25, 'in','both');
var prev_input = 0;
var urlToGetPic="";
var globalSocket = [];
var timeOutHandle;

//this function takes the photo, and sends the url of the photo location through the websocket
function changePhoto() {
  var command = spawn(__dirname + '/takePictureLoadtoServer');
  var output  = [];

  command.stdout.on('data', function(chunk) {
    output.push(chunk);
  }); 

  command.on('close', function(code) {
    if (code === 0) {
      //output is the name of the photo in hex, sent from the shell script. convert it to a string:
      contents = output.toString();

      //append it to the static file server url:
      urlToGetPic="http://10.1.2.216​:4080/"+contents;

      //slice off the new line at the end:
      urlToGetPic=urlToGetPic.slice(0, - 1);

      //if connected to a websocket send the address of the photo through to webpage
      if (globalSocket.length > 0) {
        for (i=0; i<globalSocket.length; i++)
          globalSocket[i].emit('photo', urlToGetPic);
      }

      //set timeout to refresh page if no one uses for
      clearTimeout(timeOutHandle);
      timeOutHandle=setTimeout(function() {
        if (globalSocket.length > 0) {
          for (i=0; i<globalSocket.length; i++)
            globalSocket[i].emit('resetPage', 0);
        }
        console.log("reset it");
      },120000);
    } 
  });
}

//listening for a button press through raspberry pi GPIO
button.watch(function(err, value) {
  if (value && prev_input!=value){
    console.log("button pressed");
    if (globalSocket.length > 0) {
        for (i=0; i<globalSocket.length; i++)
          globalSocket[i].emit('takingPhotoText', 0);
      }
    changePhoto();
  }
  prev_input=value;
});

//websocket
io.sockets.on('connection', function (socket) {
  globalSocket.push(socket);
    
  //listening for a mouse press from the client
  socket.on('send', function (data) {
    console.log("mouse clicked");
    socket.emit('takingPhotoText', 0);
    changePhoto();
  });

  socket.on('disconnect', function () {
    globalSocket.pop();
  });
});

app.use(express.static(__dirname));

console.log("server ready on port 3000");
