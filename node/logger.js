//一个js文件就是一个模块 CommonJS规范
const url = "http://www.baidu.com";

function log(message) {
    console.log(message);
}

// console.log(module);
console.log("running...");
//导出 外部模块可以使用的API
exports.endPoint = url;
exports.log = log;