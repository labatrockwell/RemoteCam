var socket = io.connect('http://10.1.2.150:3000');
var thisID;

socket.on('photo', function (data) {
    document.body.style.backgroundImage='url("' + data + '")';
    document.getElementById("words").innerHTML = "";
    var divElement = document.querySelector("#div");
    divElement.classList.add("noTextBackground");
});

socket.on('takingPhotoText', function (data) {
    document.getElementById("words").innerHTML = "TAKING PHOTO...";
    var divElement = document.querySelector("#div");
    divElement.classList.remove("noTextBackground");
    divElement.classList.add("textWithBackground");
});

function getPhoto()
  {
    socket.emit('send', null);
  }