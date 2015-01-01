var fs = require('fs');
var path = require('path');

var cfgFileName = 'config.cfg';
var cache = {};
var filePath = path.join(process.env.chat_home, cfgFileName);

function getConfigs() {
    if (!cache[cfgFileName]) {
        if (!process.env.cloudDriveConfig) {
            process.env.cloudDriveConfig = filePath;
        }
        if (fs.existsSync(process.env.cloudDriveConfig)) {
            var contents = fs.readFileSync(process.env.cloudDriveConfig, {encoding: 'utf-8'});
            cache[cfgFileName] = JSON.parse(contents);
        }
    }
    return cache[cfgFileName];
}
module.exports.getConfigs = getConfigs;

function fileChanged(curr, prev){
    if(curr.mtime !== prev.mtime) {
        console.log('config has been changed. curr mtime is: ',
            curr.mtime, 'prev mtime was: ' + prev.mtime);
        if (fs.existsSync(filePath)) {
            var contents = fs.readFileSync(filePath, {encoding: 'utf-8'});
            cache[cfgFileName] = JSON.parse(contents);
            console.log(cache[cfgFileName]);
        }
    }
}
fs.watchFile(filePath, fileChanged);

module.exports.isDevelopment = function(){
    return getConfigs().node_env  === 'development';
};
