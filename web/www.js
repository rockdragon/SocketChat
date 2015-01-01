var koa = require('koa');
var mount = require('koa-mount');
var router = require('koa-router');
var render = require('koa-ejs');
var serve = require('koa-static');
var getAbsolutePath = require('../modules/other/pathUtils').getAbsolutePath;
var config = require("../modules/config/configUtils").getConfigs();
var logger = require("../modules/logger/logUtils");
var socketServer = require('./sockets/server');

//settings
var app = koa();
app.on('error', function(err){
    logger.error(err, err.ctx);
});
app.use(router(app));
app.use(serve(getAbsolutePath('public')));
app.use(serve(getAbsolutePath('bower_components'), {
    maxAge: 1000 * 86400 * 30
}));
render(app, {
    root: getAbsolutePath('web/views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: true
});

//routes
var admin = require(getAbsolutePath('web/www/routers/chat'));
app.use(mount('/chat', admin.middleware()));

//listen
var server = socketServer.createServer(app);
server.listen(config.www_port);
console.log('listening on port', config.www_port);