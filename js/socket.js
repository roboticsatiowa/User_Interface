// Attempting to rewrite the front end.
var cv = require('opencv4nodejs');
var net = require('net');
var struct = require('python-struct');
var pickle = require('picklejs');

var HOST = '';
var PORT = 8089;

var server = net.createServer((socket) => {
  console.log('Socket created');

  console.log('Socket bind complete');

  console.log('Socket now listening');

  let data = Buffer.alloc(0);
  var payloadSize = struct.calcsize('L');

  socket.on('data', (msg) => {
    data = Buffer.concat([data, msg]);

    while (data.length >= payloadSize) {
      var packedMsgSize = data.slice(0, payloadSize);
      data = data.slice(payloadSize);
      var msgSize = struct.unpack('L', packedMsgSize)[0];

      if (data.length < msgSize) {
        break;
      }

      var frameData = data.slice(0, msgSize);
      data = data.slice(msgSize);

      var frame = pickle.loads(frameData);
      cv.imshow('frame', frame);
      cv.waitKey(1);
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}...`);
});

//var app = require('express')();
//var http = require('http').createServer(app);
//var io = require('socket.io')(http);
//var sizeof = require('object-sizeof');
//
//app.get('/', function (req, res) {
//  res.send('running');
//})
//
//io.on('connection', function (socket) {
//  socket.on('name', (name) => {
//    console.log(`connected ${name}`)
//
//    // Video sockets
//    if (name == "video1") {
//      socket.on('data', function (data) {                     // Camera 1
//        const imgElem1 = document.getElementById("camera1")
//        imgElem1.src = `data:image/jpeg;base64,${data}`
//        imgElem2.src = `data:image/jpeg;base64,${data}`
//        imgElem3.src = `data:image/jpeg;base64,${data}`
//      })
//    }
//    if (name == "video2") {
//      socket.on('data', function (data) {                     // Camera 2
//        const imgElem2 = document.getElementById("camera2")
//        imgElem1.src = `data:image/jpeg;base64,${data}`
//        imgElem2.src = `data:image/jpeg;base64,${data}`
//        imgElem3.src = `data:image/jpeg;base64,${data}`
//      })
//    }
//    if (name == "video3") {
//      socket.on('data', function (data) {                     // Camera 3
//        const imgElem3 = document.getElementById("camera3")
//        imgElem1.src = `data:image/jpeg;base64,${data}`
//        imgElem2.src = `data:image/jpeg;base64,${data}`
//        imgElem3.src = `data:image/jpeg;base64,${data}`
//      })
//    }
//    if (name === "telemetry") {
//      socket.on('data', (data) => {
//        console.log(data)
//      })
//    }
//  })
//})
//
//
//
//http.listen(3000, function () {
//  console.log('listening on *:3000');
//})