var Router = require('koa-router'),
    router = new Router();
var config = require('../../../modules/config/configUtils').getConfigs();

router.get('/', function *() {
    var session_id = this.cookies.get(config.session_key);
    console.log(session_id);
    yield this.render('../www/views/chat');
});

module.exports = router;