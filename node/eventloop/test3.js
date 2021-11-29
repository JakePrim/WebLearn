const fs = require("fs");

fs.readFile("./x.txt", () => {//EventLoop 执行到了I/O Poll阶段
    //有回调函数，这时候会在check阶段注入setImmediate,timer阶段注入setTimeout,当I/O阶段的回调函数执行完毕后，进入check阶段输入2，在下一轮循环到timer阶段输出1
    //然后进入timer阶段
    setTimeout(() => {
        console.log("1")
    }, 0);
    //check阶段
    setImmediate(() => {
        console.log("2")
    })
})