var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var _ = require('underscore');
/*
 recursive create directory
 @dirPath: absolute path
 */
module.exports.mkdirAbsoluteSync = function (dirPath, mode) {
    var delimiter = path.sep;
    dirPath = dirPath.trim(delimiter);
    var currentPath = '';
    var pathParts = dirPath.split(delimiter);
    for (var i = 0; i < pathParts.length; i++) {
        currentPath += (process.platform === 'win32' && pathParts[i].contains(':') ? '' : delimiter) + pathParts[i];
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath, mode || 0755);
        }
    }
};

/*
 recursive delete path entirely
 @dirPath: absolute path
 */
module.exports.deleteTreeSync = function (dirPath) {
    if (fs.existsSync(dirPath)) {
        rimraf.sync(dirPath);
    }
};

module.exports.renameSync = function (dirPath, newName) {
    console.log(dirPath, newName);
    if (fs.existsSync(dirPath)) {
        var dir = path.dirname(dirPath);
        var newPath = path.join(dir, newName);
        fs.renameSync(dirPath, newPath);
        return newPath;
    }
};

/*
 concatenate part with slash /
 * */
function join() {
    var args = Array.prototype.slice.call(arguments);
    args = args || [];
    if (args.length > 1) {
        return args.join('/').replace(/[\/]{2,}/g, '/');
    }
    return '';
}
module.exports.join = join;

/*
 get all sub-directories in absolute form
 */
function getSubDirectories(dir) {
    var res = [];
    var files = fs.readdirSync(dir);
    _.each(files, function (f) {
        var filePath = path.join(dir, f);
        if (fs.statSync(filePath).isDirectory())
            res.push(filePath);
    });
    return res;
}
module.exports.getSubDirectories = getSubDirectories;
/*
 get all sub-directories name in
 */
function getSubDirNames(dir) {
    var res = [];
    var files = fs.readdirSync(dir);
    _.each(files, function (f) {
        var filePath = path.join(dir, f);
        if (fs.statSync(filePath).isDirectory())
            res.push(f);
    });
    return res;
}
module.exports.getSubDirNames = getSubDirNames;

function getRootURL(url) {
    var reg = new RegExp('http(s)?:\/\/[^\/]+/');
    var m = reg.exec(url);
    return m ? m[0] : null;
}
module.exports.getRootURL = getRootURL;

function getAbsolutePath(suffix) {
    var root = process.env.spider_web || process.cwd();
    return path.join(root, suffix);
}
module.exports.getAbsolutePath = getAbsolutePath;

function readFile(fileName) {
    return function (fn) {
        fs.readFile(fileName, {encoding: 'utf8', flag: 'r'}, fn);
    }
}
module.exports.readFile = readFile;