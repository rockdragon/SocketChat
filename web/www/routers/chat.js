var Router = require('koa-router'),
    router = new Router();
var parse = require('co-body');
var config = require('../../../modules/config/configUtils').getConfigs();

router.get('/', function *() {
    var session_id = this.cookies.get(config.session_key);
    var name = this.session.name;
    console.log('name:', name, ', session:', session_id);
    if(session_id && name) {
        yield this.render('../www/views/chat');
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