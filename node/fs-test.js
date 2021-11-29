const fs = require("fs");

//同步读取文件
const files = fs.readdirSync("./");//sync 同步方式读取
console.log(files);

//异步读取文件
fs.readdir("./", function (error, files) {
    console.log(error);
    console.log(files);
})

const crypto = require("crypto");

const NUM_REQUESTS = 2;

for (let i = 0; i < NUM_REQUESTS; i++) {
    // crypto.pbkdf2Sync("srcret","salt",10000,512,"sha512");
    crypto.pbkdf2("srcret", "salt", 10000, 512, "sha512", function () {
        console.log("123")
    });//异步操作
}

function A() {
    console.log("A is running");
}

function B(callback) {
    console.log("B Start")
    callback();
    console.log("B end");
}

B(A);

/**
 * [  '
 ’fs-test.js',
 'index.js',
 'logger.js',
 'logger1.js',
 'path-test.js',
 '全局对象.js'
 ]
 null[
 'fs-test.js',  'index.js',
 'logger.js',
 'logger1.js',  'path-test.js',  '全局对象.js']
 */