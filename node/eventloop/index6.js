setTimeout(() => console.log("1"), 50);

process.nextTick(() => console.log("2"));

setImmediate(() => console.log("3"));

process.nextTick(() => {
    //在微任务的回调函数中，将setTimeout添加到timers阶段
    setTimeout(() => {
        console.log("4")
    }, 1000);
})

//2 3  1  4