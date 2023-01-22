var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var sizeof = require('object-sizeof');

app.get('/', function (req, res) {
  res.send('running');
})

io.on('connection', function (socket) {
  socket.on('name', (name) => {
    console.log(`connected ${name}`)

    if (name == "video") {
      socket.on('data', function (data) {                     // listen on client emit 'data'
        const imgElem1 = document.getElementById("camera1")
        const imgElem2 = document.getElementById("camera2")
        const imgElem3 = document.getElementById("camera3")
        imgElem1.src = `data:image/jpeg;base64,${data}`
        imgElem2.src = `data:image/jpeg;base64,${data}`
        imgElem3.src = `data:image/jpeg;base64,${data}`
      })
    }
    if (name === "telemetry") {
      socket.on('data', (data) => {
        console.log(data)
      })
    }
  })
})



http.listen(3000, function () {
  console.log('listening on *:3000');
})





// const net = require("net")
//
// const host = '0.0.0.0';
// const port = 5050;
//
// function log_data(data) {
//         document.getElementById("terminal").innerText += ">> " + data + '\n'
//         console.log(data)
//     }
//
// let server = net.createServer(sock => {
//
//     let connName = null
//
//     log_data(`connected: ${sock.remoteAddress}:${sock.remotePort}`);
//
//     let buff = ''
//
//     sock.on('data', (data) => {
//         // sock.write(`${data}`);
//         // if(connName == null) {
//         //     connName = data
//         //     log_data(`Connection identified: ${connName}`)
//         //     return
//         // }
//         // log_data(`${connName}: ${data}`)
//
//         if (Buffer.from(data).toString("utf8") === "end") {
//             buff = ''
//         } else {
//             buff += data
//             const imgElem = document.getElementById("camera1")
//             imgElem.src = `data:image/jpeg;base64,${Buffer.from(buff)}`
//         }
//
//     });
//
//     sock.on('close', (data) => {
//         log_data(`closed: ${sock.remoteAddress}:${sock.remotePort} [${connName}]`)
//     });
//
// })
//
// server.listen(port, host);
//
// log_data(`Server listening on ${host}:${port}`);