setTimeout(() => {
    console.log("timers")
}, 50);

process.nextTick(() => {
    console.log("nextTick");
})

setImmediate(() => {
    console.log("check");
})

process.nextTick(() => {
    console.log("nextTick 2");
})
//nextTick  nextTick2  check timers(延迟了50ms不会立即执行，会进入到下一轮循环直到50ms后)