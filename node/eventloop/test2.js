setTimeout(()=>{
    console.log("timers 1");
},0);

setImmediate(()=>{
    console.log("Check 2");
})

// function sleep(delay) {
//     let start = new Date().getTime();
//     while (new Date().getTime()-start < delay){
//         continue;
//     }
// }
//
// sleep(1000);
//
//执行结果不一致：timers1   Check 2/Check 2   timers 1