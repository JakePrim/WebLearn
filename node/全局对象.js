//node.js 中的全局对象不是window 而是global对象
//node 环境中声明的var变量不会添加到全局对象global中，而在浏览器会添加到全局对象window中
var message = "hello node";
console.log(global.message);//undefined