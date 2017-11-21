const express = require('express')
const app = express()
var fs = require("fs")
var bodyParser = require('body-parser')
var PythonShell = require('python-shell');
var net = require('net');
var path = require('path')
var utils = require('./utils.js')

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));

var HOST = '127.0.0.1';
var cPORT = 5000;

var client = new net.Socket();

var HOST = '127.0.0.1';
var sPORT = 6000;
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {

        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        utils.getVals(JSON.parse(data.toString("utf-8")))

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(sPORT, HOST);

console.log('Server listening on ' + HOST +':'+ sPORT);





app.listen(3000, () => console.log('Listening on port 3000!'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.post('/', function(req, res){

    // var buf = Buffer.from(req.body.image, 'base64')
    // console.log(buf.toString())
    fs.writeFile("image.jpg", new Buffer(req.body.image, "base64"), function(err) {

      client.connect(cPORT, HOST, function() {

          console.log('CONNECTED TO: ' + HOST + ':' + cPORT);
          // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
          client.write("Start Prediction")
      });
    });

    predict("Image Here")

    setTimeout(function(){

        res.send(
            console.log("Timeout...")
        );

    }, 1000)


  })
