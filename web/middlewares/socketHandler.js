var io = require('socket.io');
var http = require('http');
var config = require('../../modules/config/configUtils').getConfigs();

module.exports.createServer = createServer;
module.exports.addUser = addUser;
module.exports.otherUsers = otherUsers;

/*
 * Users
 *  [{name, session_id, socket} ...]
 * */
var users = [];

function findInUsers(session_id) {
    var index = -1;
    for (var j = 0, len = users.length; j < len; j++) {
        if (users[j].session_id === session_id)
            index = j;
    }
    return index;
}
function addUser(name, session_id) {
    var index = findInUsers(session_id);
    if (index === -1) //not exist
        users.push({name: name, session_id: session_id, socket: null});
    else {
        if (users[index].name !== name) //update name
            users[index].name = name;
    }
}
function setUserSocket(session_id, socket){
    var index = findInUsers(session_id);
    if (index !== -1){
        users[index].socket = socket;
    }
}
function removeUser(session_id) {
    var index = findInUsers(session_id);
    return index > -1 ? users.splice(index, 1) : null;
}
function findUser(session_id) {
    var index = findInUsers(session_id);
    return index > -1 ? users[index] : null;
}
function otherUsers(session_id){
    var results = [];
    for (var j = 0, len = users.length; j < len; j++) {
        if (users[j].session_id !== session_id)
            results.push(users[j]);
    }
    return results;
}

/*
 * @app: Koa application
 * */
function createServer(app) {
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
        console.log(socket.id, ' just connected.');
        var sessionId = getSessionId(socket.request.headers.cookie, 'koa:sess');
        if(sessionId){
            setUserSocket(sessionId, socket);
        }

        socket.on('broadcast', function (msg) {
            socket.broadcast.send(msg);
        });

        socket.on('private', function (fromName, toSessionId, msg) {
            console.log('Private from ', fromName, ' to ', toSessionId, msg);
            var user = findUser(toSessionId);
            if (user)
                user.socket.emit('private', {name: fromName, msg: msg});
        });

        socket.on('disconnect', function () {
            //var sessionId = getSessionId(socket.request.headers.cookie, 'koa:sess');
            //removeUser(sessionId);
            console.log(this.id, ' has been disconnect.');
        });
    });
}

function getSessionId(cookieString, cookieName) {
    var matches = new RegExp(cookieName + '=([^;]+);', 'gmi').exec(cookieString);
    return matches[1] ? matches[1] : null;
}