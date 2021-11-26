//path模块
const path = require("path");
console.log(path.parse(__filename));

/**
 * {  
 *  root: 'D:\\',  
 *  dir: 'D:\\developer\\web\\workspace\\WebLearn\\node', 
 *  base: 'path-test.js', 
 *  ext: '.js',  
 *  name: 'path-test'
 * }   
 */