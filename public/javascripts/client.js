// generate socket connection
var socketClient = function () {
    var socket = io.connect();
    socket.on('message', function (msg) {
        console.log('received from the server:', msg);
    });
    return socket;
};

var socket = socketClient();
socket.on('connect', function () {
    console.log('connection established.');
});
socket.on('error', function () {
    socket = socketClient();
});