var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(8000, function() {
    console.log('listening for requests on port 8000, http://localhost:8000');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data) {
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });

    //handle dieScore
    socket.on('dieScore', function(data) {
        io.sockets.emit('dieScore', data);
    });

    //handle score
    socket.on('scoreOne', function(data) {
        io.sockets.emit('scoreOne', data);
    });

    socket.on('scoreTwo', function(data) {
        io.sockets.emit('scoreTwo', data);
    });

    socket.on('id', function(data) {
        io.sockets.emit('id', data)
    });

    socket.on('lastScoreOne', function(data) {
        io.sockets.emit('lastScoreOne', data);
    });

    socket.on('lastScoreTwo', function(data) {
        io.sockets.emit('lastScoreTwo', data);
    });

    socket.on('noti', function(data) {
        io.sockets.emit('noti', data);
    });

    socket.on('restart', function() {
        io.sockets.emit('restart');
    });

});