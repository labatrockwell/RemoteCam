RemoteCam
=====

A general webservice that handles taking pictures with a webcam or DSLR.

## Organization
There are two folders, one contains files that go on the computer that has the camera connected to it. The other goes on the computer to be used as a server.

## Camera Computer
Currently the camera computer is implemented on a Raspberry PI. A server on this computer listens for a button press from a button attached to the PI's GPIO, or for a mouse click from a webpage that is served by this server.

- - - -

### Dependencies
(instructions given for Raspberry Pi)
#### Node.js
* update the PI
 * `sudo apt-get upgrade`
 * `sudo apt-get update`

* download node
 * `wget http://nodejs.org/dist/v0.10.2/node-v0.10.2-linux-arm-pi.tar.gz
tar -xvzf node-v0.10.2-linux-arm-pi.tar.gz`

* paste these paths at the end of _.bashrc_ located in the home directory
 * `NODE_JS_HOME=/home/pi/node-v0.10.2-linux-arm-pi`
 * `PATH=$PATH:$NODE_JS_HOME/bin`


#### Express.js
* `sudo npm install -g express`

#### Socket IO
* `npm install socket.io`

#### OnOff (GPIO pin access in node)
* `npm install onoff`
 
#### Forever
* `sudo npm install forever -g`

#### GPhoto2 (slr camera)
* `sudo apt-get install gphoto2`

#### FSWebcam (webcam)
* `sudo apt-get install fswebcam`

- - - -
 
### Usage

#### Set IP Address
Ip address of the other computer that will act as the server needs to be set here in two places, once in both of these:
* takePhoto.js
* takePictureLoadtoServer
 
#### Choose webcam or DSLR
Comment out the appropriate line in _takePictureLoadtoServer_

#### Start Camera Server
* `node takePhoto.js`

or run with forever:
* `forever start takePhoto.js`

#### Timelapse
Instead of starting the server run this python script for a timelapse. Right now it defaults to taking a picture every 60 seconds. You can change that in the python script.
* `py timelapse.py`
 
#### Button attached to Raspberry PI GPIO
The GPIO is set to the markings in the rectangles below, not the circles. Attach power from any 3V to the button, then take from the button to pin GPIO25 with a 10k ohm pull down resistor going from there to any ground.




![alt tag](http://ngng.gotovac.org/wp-content/uploads/2014/04/Raspberry-Pi-GPIO-Layout-Revision-2-e1347664831557.png)
