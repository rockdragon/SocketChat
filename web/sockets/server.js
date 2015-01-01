var io = require('socket.io');
var http = require('http');

module.exports.createServer = createServer;

/*
* @app: Koa application
* */
function createServer(app){
    var server = http.Server(app.callback());
    io = io(server);
    messageHandler(io);
    return server;
}

/*
 * socket event handler
 */
function messageHandler(io) {
    io.on('connection', function (socket) {
        console.log(socket.id, " just connected.");

        socket.emit('news', {greeting: 'welcome.'});
        socket.on('broadcast', function (data) {
            console.log(data);
        });

        socket.on('disconnect', function(){
            console.log(this.id, " has been disconnect.");
        });
    });
}