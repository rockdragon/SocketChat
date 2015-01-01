// generate socket connection
var socketClient = function () {
    var socket = io.connect();
    socket.on('message', function (time) {
        console.log('received server timestamp:' + time);
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