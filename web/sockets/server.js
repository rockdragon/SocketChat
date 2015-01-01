var io = require('socket.io');
var http = require('http');

module.exports.createServer = createServer;

/*
* @app: Koa application
* */
function createServer(app){
    var server = http.Server(app.callback());
    io = io(server);
    eventHandler(io);
    return server;
}

/*
 * socket event handler
 */
function eventHandler(io) {
    io.on('connection', function (socket) {
        socket.emit('news', {greeting: 'welcome.'});
        socket.on('broadcast', function (data) {
            console.log(data);
        });
    });
}