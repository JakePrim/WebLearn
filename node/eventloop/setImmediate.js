function sleep(delay) {
    let start = new Date().getTime();
    while (new Date().getTime() -start < delay){
        continue
    }
    console.log("ok");
}

console.log("start");
// sleep(2000);//直接调用会卡主线程
setImmediate(sleep,2000);//第二个参数，是回调函数的参数 setImmediate 不会卡主线程
console.log("end");