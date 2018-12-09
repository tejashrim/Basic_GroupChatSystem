const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


// Socket
const userArray = [];
io.on('connection', function (socket) { 

    let user = socket.handshake.query.userDetails;
    userArray.push(user);

    io.sockets.emit("NewUserConnected", userArray);

    socket.on("sendMessage", function(msg) {
        socket.broadcast.emit("NewMessage", msg)
    })
});



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

http.listen(8001, function () {
    console.log('listening on *:8001');
});

