var Router = require('koa-router'),
    router = new Router();

router.get('/', function *() {
    yield this.render('../www/views/chat');
});

module.exports = router;