var io = require('socket.io');
var http = require('http');

/*
* @app: Koa application
* */
function createServer(app){
    var server = http.Server(app.callback());
    io = io(server);
    return server;
}
module.exports.createServer = createServer;