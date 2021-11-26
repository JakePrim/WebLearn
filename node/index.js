//index.js 导入模块
const logger = require('./logger');//可以省略 .js 返回exports对象

console.log(logger);
console.log(logger.endPoint);

function fn(){
    console.log("Node.js");
}

fn();

let a = 10;
console.log(a);

const logger1 = require("./logger1");
logger1("hello logger1");