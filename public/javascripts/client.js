$(function(){
    // generate socket connection
    var socketClient = function () {
        var socket = io.connect('/', {
            reconnection: false
        });
        return socket;
    };

    var socket = socketClient();
    socket.on('connect', function () {
        console.log('connection established.');
    });
    socket.on('disconnect', function () {
        console.log('disconnected.');
    });

    // message handler
});


