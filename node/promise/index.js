const fs = require("fs");

const promise = new Promise(function (resolve, reject) {
    //默认等待状态
    fs.readFile("./x.txt", "utf-8", function (error, data) {
        if (error) {
            reject(error)//失败
        } else {
            resolve(data);//成功
        }
    });
});

//获取异步操作的执行结果
promise.then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
});

const promisify = require("util").promisify;
//改造fs.readFile方法
const readFile = promisify(fs.readFile);//返回的就是一个promise对象


//Promise 解决嵌套地狱的问题
// function readFile(path) {
//     return new Promise(function (resolve, reject) {
//         //回调函数的方式不好 而是通过返回一个promise对象的方法
//         fs.readFile(path, "utf-8", function (error, data) {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(data);
//             }
//         })
//     });
// }

readFile("./x.txt", "utf-8").then(res => {
    console.log(res);
    //返回一个promise对象
    return readFile("./y.txt","utf-8");
}).then(res => {
    console.log(res);
    return readFile("./z.txt","utf-8");
}).then(res => {
    console.log(res);
}).catch(error => {//有一环执行出错就会调用catch
    console.log(error);
}).finally(function () {
    //无论读取成功还是失败都会调用
    console.log("finally")
});

//并发操作
Promise.all([
    readFile("./x.txt","utf-8"),
    readFile("./y.txt","utf-8"),
    readFile("./z.txt","utf-8")
]).then(res => {
    console.log(res);
})

//异步函数 async,异步函数的返回值会自动包裹在Promise对象中 异步函数不会阻塞主线程
async function fun() {
    //await 暂停异步函数的执行 当await返回结果后继续执行
    const x = await readFile("./x.txt","utf-8");
    const y = await readFile("./y.txt","utf-8");
    const z = await readFile("./z.txt","utf-8");
    return [x, y, z];//返回值会自动包裹Promise对象中
}

console.log(fun());//Promise { 'a' }
fun().then(res => {
    console.log(res);//a
})

const fn = async () => {
}

//通过promisify 方法改造通过回调函数获取结果的异步API