var Router = require('koa-router'),
    router = new Router();
var parse = require('co-body');
var config = require('../../../modules/config/configUtils').getConfigs();
var socketHandler = require('../../middlewares/socketHandler');

router.get('/', function *() {
    var session_id = this.cookies.get('koa:sess');
    var name = this.session.name;
    console.log('session_id', session_id, 'name', name);
    if(session_id && name) {//添加到用户列表
        socketHandler.addUser(name, session_id);
        yield this.render('../www/views/chat');
    } else {
        this.redirect('/chat/login');
    }
});

//登录
router.get('/login', function*(){
    yield this.render('../www/views/login')
});
router.post('/login', function*(){
    var body = yield parse(this);
    this.session.name = body.name || 'guest';
    this.redirect('/chat')
});

//获取其他人列表
router.post('/others', function*(){
    var session_id = this.cookies.get('koa:sess');
    var name = this.session.name;
    if(session_id && name) {
        this.type = 'application/json';
        this.body = socketHandler.otherUsers(session_id);
    } else {
        this.status = 404;
    }
});

module.exports = router;