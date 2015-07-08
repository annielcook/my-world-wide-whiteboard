var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

server.on('request', app);
var io = socketio(server);
// creates a new connection server for web sockets and integrates it into our HTTP server

io.on('connection', function(socket) {
    // This function receives the newly connected socket.
    // This function will be called for EACH browser that connects to our server.
    console.log('A new client has connected!');
    //console.log(socket.id);
    //console.log("These are all the connections: ", io.sockets)

    socket.on('disconnect', function(socket) {
        console.log('Boo! Someone left!');
    });

    socket.on('mouseLocation', function(start, end, strokeColor) {
        //console.log("This is mouse: ", mouseLocation);
        socket.broadcast.emit("otherArtistMouse", start, end, strokeColor )
    });
    socket.on("previousDrawings", function(arr){
    	socket.broadcast.emit("the arr", arr)
    })

});

var turing_hall_nsp = io.of('/turing_hall');
turing_hall_nsp.on('connection', function(socket){
  console.log('someone connected to turing_hall');
});

var grace_hopper_atrium_nsp = io.of('/grace_hopper_atrium');
grace_hopper_atrium_nsp.on('connection', function(socket){
  console.log('someone connected to grace_hopper_atrium');
});

var the_kitchen_nsp = io.of('/the_kitchen');
the_kitchen_nsp.on('connection', function(socket){
  console.log('someone connected to the_kitchen');
});


server.listen(1337, function() {
    console.log('The server is listening on port 1337!');
});


app.use(express.static(path.join(__dirname, 'browser')));

//don't need this
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
