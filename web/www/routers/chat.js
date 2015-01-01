var Router = require('koa-router'),
    router = new Router();
var getAbsolutePath = require('../../../modules/other/pathUtils').getAbsolutePath;
var model = require(getAbsolutePath('spiders/model'));
var util = require('util');

router.get('/', function *() {
    yield this.render('../www/views/chat');
});