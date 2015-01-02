var Router = require('koa-router'),
    router = new Router();
var parse = require('co-body');
var config = require('../../../modules/config/configUtils').getConfigs();
var socketHandler = require('../../middlewares/socketHandler');

router.get('/', function *() {
    var session_id = this.cookies.get('koa:sess');
    var name = this.session.name;
    console.log('session_id', session_id, 'name', name);
    if(session_id && name) {
        socketHandler.addUser(name, session_id);
        var others = socketHandler.otherUsers(session_id);
        console.log(others);
        yield this.render('../www/views/chat', { others: others});
    } else {
        this.redirect('/chat/login');
    }
});

router.get('/login', function*(){
    yield this.render('../www/views/login')
});
router.post('/login', function*(){
    var body = yield parse(this);
    this.session.name = body.name || 'guest';
    this.redirect('/chat')
});

module.exports = router;