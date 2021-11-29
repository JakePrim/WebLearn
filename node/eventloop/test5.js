
//timers阶段
setTimeout(() => {
    console.log(1);
});

//Check阶段
setImmediate(() => {
    console.log(2);
});

//微任务 nextTick 优先于其他的微任务
process.nextTick(() => {
    console.log(3);
})

//微任务
Promise.resolve().then(() => {
    console.log(4);
});

//同步代码 立即执行
;(() => console.log(5))();

//5  3  4  1  2