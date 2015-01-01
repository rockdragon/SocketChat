var crypto = require('crypto');
var config = require("../../modules/config/configUtils").getConfigs();

/*
* genearte session_id in cookie
* */
var sign = function (val, secret) {
    return val + '.' + crypto
            .createHmac('sha1', secret)
            .update(val)
            .digest('base64')
            .replace(/[\/\+=]/g, '');
};

var generateSessionId = function () {
    var sessionId  = (new Date()).getTime() + Math.random().toString();
    sessionId = sign(sessionId, config.SECRET);
    return sessionId;
};

var serialize = function (val, opt) {
    var pairs = [encodeURIComponent(val)];
    opt = opt || {};

    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
    if (opt.domain) pairs.push('Domain=' + opt.domain);
    if (opt.path) pairs.push('Path=' + opt.path);
    if (opt.expires) pairs.push('Expires=' + opt.expires);
    if (opt.httpOnly) pairs.push('HttpOnly');
    if (opt.secure) pairs.push('Secure');

    return pairs.join('; ');
};

function middleware(){
    return function* (next){
        var session_id = this.cookies.get(config.session_key);
        if (!session_id) {
            var sessionId = generateSessionId();
            var cookie = serialize(sessionId);
            this.cookies.set(config.session_key, cookie);
        }
        try {
            yield *next;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = middleware;