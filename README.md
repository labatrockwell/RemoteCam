RemoteCam
=====

A general webservice that handles taking pictures with a webcam or DSLR.

## Organization
There are two folders, one contains files that go on the computer that has the camera connected to it. The other goes on the computer to be used as a server.

## Camera Computer
Currently the camera computer is implemented on a Raspberry PI. A server on this computer listens for a button press from a button attached to the PI's GPIO, or for a mouse click from a webpage that is served by this server.

### Dependencies
(instructions given for Raspberry Pi)
#### Node.js
*sudo apt-get upgrade; 
sudo apt-get update
Express.js

![alt tag](http://ngng.gotovac.org/wp-content/uploads/2014/04/Raspberry-Pi-GPIO-Layout-Revision-2-e1347664831557.png)
