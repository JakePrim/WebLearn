const fs = require("fs");

//同步代码 返回callback
function readFile(fileName, callback) {
    if (typeof fileName === "string") {
        return process.nextTick(callback(new TypeError("filename 必须是字符串类型")));
    }
}

//异步代码返回callback
fs.readFile(filename, function (err, data) {
    if (err) return callback(err);
    return callback(null, data);
})

