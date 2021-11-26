const fs = require("fs");

//同步读取文件
const files = fs.readdirSync("./");//sync 同步方式读取
console.log(files);

//异步读取文件
fs.readdir("./",function(error,files){
    console.log(error);
    console.log(files);
})

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