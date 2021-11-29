console.log("start");//同步代码

//异步代码
setTimeout(() => {
    console.log("setTimeout 1 -> timers 阶段")
}, 0);

setTimeout(() => {
    console.log("setTimeout 2 -> timers阶段")
});

console.log("end");
//执行完输入代码后，开启进入事件循环

/**
 * start
 end
 setTimeout 1 -> timers 阶段
 setTimeout 2 -> timers阶段
 */